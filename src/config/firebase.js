// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKmW3tJmXBMSImqANf-mzBNMgm_m3kqHc",
  authDomain: "kevinacosmetics-aebbd.firebaseapp.com",
  projectId: "kevinacosmetics-aebbd",
  storageBucket: "kevinacosmetics-aebbd.firebasestorage.app",
  messagingSenderId: "301134258679",
  appId: "1:301134258679:web:27d2fd9e638be9cb930ef2",
  measurementId: "G-GRYCBVMVGT"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Analytics (only in browser environment)
let analytics = null
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app)
  } catch (error) {
    console.warn('Analytics initialization failed:', error)
  }
}

export { analytics }

// Firestore collections
export const PRODUCTS_COLLECTION = 'products'

