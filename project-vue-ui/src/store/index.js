import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {                                                                                                                                                                            
    frutas:[
      {nombre:'manzana',cantidad:'15'},
      {nombre:'mandarina',cantidad:'1'},
      {nombre:'pera',cantidad:'9'},
      {nombre:'platano',cantidad:'11'},
    ]
  },
  mutations: {
    aumentar(state,index){
      state.frutas[index].cantidad++;
    },
    reset(state){
      state.frutas.forEach(state=>state.cantidad = 0);
    }
  },
  actions: {
  },
  modules: {
  }
})
