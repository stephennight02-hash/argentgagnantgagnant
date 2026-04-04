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

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50 flex-col">
      {/* Header Tabs */}
      <div className="bg-gray-900 px-6 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/Money_Face_Emoji.png" alt="Logo" className="w-6 h-6" />
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
                        <h4 className="text-xs font-black text-gray-800 uppercase tracking-tight mb-0.5">Visiteur {chat.id.slice(-6)}</h4>
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
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Conversation with {selectedChat.id}</h3>
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
          <div className="flex-1 overflow-y-auto p-10 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">Tableau de Bord</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mt-1">Analyse des clics et de l'engagement</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Clics</span>
                  <span className="text-4xl font-black text-emerald-600">{clicks.length}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ranking */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Classement des Offres</h3>
                  <div className="space-y-4">
                    {getStats().map((stat, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <span className="w-6 h-6 flex items-center justify-center bg-gray-900 text-white rounded-lg text-[10px] font-black">{idx + 1}</span>
                          <span className="font-black text-gray-800">{stat.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-black">
                          <span>{stat.count}</span>
                          <span className="text-[10px] uppercase tracking-widest">clics</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Journal récent</h3>
                  <div className="flex-1 space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                    {clicks.slice(0, 50).map((click, idx) => (
                      <div key={idx} className="text-[11px] font-bold p-3 border-b border-gray-50 flex justify-between uppercase">
                         <span className="text-gray-400">{click.timestamp?.toDate?.().toLocaleString() || 'Maintenant'}</span>
                         <span className="text-emerald-700">{click.offerName}</span>
                         <span className="text-gray-300">#{click.visitorId?.slice(-4)}</span>
                      </div>
                    ))}
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


