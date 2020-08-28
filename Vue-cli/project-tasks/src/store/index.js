import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import db from '../main'
import swal from 'sweetalert'

var firebase = require('firebase/app');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  usuario:'',
	  amigos:[],
	  amigo:'',
	  carga:false,
	  search:''
  },
  mutations: {
  	setUsuario(state,user){
  		state.usuario = user;
	},
	setAmigos(state,friends){
		state.amigos = friends;
	},
	setAmigo(state,friend){
		state.amigo = friend;
	},
	deleteAmigo(state,id){
		state.amigos = state.amigos.filter(amigo => {
			return amigo.id != id;
		})
	},
	carga(state,hidden){
		state.carga = hidden
	}
  },
  actions: {
	  	filtrarAmigos({commit,state},payload){
			state.search = payload.toLowerCase();
		},
		async detectarUsuario({commit},payload){
			if(payload){
				await commit('setUsuario',{
					email: payload.email,
					uid: payload.uid
				});
			}else{
				commit('setUsuario',null);
			}
		},
		crearUsuario({commit},usuario){
			firebase.auth().createUserWithEmailAndPassword(usuario.email,usuario.password)
			.then(async res => {
				commit('setUsuario',{
					email: res.user.email,
					uid: res.user.uid
				});
				db.collection(res.user.email).add({
					nombre:'Marco',
					apellido: 'Lopez',
					numero: 911313545,
					dni: 74151331
				})
				await alerta('Registrado','success');
				router.push({name: 'Inicio'});
			})
			.catch(async err => {
				if(err.message === 'Password should be at least 6 characters'){
					await alerta('Introduzca una contraseña de mas de 6 caracteres','error');
				}
				else if(err.message === 'The email address is already in use by another account.'){
					await alerta('El email se encuentra en uso','error');
				}
			});
		},
		iniciarSesion({commit},usuario){
			firebase.auth().signInWithEmailAndPassword(usuario.email,usuario.password).
			then(async res => {
				commit('setUsuario',{
					email: res.user.email,
					uid: res.user.uid
				});
				await alerta('Sesion Iniciada','success')
				router.push({name: 'Inicio'});
			})
			.catch(err => {
				alerta('Contraseña o Email incorrecto','error')
			})
		},
		async cerrarSesion({commit}){
			await firebase.auth().signOut()
			.then(() => {
				commit('setAmigos','');
				commit('setUsuario',null);
			})
			.catch(err => {
			})
			await alerta('Sesion Finalizada','success')
			router.push({name: 'Iniciar'});
		},	
		async mostrarAmigos({commit}){
			const usuario = firebase.auth().currentUser;
			let amigos = [];
			if(usuario){
				commit('carga',true);
				await db.collection(usuario.email).get()
				.then(res => {
					res.forEach(friend => {
						let amigo = friend.data();
						amigo.id = friend.id;
						amigos.push(amigo);
					})
				})
				.catch(err => {
				});
				setTimeout(()=>{
					commit('carga',false);
				},1500)
				commit('setAmigos',amigos)
			}else{
				commit('setAmigos','')
			}
		},
		async encontrarAmigo({commit},id){
			const user = firebase.auth().currentUser;
			commit('carga',true);
			await db.collection(user.email).doc(id).get()
			.then(res=>{
				let amigo = res.data();
				amigo.id = res.id
				commit('setAmigo',amigo);
			})
			.catch(err => {
			});
			setTimeout(()=>{
				commit('carga',false);
			},1500)
		},
		agregarAmigo({commit},datos){
			const user = firebase.auth().currentUser;
			const {nombre,apellido,numero,dni} = datos;
			commit('carga',true);
			db.collection(user.email).add({
				nombre,
				apellido,
				numero,
				dni
			})
			.then(async ()=>{
				await alerta('Agregado','success')
				router.push({name: 'Amigos'})
				commit('carga',false);
			})
			.catch(err => {
			})
		},
		async editarAmigo({commit},datos){
			const {id,nombre,apellido,numero,dni} = datos;
			const user = firebase.auth().currentUser;
			await db.collection(user.email).doc(id).update({
				nombre,
				apellido,
				numero,
				dni
			})
			.then(async ()=>{
				await alerta('Editado','success')
				router.push({name: 'Amigos'})
			})
			.catch(err => {
			})
		},
		eliminarAmigo({commit},id){
			const user = firebase.auth().currentUser;
			db.collection(user.email).doc(id).delete()
			.then(async ()=>{
				await alerta('Eliminado','success')
				commit('deleteAmigo',id);
			})
			.catch(err => {
			})
		}
	},
	getters:{
		Activador(state){
			if(state.usuario === null || state.usuario === undefined || state.usuario === ''){
				return false
			}else{	
				return true
			}
		},
		buscarAmigos(state){
			let amigosFiltrados = [];
			for (let amigo of state.amigos) {
				let nombre = amigo.nombre.toLowerCase();
				let apellido = amigo.apellido.toLowerCase();
				let numero = ''+amigo.numero;
				let dni = ''+amigo.dni;
				if(nombre.indexOf(state.search) >= 0 || apellido.indexOf(state.search) >= 0 
				|| numero.indexOf(state.search) >= 0 || dni.indexOf(state.search) >= 0){
					amigosFiltrados.push(amigo);
				}
			}
			return amigosFiltrados;
		}
	}
})

async function alerta(texto,icon){
	swal(texto, {
		buttons:false,
		closeOnClickOutside:false,
		closeOnEsc:false,
		timer:2000,
		icon
	})
}