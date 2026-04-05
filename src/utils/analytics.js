import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export const logOfferClick = async (offerName, category) => {
  try {
    const visitorId = localStorage.getItem('chatVisitorId') || 'anonymous';
    
    // Fetch IP (optional/best effort)
    let ip = 'N/A';
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      ip = data.ip;
    } catch (e) {
      console.error('IP Fetch Error:', e);
    }

    await addDoc(collection(db, 'clicks'), {
      offerName,
      category,
      visitorId,
      ip,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    console.log(`Click logged for ${offerName} (IP: ${ip})`);
  } catch (error) {
    console.error('Error logging click:', error);
  }
};
