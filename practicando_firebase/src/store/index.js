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
    status: false,
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
        commit('setUser',user)
      }else{
        commit('setUser',null)
      }
    },
    async Busqueda({commit},search){//busqueda por nombre del libro
      var uri = `https://www.etnassoft.com/api/v1/get/?book_title='${search}'`;
      try {
        const books = await axios.get(uri);
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
          favorites: [],
          name: payload.name,
          photo: null
        }
        await db.collection('usuarios').doc(usuario.uid).set(usuario);
        commit('setUser',usuario);
        router.push({name: 'Books'})
      } catch (error) {
        console.log(error)
      }
    },
    async IniciarSesion({commit},payload){//iniciarndo sesion por metodo tadicinal
      try {
        const uid = (await auth.signInWithEmailAndPassword(payload.email,payload.password)).user.uid;
        const datos = (await db.collection('usuarios').doc(uid).get()).data();
        commit('setUser',datos);
        router.push({name: 'Books'})
      } catch (error) {
        console.log(error)
      }
    },
    async RegistrarGoogle({commit}){//registro utilizando la cuenta de google
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().languageCode = 'es-pe';
      Provider(provider,commit);
    },
    async RegistrarFacebook({commit}){
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().languageCode = 'es-pe';
      Provider(provider,commit);
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
    async removeFavority({commit,state},payload){
      try {
        const datos = (await db.collection('usuarios').doc(state.user.uid).get()).data().favorites;
        var books = [];
        datos.forEach(element => {
          if(element.ID != payload.ID){
            books.push(element);
          }   
        });
        await db.collection('usuarios').doc(state.user.uid).update({favorites: books});
        const user = (await db.collection('usuarios').doc(state.user.uid).get()).data();
        commit('setUser',user)
      } catch (error) {
        console.log(error)
      }
    },
    async addFavority({commit,state},payload){//agregando los favoritos al usuario
      try {
        const book = {
          ID: payload.ID,
          autor: payload.author,
          categories: payload.categories,
          content_short: payload.content_short, 
          cover: payload.cover,
          language: payload.language,
          pages: payload.pages,
          publisher: payload.publisher,
          publisher_date: payload.publisher_date,
          thumbnail: payload.thumbnail,
          title: payload.title,
          tags: payload.tags
        }
        var books = await (await db.collection('usuarios').doc(state.user.uid).get()).data().favorites;
        books.push(book)
        await db.collection('usuarios').doc(state.user.uid).update({favorites: books});
        var user = await (await db.collection('usuarios').doc(state.user.uid).get()).data();
        commit('setUser',user);
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

async function Provider(provider,commit){
  try {
    const result = (await firebase.auth().signInWithPopup(provider)).user;
    const user = {
      email: result.email,
      photo: result.photoURL,
      uid: result.uid,
      favorites: [],
      name: result.displayName
    }
    await db.collection('usuarios').doc(user.uid).set(user);
    commit('setUser',user);
    router.push({name: 'Books'})
  } catch (error) {
    console.log(error)
  }
}
