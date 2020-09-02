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
    if(result.displayName){
      const user = DatosGF(result);
      store.dispatch('getUser',user)
    }else{
      const datos = await (await db.collection('usuarios').doc(result.uid).get()).data();
      const res = DatosT(datos)
      store.dispatch('getUser',res)
    }
  }else{
    store.dispatch('getUser',null)
    console.log('sin iniciar sesion')
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

function DatosGF(result){
  const user = {
    email: result.email,
    photo: result.photoURL,
    uid: result.uid,
    name: result.displayName
  }
  return user
}

function DatosT(result){
  const user = {
    email: result.email,
    photo: result.photoURL,
    uid: result.uid,
    name: result.name
  }
  return user
}

