import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import swal from 'sweetalert'
import db from '../main'


var firebase =require('firebase/app');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:'',
    error:'',
    tareas: [],
    tarea:'',
    texto:''
  },
  mutations: {
    setUsuario(state,payload){
      state.usuario = payload;
    },
    setError(state,payload){
      state.error = payload;
    },
    setTareas(state,tareas){
      state.tareas = tareas;
    },
    setTarea(state,tarea){
      state.tarea = tarea;
    },
    addTarea(state,tarea){
      state.tareas.push(tarea);
    },
    deleteTarea(state,id){
      state.tareas = state.tareas.filter(task => {
        return task.id != id;
      })
    }
  },
  actions: {
    buscadorTareas({commit,state},payload){
      state.texto = payload.toLowerCase();
    },

    async mostrarTareas({commit}){//mostrando todas las tareas del usuario
      const usuario = firebase.auth().currentUser;
      let tareas = [];
      await db.collection(usuario.email).get()
      .then(res=>{
        res.forEach(task => {
          let tarea = task.data();
          tarea.id = task.id;
          tareas.push(tarea);
        })
      })
      .catch(err => {
        console.log(err)
      });
      commit('setTareas',tareas);
    },
    getTarea({commit},id){//traer datos de una tarea por id para poder editarla
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(id).get()
      .then(res => {
          let tarea = res.data();
          tarea.id = res.id;
          commit('setTarea',tarea)
      })
      .catch(err => {
        console.log(err)
      })
    },
    async editarTarea({commit},tarea){//editando tarea
      const usuario = firebase.auth().currentUser;
      const {id,nombre} = tarea;
      await db.collection(usuario.email).doc(id).update({
        nombre
      })
      .then(async () => {
        await alerta('Tarea editada','success');
        router.push({name: 'Inicio'});
      })
      .catch(err => {
        alerta('Error','error')
        console.log(err)
      })
    },
    async agregarTarea({commit},task){//agregando tarea
      const usuario = firebase.auth().currentUser;
      await db.collection(usuario.email).add({
        nombre: task.nombre
      })
      .then(async res=>{
        let tarea = {
          nombre: task.nombre,
          id: ''+res.id
        };
        commit('addTarea',tarea);
        await alerta('Tarea Agregada','success');
      })
      .catch(err => {
        alerta('Error','error');
        console.log(err)
      })
    },
    async eliminarUsuario({commit},id){//elimando tarea
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(id).delete()
      .then(async ()=>{
        commit('deleteTarea',id);
        await alerta('Elemento eliminado','success');
      })
      .catch(err => {
        alerta('Error','error');
        console.log(err);
      })
    },
    async crearUsuario({commit},payload){//creando usuario
      await firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
      .then(async res=>{
        commit('setUsuario',{
          email:res.user.email,
          uid:res.user.uid
        });
        await alerta('Registro Exitoso','success');
        //crear una coleccion con el email del usuario
        
        db.collection(res.user.email).add({
          nombre: 'Tarea de ejemplo'
        })
        router.push({name: 'Inicio'})
      })
      .catch(async err=>{
        await alerta(err.message,'error')
        commit('setError',err.message);
      })
    },
    async ingresoUsuario({commit},payload){//iniciar sesion
      await firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then(async res=>{
        commit('setUsuario',{
          email:res.user.email,
          uid:res.user.uid
        });
        await alerta('Logeo exitoso','success');
        router.push({name: 'Inicio'})
      })
      .catch(err=>{
        alerta(err.message,'error');
        commit('setError',err.message);
      })
    },
    detectaUsuario({commit},payload){//detectar usuario y compiando datos
      if(payload != null){
        commit('setUsuario',{email:payload.email,uid: payload.uid})
      }else{
        commit('setUsuario',null)
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    },
    cerrarSession({commit}){//cerrando sesion                                                                                                 
      firebase.auth().signOut()
      commit('setTareas','');
      commit('setUsuario',null);
      router.push({name: 'Ingreso'})
    }
  },
  getters:{
    Habilitar(state){
      if(state.usuario === undefined || state.usuario === null || state.usuario === ''){
        return false
      }else{
        return true
      }
    },
    arrayFiltrado(state){
      let tareaFiltrada = [];
      for (let tarea of state.tareas) {
        let nombre = tarea.nombre.toLowerCase();
        if(nombre.indexOf(state.texto) >= 0){
          tareaFiltrada.push(tarea);
        }
      }
      return tareaFiltrada
    }
  }
})


async function alerta(texto,icon) {
    await swal(texto,{
      icon,
      closeOnClickOutside:false,
      closeOnEsc:false,
      timer:2000,
      buttons:false
    })
}