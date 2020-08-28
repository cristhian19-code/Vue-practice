import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas:[],
    tarea :{nombre:'',id:''}
  },
  mutations: {
    llenado(state,tareas){
      state.tareas = tareas
    },
    setTarea(state,tarea){
      state.tarea = tarea;
    }
  },
  actions: {
    getTareas({commit}){
      const tareas = [];
        db.collection('tareas').get()
        .then(snapshot => {
          snapshot.forEach( doc =>{
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
          })
        })  
        .catch(err =>{
          console.log(err)
        });
        commit('llenado',tareas);
    },
    getTarea({commit},id){
      db.collection('tareas').doc(id).get()
      .then(doc =>{
        let tarea = doc.data();
        tarea.id = doc.id;
        commit('setTarea',tarea);
      })
      .catch(err=>{
        console.log(err)
      })
    },
    editar({commit},tarea){
      db.collection('tareas').doc(tarea.id).update({
          nombre:tarea.nombre
      })
      .then(()=>{
          router.push({name:'Inicio'})
      })
      .catch(err=>{
        console.log()
      });
    }
  },
  modules: {
  }
})
