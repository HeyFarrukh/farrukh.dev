// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1ZWjv8edkJr32iDAXIN6pYBaZbj5Mnn8",
  authDomain: "farrukh-mainweb.firebaseapp.com",
  projectId: "farrukh-mainweb",
  storageBucket: "farrukh-mainweb.appspot.com",
  messagingSenderId: "257533568569",
  appId: "1:257533568569:web:4a04ade8761c72201f4fe8",
  measurementId: "G-6YYEYWR4K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);