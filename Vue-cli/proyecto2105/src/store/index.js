import Vue from 'vue'
import Vuex from 'vuex'
import db from '../main'
import router from '../router'
import swal from 'sweetalert'

var firebase = require('firebase/app')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    usuarios:[],
    usuario: {nombre: '',apellido: '', numero: 0, dni: 0}
  },
  mutations: {
    setUsuario(state,user){
      state.user = user
    },
    setUsuarios(state,users){
      state.usuarios = users;
    },
    setUsuarioEdit(state,usuario){
      state.usuario = usuario
    },
    deleteUsuario(state,id){
      state.usuarios = state.usuarios.filter(usuario => {
        return usuario.id != id
      });
    }
  },
  actions: {
    detectarUsuario({commit},payload){
      if(payload){
        commit('setUsuario',{
          email: payload.email,
          uid: payload.uid
        })
      }else{
        commit('setUsuario',null)
      }
    },
    // 
    cerrarSesion({commit}){
      firebase.auth().signOut()
      .then(async ()=>{
        await Alert('Sesion Finalizada','success')
        commit('setUsuario',null);
        router.push({name: 'Iniciar'})
      })
      .catch(err=>{
        // console.log('')
      });
    },
    // 
    registroUsuario({commit},payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
      .then(async res => {
        commit('setUsuario',{
          email: res.user.email,
          uid: res.user.uid
        })
        await Alert('Usuario Registrado','success')
        router.push({name: 'Inicio'})
      })
      .catch(err => {
        // console.log(err)
      })
    },
    // 
    iniciarUsuario({commit},payload){
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then(async res => {
        commit('setUsuario',{
          email: res.user.email,
          uid: res.user.uid
        });
        await Alert('Sesion Iniciada','success')
        router.push({name: 'Inicio'})
      })
      .catch(err => {
        // console.log(err);
      })
    },
    // 
    async mostrarPersonas({commit}){
      const user = firebase.auth().currentUser
      let datos = []
      await db.collection(user.email).get()
      .then(result => {
        result.forEach(user => {
          let dato = user.data();
          dato.id = user.id;
          datos.push(dato);
        })
      })
      .catch(err => {
        // console.log(err)
      })
      commit('setUsuarios',datos);
    },
    //
    agregarUsuario({commit},usuario){
      const user = firebase.auth().currentUser
      db.collection(user.email).add({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        numero: usuario.numero,
        dni: usuario.dni
      })
      .then(async ()=>{
        await Alert('Agregado','success')
        router.push({name: 'Usuarios'})
      })
      .catch(async err => {
        await Alert('Error al agregar','success')
        // console.log(err)
      })
    },
    editarUsuario({commit},id){//enviando datos a la plantilla para la edicion de los datos
      const user = firebase.auth().currentUser
      db.collection(user.email).doc(id).get()
      .then(res => {
        let usuario = res.data()
        usuario.id = res.id;
        commit('setUsuarioEdit',usuario)
      })
      .catch(err => {
        // console.log(err)
      })
    },
    Editar({commit},datos){
      const {id,nombre,apellido,numero,dni} = datos;
      const user = firebase.auth().currentUser
      db.collection(user.email).doc(id).update({
        nombre,
        apellido,
        numero,
        dni
      })
      .then(async () => {
        await Alert('Editado','success')
        router.push({name: 'Usuarios'})
      })
      .catch(err => {
        // console.log(err)
      })
    },
    eliminarUsuario({commit},id){
      const user = firebase.auth().currentUser
      db.collection(user.email).doc(id).delete()
      .then(async () => {
        await Alert('Usuario Eliminado','success')
        commit('deleteUsuario',id);
      })
      .catch(err => {
        // console.log(err)
      })
    }
  },
  getters:{
    exiteUsuario(state){
      if(state.user == null || state.user == undefined || state.user == ''){
        return false
      }else{
        return true
      }
    }
  }
})

async function Alert(texto,icon){
  await swal(texto,{
    buttons:false,
    icon,
    timer: 2500,
    closeOnClickOutside:false,
    closeOnEsc:false
  });
}