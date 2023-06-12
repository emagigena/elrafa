// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs-qdfEEDffR3QhGanLtUonWjJNjartJw",
  authDomain: "instrumental-santa-fe.firebaseapp.com",
  projectId: "instrumental-santa-fe",
  storageBucket: "instrumental-santa-fe.appspot.com",
  messagingSenderId: "927182548293",
  appId: "1:927182548293:web:31a3d8ddcb659564a6622c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default function getFirestoreApp(){
  return app
} 