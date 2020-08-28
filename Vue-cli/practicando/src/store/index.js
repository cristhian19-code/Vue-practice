import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import db from '../main'

Vue.use(Vuex)
const firebase = require('firebase/app')

export default new Vuex.Store({
  state: {
    usuario:'',
    usuarios: [],
    busqueda: ''
  },
  mutations: {
    setUsuario(state,usuario){
      state.usuario = usuario;
    },
    setUsuarios(state,usuarios){
      state.usuarios = usuarios;
    }
  },
  actions: {
    buscadorUsuarios({commit,state},payload){
      state.busqueda = payload.toLowerCase();
    },
    detectarUsuario({commit},usuario){
      if(usuario != null){
        commit('setUsuario',usuario);
      }else{
        commit('setUsuario',null);
      }
    },
    IniciarSesion({commit},usuario){
      firebase.auth().signInWithEmailAndPassword(usuario.email,usuario.password)
      .then(res => {
        commit('setUsuario',{
          email: res.user.email,
          uid: res.user.uid
        });
        router.push({name: 'Inicio'})
      })
      .catch(err => {
        console.log(err);
      })
    },
    cerrarSesion({commit}){
      commit('setUsuario','')
      firebase.auth().signOut();
    },
    mostrarAmigos({commit}){
      var usuarios = [];
      const user = firebase.auth().currentUser;
      db.collection(user.email).get()
      .then(response => {
        response.forEach(usuario => {
          let user = usuario.data();
          user.id = usuario.id;
          usuarios.push(user);
        })
        commit('setUsuarios',usuarios)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  getters:{
    Habilitar(state){
      if(state.usuario != null && state.usuario != '' && state.usuario != undefined){
        return true;
      }
      return false;
    },
    buscarUsuarios(state){
      const usuarios = [];
      for (let usuario of state.usuarios) {
        let user = usuario.nombre.toLowerCase();
        if(user.indexOf(state.busqueda)>= 0){
            usuarios.push(usuario);
        }
      }
      return usuarios;
    }
  }
})
