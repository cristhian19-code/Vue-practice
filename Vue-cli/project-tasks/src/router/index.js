import Vue from 'vue'
import VueRouter from 'vue-router'

var firebase = require('firebase/app')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Inicio',
    meta: {requireAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "registro" */ '../views/Registro.vue')
  },
  {
    path: '/iniciar',
    name: 'Iniciar',
    component: () => import(/* webpackChunkName: "iniciar" */ '../views/Iniciar.vue')
  },
  {
    path: '/amigos',
    name: 'Amigos',
    meta: {requireAuth: true},
    component: () => import(/* webpackChunkName: "amigos" */ '../views/Registro/Amigos.vue')
  },
  {
    path: '/agregar',
    name: 'Agregar',
    meta: {requireAuth: true},
    component: () => import(/* webpackChunkName: "agregar" */ '../views/Registro/Agregar.vue')
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    meta: {requireAuth: true},
    component: () => import(/* webpackChunkName: "editar" */ '../views/Registro/Editar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,form,next)=>{
  const authUser = to.matched.some(resolve => resolve.meta.requireAuth);
  var user = firebase.auth().currentUser;
  if(user === null && authUser === true){
    next({name: 'Iniciar'});
  }else{
    next()
  }
})

export default router
