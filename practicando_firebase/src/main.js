import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {firebase,db} from './firebase'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(async result=>{
  if(result){
      const datos = await (await db.collection('usuarios').doc(result.uid).get()).data();
      const res = DatosT(datos)
      store.dispatch('getUser',res)
  }else{
    store.dispatch('getUser',null)
  }
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})


function DatosT(result){
  const user = {
    email: result.email,
    photo: result.photoURL,
    uid: result.uid,
    favorites: result.favorites,
    name: result.name
  }
  return user
}

