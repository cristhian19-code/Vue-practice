import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import swal from 'sweetalert'

import db from '../main';
var firebase = require('firebase/app');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:'',
    productos:[],
    producto:{id:'',producto:'',precio:0,cantidad:0}
  },
  mutations: {
    setUsuario(state,user){
      state.usuario = user
    },
    setProductos(state,productos){//llenando el array productos con los datos de la db
      state.productos = productos
    },
    async setProducto(state,producto){
      state.producto = await producto
    },
    deleteProduct(state,id){
      state.productos = state.productos.filter(data => {
        return data.id != id
      })
    }
  },
  actions: {
    async registrarUsuario({commit},payload){//registrando usuario
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
      .then(async res=>{
        commit('setUsuario',{
          email: res.email,
          uid: res.uid
        });
        await Alert('Registrado','success')
        router.push({name: 'Inicio'})
      })
      .catch(async err => {
        await Alert('Usuario Existente','error')
        console.log(err);
      })
    },
    async iniciarSession({commit},payload){//iniciando sesion
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then(async res => {
        commit('setUsuario',{
          email: res.email,
          uid: res.uid
        });
        await Alert('Sesion Iniciada','success')
        router.push({name: 'Inicio'});
      })
      .catch(async err => {
        await Alert('Error','error')
        console.log(err)
      })
    },
    detectarUsuario({commit},payload){//detentando usuario
      if(payload){
        commit('setUsuario',{
          email: payload.email,
          uid: payload.uid
        });
      }else{
        commit('setUsuario',null);
      }
    },
    async cerrarSesion({commit}){//cerrando sesion
      firebase.auth().signOut();
      commit('setUsuario',null);
      await Alert('Sesion Finalizada','success')
      router.push({name: 'Ingreso'});
    },
    async mostrarDatos({commit}){//mostrando los datos de los productos
      let productos = [];
      await db.collection('registro_productos').get()
      .then(res => {
        commit('setProductos')
        res.forEach(producto=>{
          let product = producto.data()
          product.id = producto.id;
          productos.push(product);
        })
        commit('setProductos',productos);
      })
      .catch(err => {
        console.log(err);
      })
    },
    async getProducto({commit},id){//obtener un producto por id
      await db.collection('registro_productos').doc(id).get()
      .then(async res => {
        let producto = res.data();
        producto.id = res.id;
        await commit('setProducto',producto);
      })
      .catch(err => {
        console.log(err)
      })
    },
    async mostrarProducto({commit},id){//mostrar datos del producto
      await db.collection('registro_productos').doc(id).get()
      .then(async res=>{
        let producto = res.data();
        producto.id = res.id;
        await commit('setProducto',producto)
      })
      .catch(err => {
        console.log(err);
      })
    },
    async editarProducto({commit},editado){
      const {id,nombre,precio,cantidad} = editado;
      await db.collection('registro_productos').doc(id).update({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
      })
      .then(async ()=>{
          await Alert('Editado','success')
          router.push({name: 'Productos'});
      })
      .catch(err => {
        console.log(err);
      })
    },
    async comprarProducto({commit},producto){
      console.log(producto);
      const {id,cantidad,cantidad_pedida} = producto;
      let cant = cantidad - cantidad_pedida;
      if(cant>=0){
        db.collection('registro_productos').doc(id).update({
          cantidad: cant
        })
        .then(async ()=>{
          await Alert('Compra exitosa','success')
          router.push({name: 'Productos'})
        })
        .catch(err=>{
          console.log(err)
        })
      }else{
        await Alert('Producto Agotado','error')
      }
    },
    eliminarProducto({commit},id){
      db.collection('registro_productos').doc(id).delete()
      .then(async () => {
        await Alert('Elemento eliminado','success');
        commit('deleteProduct',id)
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
});

async function Alert(texto,icon){
    await swal(texto,{
    buttons: false,
    icon,
    timer: 2000
  })
}
