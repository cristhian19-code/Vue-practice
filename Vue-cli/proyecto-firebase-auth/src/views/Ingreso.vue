<template>
    <div class="container" align="center">
        <p class="display-4">Ingresar</p>
        <form class="col-7" @submit.prevent="iniciarSession({
            email,
            password
        })">
            <input type="email" class="form-control mt-3" placeholder="Email" v-model="email">
            <input type="password" class="form-control mt-3" placeholder="Password" v-model="password">
            <button class="btn btn-primary mt-3">Ingresar</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Ingreso',
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods: {
        ...mapActions(['iniciarSession'])
    },
}
</script>