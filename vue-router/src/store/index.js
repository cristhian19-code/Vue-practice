import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fotos:[
      {name:'Tree',url:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg'},
      {name:'Boat',url:'https://cdn.pixabay.com/photo/2013/07/18/20/26/boat-164989_640.jpg'},
      {name:'Sunset',url:'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg'},
      {name:'Adormidera',url:'https://cdn.pixabay.com/photo/2013/08/20/15/47/sunset-174276_640.jpg'},
      {name:'Pridora',url:'https://cdn.pixabay.com/photo/2015/06/19/20/13/sunset-815270_640.jpg'},
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
