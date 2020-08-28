import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)
import router from '../router'
import swal from 'sweetalert'

export default new Vuex.Store({
  state: {
    productos:[],
    producto:{id:'',nombre:'',precio:0,cantidad:0}
  },
  mutations: {
    llenandoDatos(state,datos){
      state.productos = datos;
    },
    getProduct(state,producto){
      state.producto = producto
    },
    eliminado(state,id){
      state.productos = state.productos.filter(dato =>{
        return dato.id !=id
      })
    }
  },
  actions: {
    async getProductos({commit}){//cargando todos los datos
      let productos_new = [];
      await db.collection('registro_productos').get()
      .then(productos=>{
          productos.forEach(dato => {
            let producto = dato.data();
            producto.id = dato.id;
            productos_new.push(producto);
          });
      })
      .catch(err=>{
        console.log(err);
      });
      commit('llenandoDatos',productos_new);
    },
    async getProducto({commit},id){
        await db.collection('registro_productos').doc(id).get()
        .then(dato=>{
          let data = dato.data();
          data.id = dato.id;  
          commit('getProduct',data)
        })
        .catch(err=>{
          console.log(err);
        })
    },
    async agregarProducto({commit},datos){//agregando producto a la lista
      await db.collection('registro_productos').add({
        nombre: datos.nombre,
        precio: datos.precio,
        cantidad: datos.cantidad
      })
      .then(async ()=>{
        await swal('Agregado',{
              timer:2000,
              icon:'success',
              buttons:false,
              closeOnEsc:false,
              closeOnClickOutside:false
        });
        router.push({name:'Inicio'});
      })
      .catch(err=>{
        console.log(err);
      })
    },
    editarProducto({commit},dato){//editando el producto
      const {id,nombre,precio,cantidad} = dato
      db.collection('registro_productos').doc(id).update({
        nombre,
        precio,
        cantidad
      })
      .then(()=>{
        console.log('elemento editado');
        router.push({name: 'Inicio'})
      })
      .catch(err=>{
        console.log(err)
      });
    },
    eliminarProducto({commit},id){//eliminando producto
      db.collection('registro_productos').doc(id).delete()
      .then(async ()=>{
          await swal('Eliminado',{
                timer:2000,
                icon:'success',
                buttons:false,
                closeOnEsc:false,
                closeOnClickOutside:false
          });
        commit('eliminado',id)
      })
      .catch(err=>{
        console.log(err);
      })
    },
    comprarProducto({commit},datos){
      const {id,cantidad,stock} = datos;
      var nueva_cantidad = stock - cantidad;
      if(nueva_cantidad >= 0){
        db.collection('registro_productos').doc(id).update({
          cantidad: nueva_cantidad
        })
        .then(()=>{
          router.push({name:'Inicio'})
        })
        .catch(err=>{
          console.log(err);
        })
      }else{
        router.push({name: 'Inicio'})
      }
    }
  }
})
