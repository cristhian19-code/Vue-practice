<template>
    <div class="container-fluid" align="center">
        <p class="display-4">Iniciar Sesion</p>
        <form @submit.prevent="IniciarSesion({
            email,
            password
        })" class="col-10 col-md-6">
            <input type="email" class="form-control mt-3" placeholder="Email" v-model="email">
            <input type="password" class="form-control mt-3" placeholder="Password" v-model="password">
            <button class="btn btn-outline-primary mt-3">Iniciar Sesion</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Iniciar',
    data() {
        return {
            email: '',
            password:''
        }
    },
    methods: {
        ...mapActions(['IniciarSesion'])
    },
}
</script>

<style>

</style>