import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
//cấu hình firebase 
const firebaseConfig = {
  apiKey: "AIzaSyDsxnOwv7HCuNh0HOHvDIoFfHYaoWhfpj0",
  authDomain: "datn-b4ea0.firebaseapp.com",
  databaseURL: "https://datn-b4ea0-default-rtdb.firebaseio.com",
  projectId: "datn-b4ea0",
  storageBucket: "datn-b4ea0.appspot.com",
  messagingSenderId: "251347777583",
  appId: "1:251347777583:web:a0687724860018660b6eda"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();