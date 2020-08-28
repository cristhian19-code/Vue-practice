import Vue from 'vue'
import VueRouter from 'vue-router'
var firebase = require('firebase/app')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Inicio',
    meta: {requireAuth:true},
    component: () => import(/* webpackChunkName: "inicio" */ '../views/Inicio.vue')
  },
  {
    path: '/lista',
    name: 'Lista',
    meta: {requireAuth:true},
    component: () => import(/* webpackChunkName: "lista" */ '../views/content/Lista.vue')
  },
  {
    path: '/registrarse',
    name: 'Registrarse',
    component: () => import(/* webpackChunkName: "registrarse" */ '../views/Registrarse.vue')
  },
  {
    path: '/iniciosesion',
    name: 'InicioSesion',
    component: () => import(/* webpackChunkName: "inicio sesion" */ '../views/InicioSesion.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,form,next) => {
  const requireAuth = to.matched.some(resolve => resolve.meta.requireAuth);
  const user = firebase.auth().currentUser;
  if(requireAuth === true && user === null){
    next({name: 'InicioSesion'})
  }else{
    next();
  }
})
export default router
