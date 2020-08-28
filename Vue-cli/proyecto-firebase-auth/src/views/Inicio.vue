<template>
    <div class="container-fluid">
        <p class="display-4">Bienvenido {{usuario.email}}</p>
        <router-link :to="{name: 'Productos'}">
            <button class="btn btn-primary">Productos</button>
        </router-link>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import router from '../router'

export default {
    name: 'Inicio',
    computed: {
        ...mapState(['usuario'])
    },
    created() {
        if(!this.usuario.email!='' && !this.usuario.uid){
            router.push({name: 'Ingreso'})
        }
    },
}
</script>