<template>
    <div class="container-fluid">
        <p class="text-center display-4">Ingreso</p>
        <form class="col-10 col-md-8" @submit.prevent="ingresoUsuario({
            email,
            password
        })">
            <input v-model="email" type="email" class="mt-3 form-control" placeholder="Email">
            <input v-model="password" type="password" class="mt-3 form-control" placeholder="Password">
            <button class="mt-3 btn btn-success">Login</button>
        </form>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'

export default {
    name: 'Ingreso',
    data(){
        return {
            email:'',
            password:''
        }
    },
    computed: {
        ...mapState(['error'])
    },
    methods: {
        ...mapActions(['ingresoUsuario'])
    },
}
</script>