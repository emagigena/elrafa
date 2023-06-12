// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBs-qdfEEDffR3QhGanLtUonWjJNjartJw",
//   authDomain: "-santa-fe.firebaseapp.com",
//   projectId: "instrumental-santa-fe",
//   storageBucket: "instrumental-santa-fe.appspot.com",
//   messagingSenderId: "927182548293",
//   appId: "1:927182548293:web:31a3d8ddcb659564a6622c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default function getFirestoreApp(){
//   return app
// } 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCajKWR7WtcSXJmR0ngh8vTlIBTkUXGn0g",
  authDomain: "elrafa.firebaseapp.com",
  projectId: "elrafa",
  storageBucket: "elrafa.appspot.com",
  messagingSenderId: "257391677170",
  appId: "1:257391677170:web:01244cc1bad9b31e928a6b",
  measurementId: "G-4Q459W5F0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default function getFirestoreApp(){
  return app
} 