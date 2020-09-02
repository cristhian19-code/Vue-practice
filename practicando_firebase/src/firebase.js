const firebase = require("firebase/app")
require("firebase/auth")
require("firebase/firestore")
require("firebase/storage")

var firebaseConfig = {
    apiKey: "AIzaSyB8F772MSFGIdl0AsTi8_3ho0nBIUdDYLM",
    authDomain: "practicavue-cc7a7.firebaseapp.com",
    databaseURL: "https://practicavue-cc7a7.firebaseio.com",
    projectId: "practicavue-cc7a7",
    storageBucket: "practicavue-cc7a7.appspot.com",
    messagingSenderId: "647584302975",
    appId: "1:647584302975:web:02b7164c51b5ef9fcabc4a",
    measurementId: "G-2LD6NMW9QT"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();
  const storae = firebase.storage();
  const auth = firebase.auth(); 


  export {db, auth, storae,firebase}