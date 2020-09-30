const firebase = require("firebase/app")
require("firebase/auth")
require("firebase/firestore")
require("firebase/storage")

var firebaseConfig = {
  apiKey: "AIzaSyB_kUdGPHIrG0GcFZ7VnLmNRIbyYcJ_1Ms",
  authDomain: "bookonline-97322.firebaseapp.com",
  databaseURL: "https://bookonline-97322.firebaseio.com",
  projectId: "bookonline-97322",
  storageBucket: "bookonline-97322.appspot.com",
  messagingSenderId: "1001372109359",
  appId: "1:1001372109359:web:a5663abeb8ea4bef0054da"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();
  const storae = firebase.storage();
  const auth = firebase.auth(); 


  export {db, auth, storae,firebase}