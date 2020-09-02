import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {firebase,db,auth} from '../firebase'
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: '',
    user: '',
    status: false
  },
  mutations: {
    setBooks(state,books){
      state.books = books;
    },
    setUser(state,user){
      state.user = user;
    },
    changeStatus(state,status){
      state.status = status
    }
  },
  actions: {
    async getUser({commit},user){//metodo para guardar el usuario al entrar en la pagina
      if(user){
        console.log(user)
        commit('setUser',user)
      }else{
        commit('setUser',null)
      }
    },
    async Busqueda({commit},search){//busqueda de libros
      var uri = `https://www.etnassoft.com/api/v1/get/?book_title='${search}'`
      try {
        const books = await axios.get(uri);
        console.log(books.data);
        commit('setBooks',books.data);
        commit('changeStatus',false);
      } catch (error) {
        console.log("Hubo un error")
        console.log(error);
      }
    },
    async Registrar({commit},payload){//registrando por metodo tradicional
      try {
        const user = await (await auth.createUserWithEmailAndPassword(payload.email,payload.password)).user;
        const usuario = {
          email: user.email,
          uid: user.uid,
          name: payload.name,
          photo: null
        }
        await db.collection('usuarios').doc(usuario.uid).set(usuario);
        commit('setUser',usuario);
        console.log('usuario almacenado')
      } catch (error) {
        console.log(error)
      }
    },
    async IniciarSesion({commit},payload){//iniciarndo sesion por metodo tadicinal
      try {
        const user = (await auth.signInWithEmailAndPassword(payload.email,payload.password)).user;
        console.log(user)
      } catch (error) {
        console.log(error)
      }
    },
    async RegistrarGoogle({commit}){//registro utilizando la cuenta de google
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().languageCode = 'es-pe';
      try {
        const result = (await firebase.auth().signInWithPopup(provider)).user;
        const user = {
          email: result.email,
          photo: result.photoURL,
          uid: result.uid,
          name: result.displayName
        }
        await db.collection('usuarios').doc(user.uid).set(user);
        commit('setUser',user);
      } catch (error) {
        console.log(error)
      }
    },
    async cerrarSesion({commit}){//cerrando la sesion del usuario
      try{
        await auth.signOut()
        router.push({name: 'Home'})
        commit('setUser',null);
      }catch(err){
        console.log(err);
      }
    },
    async addFavority({commit},payload){//agregando los favoritos al usuario
      try {
        await db.collection('usuarios').doc(payload.id).set()
        console.log('usuario agregado');
      } catch (error) {
        console.log('hubo un error')
        console.log(error);
      }
    },
    changeStatus({commit},status){//metodo para abrir y cerrar el modal para la busqueda de libros
      commit('changeStatus',status);
    }
  },
})
