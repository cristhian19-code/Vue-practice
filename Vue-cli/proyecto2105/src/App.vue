<template>
  <div id="app" class="mt-3" align="center">
    <div id="nav" align="center">
      <router-link to="/" v-if="exiteUsuario" class="btn btn-primary mx-1">Home</router-link> 
      <router-link to="/iniciar" v-if="!exiteUsuario" class="btn btn-primary mx-1">Iniciar Sesion</router-link> 
      <router-link to="/registrarse" v-if="!exiteUsuario" class="btn btn-primary mx-1">Registrarse</router-link> 
      <a href="" @click="cerrarSesion" v-if="exiteUsuario" class="btn btn-danger mx-1">Cerrar Session</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['cerrarSesion'])
  },
  computed: {
    ...mapGetters(['exiteUsuario'])
  },
}
</script>
