<template>
  <div id="app" align="center">
     <b-navbar class="mb-4" toggleable="lg" type="dark" variant="danger">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link :to="{name:'Inicio'}" v-if="Habilitar" class="nav-link">Home</router-link>
            <router-link :to="{name:'Validacion'}" v-if="Habilitar" class="nav-link">Validacion</router-link>
            <router-link :to="{name:'Registro'}" v-if="!Habilitar" class="nav-link">Registro</router-link>
            <router-link :to="{name:'Ingreso'}" v-if="!Habilitar" class="nav-link">Ingreso</router-link>
            <a class="nav-link mx-1" @click="cerrarSession" v-if="Habilitar">Cerrar session</a>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    
    <router-view/>
  </div>
</template>
<script>
  import {mapActions,mapState,mapGetters} from 'vuex'
  import router from './router'

  export default {
    methods: {
      ...mapActions(['cerrarSession']),
    },
    computed: {
      ...mapState(['usuario']),
      ...mapGetters(['Habilitar'])
    }
  }
</script>