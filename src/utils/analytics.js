import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export const logOfferClick = async (offerName, category) => {
  try {
    const visitorId = localStorage.getItem('chatVisitorId') || 'anonymous';
    await addDoc(collection(db, 'clicks'), {
      offerName,
      category,
      visitorId,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    console.log(`Click logged for ${offerName}`);
  } catch (error) {
    console.error('Error logging click:', error);
  }
};
