import { useState, useEffect, useRef } from 'react';
import { 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  collection,
  addDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import clsx from 'clsx';

export default function AdminChat() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'stats'
  const [clicks, setClicks] = useState([]);
  const scrollRef = useRef(null);

  // Listen for all active chats
  useEffect(() => {
    console.log('Admin: Listening for all chats...');
    const q = query(collection(db, 'chats'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Admin: Chats snapshot received. Count:', snapshot.size);
      const chatList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setChats(chatList);
    }, (error) => {
      console.error('FIREBASE SNAPSHOT ERROR (Admin Chats):', error.code, error.message);
    });
    return () => unsubscribe();
  }, []);

  // Listen for messages in selected chat
  useEffect(() => {
    if (!selectedChat) return;

    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', selectedChat.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => {
        const timeA = a.timestamp?.seconds || a.timestamp?.toMillis?.() / 1000 || Date.now() / 1000;
        const timeB = b.timestamp?.seconds || b.timestamp?.toMillis?.() / 1000 || Date.now() / 1000;
        return timeA - timeB;
      });
      setMessages(msgs);
    }, (error) => {
      console.error('FIREBASE SNAPSHOT ERROR (Admin Messages):', error.code, error.message);
    });

    return () => unsubscribe();
  }, [selectedChat]);

  // Listen for clicks (stats)
  useEffect(() => {
    if (activeTab !== 'stats') return;
    
    const q = query(collection(db, 'clicks'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const clickList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClicks(clickList);
    }, (error) => {
      console.error('FIREBASE SNAPSHOT ERROR (Clicks):', error.code, error.message);
    });
    return () => unsubscribe();
  }, [activeTab]);

  // Scroll to bottom and log
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    console.log('Current Messages in state:', messages);
  }, [messages]);

  const sendReply = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedChat) return;

    const text = reply;
    setReply('');

    try {
      // 1. Update Chat Summary (Last message as admin)
      await updateDoc(doc(db, 'chats', selectedChat.id), {
        lastMessage: text,
        timestamp: serverTimestamp(),
        unreadByAdmin: false,
        unreadByUser: (selectedChat.unreadByUser || 0) + 1
      });

      // 2. Add Message
      await addDoc(collection(db, 'messages'), {
        chatId: selectedChat.id,
        text,
        sender: 'admin',
        timestamp: serverTimestamp(),
        isRead: false
      });
    } catch (err) {
      console.error('Error sending reply:', err);
    }
  };

  const markAsRead = async (chatId) => {
    try {
      await updateDoc(doc(db, 'chats', chatId), {
        unreadByAdmin: false
      });
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  // Stats aggregation
  const getStats = () => {
    const counts = {};
    clicks.forEach(c => {
      counts[c.offerName] = (counts[c.offerName] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  // Auto-mark as read if the chat is currently open and has new messages
  useEffect(() => {
    if (selectedChat) {
      const activeChatData = chats.find(c => c.id === selectedChat.id);
      if (activeChatData && activeChatData.unreadByAdmin) {
        markAsRead(activeChatData.id);
      }
    }
  }, [chats, selectedChat]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50 flex-col">
      {/* Header Tabs */}
      <div className="bg-gray-900 px-6 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo/icon-primary.svg" alt="Logo" className="w-7 h-7" />
            <h2 className="text-sm font-black text-white uppercase tracking-tighter italic">Admin PG</h2>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setActiveTab('chat')}
              className={clsx(
                "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                activeTab === 'chat' ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              Messages {chats.some(c => c.unreadByAdmin) && <span className="ml-1 w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={clsx(
                "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                activeTab === 'stats' ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              Statistiques
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <span className="text-[10px] font-black text-emerald-400 uppercase">Live Dashboard</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'chat' ? (
          <>
            {/* Sidebar - Chat List */}
            <div className="w-[380px] bg-white border-r border-gray-200 flex flex-col shadow-xl z-20">
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {chats.length === 0 ? (
                  <div className="p-10 text-center opacity-30 mt-10">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Aucun message pour le moment</p>
                  </div>
                ) : (
                  chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => {
                        setSelectedChat(chat);
                        markAsRead(chat.id);
                      }}
                      className={clsx(
                        "w-full p-6 text-left border-b border-gray-50 transition-all hover:bg-gray-50 flex flex-col gap-2 relative group",
                        selectedChat?.id === chat.id ? "bg-emerald-50/50" : ""
                      )}
                    >
                      {selectedChat?.id === chat.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className={clsx(
                          "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                          chat.unreadByAdmin ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"
                        )}>
                          {chat.unreadByAdmin ? 'Nouveau' : 'Lu'}
                        </span>
                        <span className="text-[10px] text-gray-300 font-bold uppercase">
                          {chat.timestamp?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Maintenant'}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-black text-gray-800 uppercase tracking-tight mb-0.5">
                          {chat.visitorIp && chat.visitorIp !== 'N/A' ? `Client IP: ${chat.visitorIp}` : `Client ${chat.id.slice(-6).toUpperCase()}`}
                        </h4>
                        <p className={clsx(
                          "text-sm truncate",
                          chat.unreadByAdmin ? "text-gray-900 font-black" : "text-gray-500 font-medium"
                        )}>
                          {chat.lastMessage}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              {selectedChat ? (
                <>
                  {/* Header */}
                  <div className="bg-white p-6 border-b border-gray-200 flex items-center justify-between shadow-sm z-10">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">
                        Conversation avec {selectedChat.visitorIp && selectedChat.visitorIp !== 'N/A' ? selectedChat.visitorIp : `Client ${selectedChat.id.slice(-6).toUpperCase()}`}
                      </h3>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Visiteur en direct | {selectedChat.visitorInfo?.userAgent?.slice(0, 40)}...</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-8 flex flex-col gap-4 bg-gray-50/50"
                  >
                    {messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={clsx(
                          "max-w-[70%] rounded-3xl px-6 py-4 text-sm font-bold shadow-sm",
                          msg.sender === 'admin' 
                            ? "bg-gray-900 text-white self-end rounded-tr-none" 
                            : "bg-white text-gray-800 self-start rounded-tl-none border border-gray-200"
                        )}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <form onSubmit={sendReply} className="p-6 bg-white border-t border-gray-200 flex gap-4">
                    <input
                      type="text"
                      placeholder="Rédigez votre réponse..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className="flex-1 bg-gray-100 border-none rounded-2xl px-6 py-4 text-base font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
                    />
                    <button 
                      type="submit"
                      disabled={!reply.trim()}
                      className="bg-emerald-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 uppercase tracking-widest text-xs"
                    >
                      Envoyer (Entrée)
                    </button>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-20 opacity-30 select-none">
                  <div className="text-8xl mb-6">📬</div>
                  <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Messagerie Administrative</h3>
                  <p className="text-gray-500 max-w-sm mt-4 font-bold text-lg leading-snug">
                    Sélectionnez une conversation à gauche pour commencer à répondre aux filleuls.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-10 bg-gray-50 custom-scrollbar">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">Tableau de Bord</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mt-1">Analyse des clics et de l'engagement en direct</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Mise à jour live</span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-emerald-200 transition-all">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Clics</span>
                  <span className="text-5xl font-black text-emerald-600 group-hover:scale-110 transition-transform">{clicks.length}</span>
                  <div className="mt-4 w-12 h-1.5 bg-emerald-50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-blue-200 transition-all">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Conversations</span>
                  <span className="text-5xl font-black text-blue-600 group-hover:scale-110 transition-transform">{chats.length}</span>
                  <div className="mt-4 w-12 h-1.5 bg-blue-50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-2/3"></div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-purple-200 transition-all">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Visiteurs Uniques</span>
                  <span className="text-5xl font-black text-purple-600 group-hover:scale-110 transition-transform">
                    {new Set(clicks.map(c => c.visitorId)).size}
                  </span>
                  <div className="mt-4 w-12 h-1.5 bg-purple-50 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-1/2"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ranking */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Classement des Offres</h3>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Top Performance</span>
                  </div>
                  <div className="space-y-3">
                    {getStats().length === 0 ? (
                      <p className="text-center py-10 text-gray-400 text-sm font-bold uppercase tracking-widest italic">Aucune donnée pour le moment</p>
                    ) : (
                      getStats().slice(0, 10).map((stat, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-all hover:translate-x-1">
                          <div className="flex items-center gap-4">
                            <span className={clsx(
                              "w-8 h-8 flex items-center justify-center rounded-xl text-xs font-black shadow-sm",
                              idx === 0 ? "bg-yellow-400 text-yellow-900" : 
                              idx === 1 ? "bg-gray-300 text-gray-700" : 
                              idx === 2 ? "bg-orange-300 text-orange-900" : "bg-gray-900 text-white"
                            )}>
                              {idx + 1}
                            </span>
                            <span className="font-black text-gray-800 tracking-tight">{stat.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
                               <div 
                                 className="h-full bg-emerald-500" 
                                 style={{ width: `${(stat.count / clicks.length) * 100}%` }}
                               ></div>
                             </div>
                             <span className="text-emerald-600 font-black min-w-[30px] text-right">{stat.count}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Journal récent</h3>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Temps réel</span>
                  </div>
                  <div className="flex-1 space-y-2 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                    {clicks.length === 0 ? (
                       <p className="text-center py-10 text-gray-400 text-sm font-bold uppercase tracking-widest italic">En attente de clics...</p>
                    ) : (
                      clicks.slice(0, 50).map((click, idx) => (
                        <div key={idx} className="text-[10px] font-bold p-3 bg-gray-50/50 border-b border-gray-100 flex justify-between uppercase hover:bg-white transition-colors rounded-lg">
                           <div className="flex flex-col">
                             <span className="text-gray-400 font-medium">{click.timestamp?.toDate?.().toLocaleTimeString() || 'Maintenant'}</span>
                             <div className="flex items-center gap-1.5 font-black text-[9px] mt-0.5">
                                <span className="text-gray-300">#{click.visitorId?.slice(-6) || 'anon'}</span>
                                {click.ip && <span className="text-emerald-500 bg-emerald-50 px-1 rounded border border-emerald-100">IP: {click.ip}</span>}
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="text-emerald-700 font-black">{click.offerName}</span>
                             <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                           </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


