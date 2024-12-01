import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_TTnnVDgXbFPBIoM0cN1pgKNmJPjl8d0",
    authDomain: "helloianki.firebaseapp.com",
    projectId: "helloianki",
    storageBucket: "helloianki.firebasestorage.app",
    messagingSenderId: "546036792373",
    appId: "1:546036792373:web:008a7d8d103ed762d8457c",
    measurementId: "G-HK37NXZN6J"
  };

  const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;