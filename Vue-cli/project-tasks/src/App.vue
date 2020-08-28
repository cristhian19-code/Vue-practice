<template>
  <div id="app" align="center">
    <div id="nav">
      <b-navbar class="mb-3" toggleable="lg" type="dark" variant="danger">
        <b-navbar-brand href="/">CJContact</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link class="text-light nav-link" to="/"  v-if="Activador">Home</router-link> 
            <router-link class="text-light nav-link" to="/iniciar" v-if="!Activador">Iniciar Sesion</router-link> 
            <router-link class="text-light nav-link" to="/registro" v-if="!Activador">Registrarse</router-link>
            <a href="" class="text-light nav-link" @click="cerrarSesion" v-if="Activador">Cerrar Sesion</a>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['Activador']),
  },
  methods: {
    ...mapActions(['cerrarSesion'])
  },
}
</script>
