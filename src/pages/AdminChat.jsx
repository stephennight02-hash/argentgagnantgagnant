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

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar - Chat List */}
      <div className="w-[380px] bg-white border-r border-gray-100 flex flex-col shadow-xl z-20">
        <div className="p-8 bg-indigo-950 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Money Support</h2>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Dashboard en direct</p>
        </div>

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
                  selectedChat?.id === chat.id ? "bg-indigo-50/50" : ""
                )}
              >
                {selectedChat?.id === chat.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600"></div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className={clsx(
                    "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                    chat.unreadByAdmin ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"
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
                className="flex-1 bg-gray-100 border-none rounded-2xl px-6 py-4 text-base font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
              />
              <button 
                type="submit"
                disabled={!reply.trim()}
                className="bg-indigo-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 uppercase tracking-widest text-xs"
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
    </div>
  );
}
