import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firestore from 'firebase/firestore'
var firebase = require('firebase/app');
require('firebase/auth');

Vue.config.productionTip = false

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
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    store.dispatch('detectarUsuario',{
      email: user.email,
      uid: user.uid
    })
  }else{
    store.dispatch('detectarUsuario',null)
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})



export default firebase.firestore()