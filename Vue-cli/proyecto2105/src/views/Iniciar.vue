<template> 
    <div class="container-fluid" align="center">
        <p class="display-3">Iniciar Sesion</p>
        <form class="col-7" @submit.prevent="iniciarUsuario({
            email,
            password
        })">
            <input type="email" class="mt-3 form-control" placeholder="Email" v-model="email">
            <input type="password" class="mt-3 form-control" placeholder="Password" v-model="password">
            <button class="btn btn-primary mt-3">Ingresar</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'Iniciar',
    data(){
        return{
            email: '',
            password: ''
        }
    },
    computed: {
    },
    methods: {
        ...mapActions(['iniciarUsuario'])
    },
}
</script>