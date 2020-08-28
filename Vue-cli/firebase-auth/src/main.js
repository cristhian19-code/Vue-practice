import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {BootstrapVue,IconsPlugin} from 'bootstrap-vue'
import Vuelidate from "vuelidate";

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
var firebase = require('firebase/app')

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

require('firebase/auth')
//require('firebase/database')
require('firebase/firestore')
// require('firebase/messaging')
// require('firebase/functions')
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

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    store.dispatch('detectaUsuario',{email:user.email, uid: user.uid});
  }else{
    store.dispatch('detectaUsuario',null);
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

export default firebaseApp.firestore();