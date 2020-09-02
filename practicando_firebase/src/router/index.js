import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '../firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/books',
    meta:{requireAuth: true},
    name: 'Books',
    component: () => import(/* webpackChunkName: "about" */ '../views/Books.vue')
  },
  {
    path: '/favorites',
    meta:{requireAuth: true},
    name: 'Favorites',
    component: () => import(/* webpackChunkName: "about" */ '../views/Favorites.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,form,next) => {
  const autorization = to.matched.some(resolve=> resolve.meta.requireAuth)
  const user = auth.currentUser;
  if(autorization == true && !user){
    next({name: 'Home'})
  }else{
    next()
  }
})

export default router
