import { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import clsx from 'clsx';

const DISCORD_WEBHOOK_URL = 'https://canary.discord.com/api/webhooks/1488979546358288558/nEXIe7lNQ2K8dtPBc5dnsO9-y1JEM_RbTtGh4m_m-3IdbvHbHS6CzMbmoZw8_mZ7HwmM';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [visitorId, setVisitorId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollRef = useRef(null);

  // Initialize Visitor ID
  useEffect(() => {
    let id = localStorage.getItem('chatVisitorId');
    if (!id) {
      id = 'visitor_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chatVisitorId', id);
    }
    setVisitorId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for messages
  useEffect(() => {
    if (!visitorId) return;

    console.log('Chat listening for visitor:', visitorId);

    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', visitorId)
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
      
      // Update unread count if chat is closed
      if (!isOpen) {
        const lastMsg = msgs[msgs.length - 1];
        if (lastMsg && lastMsg.sender === 'admin' && !lastMsg.isRead) {
          setUnreadCount(prev => prev + 1);
        }
      }
    }, (error) => {
      console.error('FIREBASE SNAPSHOT ERROR (Visitor):', error.code, error.message);
    });

    return () => unsubscribe();
  }, [visitorId, isOpen]);

  // Mark as read when opening
  useEffect(() => {
    if (isOpen && visitorId) {
      setUnreadCount(0);
      updateDoc(doc(db, 'chats', visitorId), {
        unreadByUser: 0
      }).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, visitorId]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendDiscordNotification = async (message, id) => {
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: "@rescuetime 📬 **Nouveau message d'un client !**",
          embeds: [
            {
              title: "Nouveau message sur le Chat",
              description: message,
              color: 0x4f46e5, // Indigo 600
              fields: [
                {
                  name: "ID Visiteur",
                  value: `\`${id}\``,
                  inline: true
                },
                {
                  name: "Panel Admin",
                  value: "[Accéder aux conversations](https://parrainageargentgagnant.fr/admin-chat)",
                  inline: true
                }
              ],
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
    } catch (error) {
      console.error('Error sending Discord notification:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !visitorId) return;

    const text = newMessage;
    setNewMessage('');

    try {
      // 1. Create/Update Chat Summary
      await setDoc(doc(db, 'chats', visitorId), {
        chatId: visitorId,
        lastMessage: text,
        timestamp: serverTimestamp(),
        unreadByAdmin: true,
        visitorInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform
        }
      }, { merge: true });

      // 2. Add Message
      await addDoc(collection(db, 'messages'), {
        chatId: visitorId,
        text,
        sender: 'user',
        timestamp: serverTimestamp(),
        isRead: false
      });

      // 3. Discord Notification
      sendDiscordNotification(text, visitorId);

    } catch (err) {
      console.error('FIREBASE SEND ERROR:', err.code, err.message);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      {/* Chat Window */}
      <div className={clsx(
        "absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden",
        isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-75 opacity-0 translate-y-12 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black shrink-0 shadow-inner">
            MG
          </div>
          <div className="text-left">
            <h3 className="text-sm font-black text-gray-900 leading-tight">Support MoneyGagnant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.5)]"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">En ligne</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-white custom-scrollbar"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-10">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl mb-4">👋</div>
              <h4 className="text-gray-900 font-black mb-1">Bienvenue !</h4>
              <p className="text-xs font-bold text-gray-400 leading-relaxed uppercase tracking-tight">
                Une question sur une offre ? Posez-la ici, on vous répond en quelques minutes.
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isUser = msg.sender === 'user';
              const nextMsg = messages[idx + 1];
              const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;

              return (
                <div 
                  key={msg.id}
                  className={clsx(
                    "flex flex-col",
                    isUser ? "items-end" : "items-start"
                  )}
                >
                  <div 
                    className={clsx(
                      "max-w-[85%] px-4 py-2.5 text-[15px] leading-snug shadow-sm transition-all duration-300",
                      isUser 
                        ? "bg-indigo-600 text-white font-medium" 
                        : "bg-gray-100 text-gray-800 font-medium",
                      isUser 
                        ? (isLastInGroup ? "rounded-2xl rounded-tr-sm" : "rounded-2xl")
                        : (isLastInGroup ? "rounded-2xl rounded-tl-sm" : "rounded-2xl")
                    )}
                  >
                    {msg.text}
                  </div>
                  {isLastInGroup && (
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-1 px-1">
                      {msg.timestamp?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Envoi...'}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={sendMessage} className="relative flex items-center">
            <input
              type="text"
              placeholder="Votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-5 pr-12 py-3 text-sm font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none placeholder:text-gray-400"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="absolute right-1.5 p-2 text-indigo-500 hover:text-indigo-600 disabled:opacity-30 disabled:grayscale transition-all"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
          <p className="text-[9px] text-center text-gray-300 font-bold uppercase tracking-widest mt-3">
            Propulsé par MoneyGagnant Support
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 relative",
          isOpen ? "bg-gray-900 rotate-90" : "bg-indigo-600"
        )}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-indigo-600 animate-bounce">
                {unreadCount}
              </span>
            )}
          </div>
        )}
      </button>
    </div>
  );
}
