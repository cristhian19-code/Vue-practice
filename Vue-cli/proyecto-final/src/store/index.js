import Vue from 'vue'
import Vuex from 'vuex'
import db from '../main'
import router from '../router'
import swal from 'sweetalert'

var firebase = require('firebase/app')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:'',
    friend:'',
    amigos:[],
    filtrado:'',
    carga: false,
    cargarEdit:false
  },
  mutations: {
    setUsuario(state,user){
      state.usuario = user;
    },
    setAmigos(state,amigos){
      state.amigos = amigos;
    },
    setEditFriend(state,amigo){
      state.friend = amigo;
    },
    deleteAmigo(state,id){
      state.amigos = state.amigos.filter(amigo => {
        return amigo.id != id;
      })
    },
    setFiltrado(state,texto){
      state.filtrado = texto.toLowerCase();
    },
    carga(state,hidden){
      state.carga = hidden;
    },
    cargaEdit(state,hidden){
      state.cargarEdit = hidden;
    }
  },
  actions: {
    detectarUsuario({commit},payload){
      if(payload){
        commit('setUsuario',{
          email: payload.email,
          uid: payload.uid
        });
      }else{
        commit('setUsuario',null);
      }
    },
    registrarUsuario({commit},payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)                                        
      .then(res => {
        db.collection(res.user.email).add({                                                                                           
          apellido: 'Sunderland',                                                                                                                                                                                                                                                                                               
          numero: 999999955,
          dni: 48431523 
        })
        commit('setUsuario',{
          email: res.user.email,
          uid:res.user.uid
        })
        console.log('usuario registrado');                                                                                                                    
      })
      .catch(err => {
        console.log(err.message)
      })
    },
    iniciarUsuario({commit},payload){
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then(async res => {
        commit('setUsuario',{
          email: res.user.email,
          uid: res.user.uid
        });
        await Alerta('Sesion Iniciada','success')
        router.push({name: 'Inicio'})
      })
      .catch(err => {
        console.log(err.message)
      })
    },
    async cerrarSesion({commit}){
      router.push({name: 'InicioSesion'})
      firebase.auth().signOut()
      commit('setUsuario','');
      await Alerta('Sesion Finaliza','success');
    },
    mostrarAmigos({commit}){
      const user = firebase.auth().currentUser;
      var amigos = [];
      commit('carga',true);
      db.collection(user.email).get()
      .then(response => {
        response.forEach(amigo => {
          let friend = amigo.data();
          friend.id = amigo.id;
          amigos.push(friend);
        })
      })
      .catch(err => {
      })
      setTimeout(()=>{
        commit('carga',false);
      },2000)
      commit('setAmigos',amigos);
    },
    agregarAmigo({commit,state},amigo){
      const user = firebase.auth().currentUser;
      const {nombre,apellido,celular,email} = amigo
      db.collection(user.email).add({
        nombre,
        apellido,
        celular,
        email
      })
      .then(async res => {
        amigo.id = res.id;
        state.amigos.push(amigo)
        await Alerta('amigos guardado','success')
      })
      .catch(err => {
        console.log('Upss hubo un error')
      })
    },
    editarAmigo({commit},amigo){
      const user = firebase.auth().currentUser;
      const {nombre,apellido,celular,email,id}= amigo;
      db.collection(user.email).doc(id).update({
        nombre,
        apellido,
        celular,
        email
      })
      .then(async ()=>{
        commit('deleteAmigo',amigo.id);
        console.log(amigo);
        this.state.amigos.push(amigo);
        await Alerta('Editado','success');
      })
      .catch(err => {
        console.log(err)
      })
    },
    obtenerAmigo({commit},id){
      const user = firebase.auth().currentUser;
      commit('cargaEdit',true)
      db.collection(user.email).doc(id).get()
      .then(res => {
        let amigo = res.data();
        amigo.id = res.id;
        commit('setEditFriend',amigo);
      })
      .catch(err => {
        console.log(err)
      })
      setTimeout(()=>{
        commit('cargaEdit',false);
      },2000)
    },
    eliminarAmigo({commit},id){
      const user = firebase.auth().currentUser;
      db.collection(user.email).doc(id).delete()
      .then(async () => {
        commit('deleteAmigo',id)
        await Alerta('Elemento eliminado','success');
      })
      .catch(err => {
        console.log(err)
      });
    },
    filtradoAmigos({commit,state},payload){
      state.filtrado = payload.toLowerCase();
    }
  },
  getters:{
    filtrarAmigos(state){
      var filtrados = []
      for (let amigo of state.amigos) {
        var nombre = amigo.nombre.toLowerCase();
        var apellido = amigo.apellido.toLowerCase();
        var celular = ''+ amigo.celular;
        var email = amigo.email.toLowerCase();
        if(nombre.indexOf(state.filtrado)>=0 || apellido.indexOf(state.filtrado)>=0 ||
          celular.indexOf(state.filtrado)>=0 || email.indexOf(state.filtrado)>=0
          ){
          filtrados.push(amigo);
        }
      }
      return filtrados;
    }
  }
});

async function Alerta (texto, icon){
  await swal(texto,{
    buttons:false,
    closeOnClickOutside:false,
    closeOnEsc:false,
    icon,
    timer: 2000
  })
}
