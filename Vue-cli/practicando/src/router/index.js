import Vue from 'vue'
import VueRouter from 'vue-router'

const firebase = require('firebase/app');

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Inicio',
    meta: {requireAuth:true},
    component: () => import(/* webpackChunkName: "iniciar" */ '../views/Inicio.vue')
  },
  {
    path: '/list',
    name: 'Lista',
    meta: {requireAuth:true},
    component: () => import(/* webpackChunkName: "iniciar" */ '../views/List.vue')
  },
  {
    path: '/iniciar',
    name: 'Iniciar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Iniciar.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "registro" */ '../views/Registrarse.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,form,next) => {
  const resol = to.matched.some(resolve => resolve.meta.requireAuth)
  var user = firebase.auth().currentUser;
  if(resol === true && user === null){
    next({name: 'Iniciar'});
  }else{
    next();
  }
})

export default router
