import Vue from 'vue'
import VueRouter from 'vue-router'

var firebase = require('firebase/app')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Inicio',
    meta:{requireAuth: true},
    component: () => import(/* webpackChunkName: "inicio" */ '../views/Inicio.vue')
  },
  {
    path: '/iniciar',
    name: 'Iniciar',
    component: () => import(/* webpackChunkName: "iniciar sesion" */ '../views/Iniciar.vue')
  },
  {
    path: '/registrarse',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "registro" */ '../views/Registro.vue')
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    meta:{requireAuth: true},
    component: () => import(/* webpackChunkName: "usuarios" */ '../views/Usuarios.vue')
  },
  {
    path: '/agregar',
    name: 'AgregarUsuario',
    meta:{requireAuth: true},
    component: () => import(/* webpackChunkName: "usuarios" */ '../views/AgregarUsuario.vue')
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    meta:{requireAuth: true},
    component: () => import(/* webpackChunkName: "usuarios" */ '../views/Editar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,form,next)=>{
  const rutaProtegida = to.matched.some(resolve => resolve.meta.requireAuth);
  var autorizacion = firebase.auth().currentUser;

  if(rutaProtegida===true && autorizacion==null){
    next({name: 'Iniciar'});
  }else{
    next();
  }
})

export default router
