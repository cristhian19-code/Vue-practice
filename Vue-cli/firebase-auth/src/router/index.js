import Vue from 'vue'
import VueRouter from 'vue-router'
var firebase = require('firebase/app')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: () => import(/* webpackChunkName: "registro" */ '../views/Inicio.vue'),
      meta: {requireAuth : true}
    },
    {
      path: '/registro',
      name: 'Registro',
      component: () => import(/* webpackChunkName: "registro" */ '../views/Registro.vue')
    },
    {
      path: '/ingreso',
      name: 'Ingreso',
      component: () => import(/* webpackChunkName: "registro" */ '../views/Ingreso.vue')
    },
    {
      path: '/editar/:id',
      name: 'Editar',
      component: () => import(/* webpackChunkName: "editar" */ '../views/Opciones/Editar.vue'),
      meta: {requireAuth : true}
    },
    {
      path: '/validacion',
      name: 'Validacion',
      component: () => import(/* webpackChunkName: "validacion" */ '../views/Validacion.vue'),
      meta: {requireAuth : true}
    }
  ]
})

router.beforeEach((to,from,next)=>{
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
  var user = firebase.auth().currentUser;
  if(rutaProtegida===true && user===null){
    next({name: 'Ingreso'})
  }else{
    next();
  }
})

export default router
