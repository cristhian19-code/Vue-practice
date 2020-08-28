import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCiLXorAQ4xwEC5A4DaPat20ylOV7XRnkM",
    authDomain: "crud-123-9e6be.firebaseapp.com",
    databaseURL: "https://crud-123-9e6be.firebaseio.com",
    projectId: "crud-123-9e6be",
    storageBucket: "crud-123-9e6be.appspot.com",
    messagingSenderId: "37778860943",
    appId: "1:37778860943:web:819f03450f4bb788ecb9fa",
    measurementId: "G-0ZSYX5M28B"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({});

export default firebaseApp.firestore();