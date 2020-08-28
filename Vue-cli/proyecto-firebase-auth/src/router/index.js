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
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import(/* webpackChunkName: "ingreso" */ '../views/Ingreso.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "registro" */ '../views/Registro.vue')
  },
  {
    path: '/productos',
    name: 'Productos',
    meta: {requireAuth:true},
    component: () => import(/* webpackChunkName: "productos" */ '../views/Productos.vue')
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    meta: {requireAuth: true},
    component: () => import(/* webpackChunkName: "editar" */ '../views/Editar.vue')
  },
  {
    path: '/comprar',
    name: 'Comprar',
    meta: {requireAuth:true},
    component: () => import(/* webpackChunkName: "editar" */ '../views/Comprar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to,form,next) => {
  const rutaProtegida = to.matched.some(resolve => resolve.meta.requireAuth);
  var user = firebase.auth().currentUser;
  if(rutaProtegida===true && user===null){
    next({name: 'Ingreso'});
  }else{
    next();
  }
})

export default router
