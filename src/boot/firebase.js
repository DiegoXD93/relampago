import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAhzAq1DJbyDnPk94YDaoLEB9TyHZlLBos",
  authDomain: "relampago-58de0.firebaseapp.com",
  databaseURL: "https://relampago-58de0.firebaseio.com",
  projectId: "relampago-58de0",
  storageBucket: "relampago-58de0.appspot.com",
  messagingSenderId: "127812408636",
  appId: "1:127812408636:web:def13199396ca7304f3a39",
  measurementId: "G-7ZV4EN0BCC"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let db = firebase.firestore();

export { db, firebaseAuth, firebase };
