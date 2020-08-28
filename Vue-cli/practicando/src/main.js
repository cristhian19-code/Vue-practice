import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const firebase = require('firebase/app');
require('firebase/auth')
require('firebase/firestore')

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyAAi2Ff0rOmpYbLxJF9cWyvhwytr7gkM5A",
  authDomain: "proyecto-vue-123.firebaseapp.com",
  databaseURL: "https://proyecto-vue-123.firebaseio.com",
  projectId: "proyecto-vue-123",
  storageBucket: "proyecto-vue-123.appspot.com",
  messagingSenderId: "173685604110",
  appId: "1:173685604110:web:2a7ee77a5acfbcaab5615f",
  measurementId: "G-HSPE76NCTM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

firebase.auth().onAuthStateChanged(user=>{
  if(user){
    store.dispatch('detectarUsuario',{
      email:user.email,
      uid:user.uid
    })
  }else{
    store.dispatch('detectarUsuario',null)
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});

export default firebase.firestore()

