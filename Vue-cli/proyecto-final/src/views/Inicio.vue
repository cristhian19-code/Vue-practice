<template>
    <div class="container-fluid" align="center">
        <h1>Inicio</h1>
        <h2>Bienvenido</h2>
        <h3>{{usuario.email}}</h3>
        <router-link :to="{name: 'Lista'}">
            <button class="btn btn-outline-primary">Registro</button>
        </router-link>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'Inicio',
    computed: {
        ...mapState(['usuario'])
    },
}
</script>