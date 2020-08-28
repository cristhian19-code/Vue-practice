import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registro:[],
    datos:{id:'',nombre:'',apellido:'',numero:0,dni:0}
  },
  mutations: {
    llenadoDatos(state,datos){
      state.registro = datos;
    },
    setUsuario(state,dato){
      state.datos = dato;
    },
    delete(state,id){
      state.registro = state.registro.filter(eliminado => {
        return eliminado.id != id
      })
    }
  },
  actions: {
    getUsers({commit}){
      db.collection('registro').get()//obteniendo todos los datos de los usuarios de 'registro'
      .then(snapshot=>{
        let datos = [];
        snapshot.forEach(data =>{
            let dato = data.data();
            dato.id = data.id;
            datos.push(dato);
        });
        commit('llenadoDatos',datos);
      })
      .catch(err=>{
        console.log(err);
      });
    },
    getUser({commit},id){//obteniendo los datos un usuario por id del 'registro'
      db.collection('registro').doc(id).get()
      .then(data => {
        let dato = data.data();
        dato.id = data.id;
        commit('setUsuario',dato);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    addUser({commit},datos){
      const {nombre,apellido,numero,dni} = datos
      db.collection('registro').add({
        nombre,
        apellido,
        numero,
        dni  
      })
      .then(()=>{
        router.push({name:'Inicio'})
      })
      .catch()
    },
    editUser({commit},usuario){//editando los datos del usuario
      const {id,nombre,apellido,numero,dni} = usuario;
      db.collection('registro').doc(id).update({
          nombre,
          apellido,
          numero,
          dni
      })
      .then(()=>{
        router.push({name:'Inicio'})
      })
      .catch(err=>{
          console.log(err)
      })
    },
    deleteUser({commit},id){
      db.collection('registro').doc(id).delete()
      .then(()=>{
        commit('delete',id);
      })
      .catch(err=>{
        console.log()
      })
    }
  }
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
