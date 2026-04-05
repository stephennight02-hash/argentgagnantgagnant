import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { getVisitorIp } from './ip';

export const logOfferClick = async (offerName, category) => {
  try {
    const visitorId = localStorage.getItem('chatVisitorId') || 'anonymous';
    
    // Fetch IP using the shared utility
    const ip = await getVisitorIp();

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
