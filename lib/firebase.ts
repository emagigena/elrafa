import { initializeApp, getApps } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCajKWR7WtcSXJmR0ngh8vTlIBTkUXGn0g",
  authDomain: "elrafa.firebaseapp.com",
  projectId: "elrafa",
  storageBucket: "elrafa.appspot.com",
  messagingSenderId: "257391677170",
  appId: "1:257391677170:web:01244cc1bad9b31e928a6b",
  measurementId: "G-4Q459W5F0C",
}

export const initFirebase = () => {
  if (!getApps().length) {
    return initializeApp(firebaseConfig)
  }
}
