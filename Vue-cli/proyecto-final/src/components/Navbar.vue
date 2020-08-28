<template>
  <div class="py-2 bg-dark d-flex justify-content-center">
    <router-link class="text-white mx-2" to="/" v-if="Habilitar">Inicio</router-link>
    <router-link class="text-white mx-2" to="/iniciosesion" v-if="!Habilitar">Iniciar Sesion</router-link>
    <router-link class="text-white mx-2" to="/registrarse" v-if="!Habilitar">Registrarse</router-link>
    <a href="#" class="my-0 py-0 text-white mx-2" @click="cerrarSesion" v-if="Habilitar">Cerrar Sesion</a>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
var firebase = require('firebase/app')

export default {
  name: 'NavBar',
  methods: {
    ...mapActions(['cerrarSesion'])
  },
  computed: {
    Habilitar(){
      const user = firebase.auth().currentUser;
      if(user){
        return true
      }else{
        return false
      }
    }
  },
}
</script>

