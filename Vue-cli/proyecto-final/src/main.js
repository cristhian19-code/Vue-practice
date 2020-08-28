import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

var firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyDPEVkK3vjwjizzKnYsd_4r9_SgvWMsqx4",
  authDomain: "projecto-final2020.firebaseapp.com",
  databaseURL: "https://projecto-final2020.firebaseio.com",
  projectId: "projecto-final2020",
  storageBucket: "projecto-final2020.appspot.com",
  messagingSenderId: "551513189833",
  appId: "1:551513189833:web:4d88df7361f477632e0c18",
  measurementId: "G-T5VGXQ1JJB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({})

firebase.auth().onAuthStateChanged(user => {
  if(user){
    store.dispatch('detectarUsuario',{
      email: user.email,
      uid: user.uid
    });
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
