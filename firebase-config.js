// ========================================
// FIREBASE CONFIGURATION
// Behind The Sound
// ========================================

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkVQ7nQXIuKWvSYIA6bCJ9-I-g-7_6s0g",
  authDomain: "behind-the-sounds.firebaseapp.com",
  projectId: "behind-the-sounds",
  storageBucket: "behind-the-sounds.firebasestorage.app",
  messagingSenderId: "1059297392150",
  appId: "1:1059297392150:web:aa675486af2250b3c92737",
  measurementId: "G-S9MT7DFKRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export for other files
export { app, auth, db };