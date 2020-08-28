<template>
    <div class="container-fluid col-10" align="center">
        <p class="display-4">Registrarse</p>
        <form @submit.prevent="crearUsuario({email:email,password:password})">
            <input type="email" class="mt-3 form-control" v-model="email" placeholder="Email">
            <input type="password" class="mt-3 form-control" v-model="password" placeholder="Password">
            <input type="password" class="mt-3 form-control" v-model="confirm_password" placeholder="Confirm Password">
            <button class="btn btn-success mt-3" :disabled="!desactivar">Crear Usuario</button>
        </form>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'

export default {
    name: 'Registro',
    data(){
        return{
            email:'',
            password:'',
            confirm_password:'',
        }
    },
    methods: {
        ...mapActions(['crearUsuario'])
    },
    computed: {
        ...mapState(['error']),
        desactivar(){
            return this.password === this.confirm_password && this.password !='';
        }
    },
}
</script>