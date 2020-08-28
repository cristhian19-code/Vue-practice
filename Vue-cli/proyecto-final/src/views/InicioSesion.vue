<template>
    <div class="container-fluid" align="center">
        <h2 class="my-2">Iniciar Sesion</h2>
        <form class="col-9" @submit.prevent="iniciarUsuario({
            email,
            password
        })">
            <input type="email" class="my-3 form-control" v-model="email" placeholder="Email">
            <input type="password" class="my-3 form-control" v-model="password" placeholder="Password">
            <button class="btn btn-outline-success">Iniciar</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'InicioSesion',
    data() {
        return {
            email:'',
            password: ''
        }
    },
    methods: {
        ...mapActions(['iniciarUsuario'])
    },
}
</script>