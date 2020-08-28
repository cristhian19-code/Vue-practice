<template>
    <div class="container"  align="center">
        <p class="display-4">Registro</p>
        <form @submit.prevent="registrarUsuario({
            email,
            password
        })" class="col-8">
            <input type="email" class="form-control mt-3" placeholder="Email" v-model="email">
            <input type="password" class="form-control mt-3" placeholder="Password" v-model="password">
            <input type="password" class="form-control mt-3" placeholder="Password" v-model="confirm_password">
            <button class="btn btn-primary mt-3" :disabled="!Deshabilitar">Registrarse</button>
        </form>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name: 'Registro',
    data(){
        return{
            email:'',
            password:'',
            confirm_password: ''
        }
    },
    computed: {
        Deshabilitar(){
            return this.password === this.confirm_password && this.password != ''
        }
    },
    methods: {
        ...mapActions(['registrarUsuario'])
    },
}
</script>