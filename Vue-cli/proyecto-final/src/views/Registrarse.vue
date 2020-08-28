<template>
    <div class="container-fluid" align="center">
        <h2 class="my-2">Registrarse</h2>
        <form action="" class="col-8" @submit.prevent="registrarUsuario({
                email,
                password
            })">
            <input type="email" class="form-control my-2" v-model="email" placeholder="Email">
            <input type="password" class="form-control my-2" v-model="password" placeholder="Password">
            <input type="password" class="form-control my-2" v-model="repeatpassword" placeholder="Repeat Password">
            <button class="btn btn-outline-primary mt-3">Registrarse</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Registrarse',
    data() {
        return {
            email: '',
            password: '',
            repeatpassword: '',
        }
    },
    methods: {
        ...mapActions(['registrarUsuario'])
    },
}
</script>