<template>
    <div class="container-fluid" align="center">
        <p class="display-2">Registrarse</p>
        <form class="col-7" @submit.prevent="registroUsuario({
            email,
            password
        })">
            <input type="email" class="form-control mt-3" placeholder="Email" v-model="email">
            <input type="password" class="form-control mt-3" placeholder="Password" v-model="password">
            <input type="password" class="form-control mt-3" placeholder="Confirm Password" v-model="confirm_password">
            <button class="btn btn-primary mt-3" :disabled="!Habilitar">Registrarse</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Registro',
    data(){
        return{
            email:'',
            password:'',
            confirm_password:''
        }
    },
    computed: {
        Habilitar(){
           return this.password === this.confirm_password && this.password != ''
        }
    },
    methods: {
        ...mapActions(['registroUsuario']),
    },
}
</script>