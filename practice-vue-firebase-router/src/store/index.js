import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products:[],
    producto:{id:'',producto:'',stock:0}
  },
  mutations: {
    llenadoProducts(state,datos){
      state.products = datos;
    },
    setProductos(state,datos){
      state.producto = datos;
    },
    eliminarProducto(state,id){
      state.products = state.products.filter( dato => {
        return dato.id != id;
      })
    }
  },
  actions: {
    getProducts({commit}){//obteniendo todos los datos de firestore y copiando a la variable global products
      const product = [];
      db.collection('productos').get()
      .then(snapshot =>{
        snapshot.forEach(doc =>{
          let producto = doc.data();
          producto.id = doc.id
          product.push(producto);
        })
      })
      .catch(err=>{
        console.log(err);
      });
      commit('llenadoProducts',product);
    },
    getProduct({commit},id){//obteniendo datos de cierto id
      db.collection('productos').doc(id).get()
      .then(doc=>{
        let producto = doc.data();//obteniendo los datos
        producto.id = doc.id;//insertando el id
        commit('setProductos',producto)
      })
      .catch(err=>{
        console.log(err);
      });
    },
    editProduct({commit},product){//editando producto
      const {id,producto,stock} = product//destructurando
      db.collection('productos').doc(id).update({
        producto,
        stock
      })
      .then(()=>{
        router.push({name:'Products'})
      })
      .catch(err=>{
        console.log(err)
      })
    },
    deleteProduct({commit},id){//eliminando producto
      db.collection('productos').doc(id).delete()
      .then(()=>{
        // dispatch('getProducts')
        console.log('Eliminando datos');
        commit('eliminarProducto',id);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    addProduct({commit},producto){//agregando producto
      db.collection('productos').add({//agregando con id automatico
        producto:producto.producto,
        stock: producto.stock
      })
      .then(doc=>{
        console.log(doc.id);
        router.push({name: 'Products'});
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
})
