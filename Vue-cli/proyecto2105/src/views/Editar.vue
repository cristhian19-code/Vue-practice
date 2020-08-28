<template>
    <div class="container-fluid" align="center">
        <p class="display-4">Editar</p>
        <form @submit.prevent="Editar({
            id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            numero: usuario.numero,
            dni: usuario.dni,
        })" class="col-8">
            <input type="text" class="mt-3 form-control text-center" placeholder="Nombre" v-model="usuario.nombre">
            <input type="text" class="mt-3 form-control text-center" placeholder="Apellido" v-model="usuario.apellido">
            <input type="number" class="mt-3 form-control text-center" placeholder="Telefono/Celular" v-model.number="usuario.numero">
            <input type="number" class="mt-3 form-control text-center" placeholder="Dni" v-model.number="usuario.dni">
            <button class="btn btn-success mt-3">Editar</button>
        </form>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name: 'Editar',
    data(){
        return{
            id: this.$route.params.id
        }
    },
    computed: {
        ...mapState(['usuario'])
    },
    methods: {
        ...mapActions(['editarUsuario','Editar'])
    },
    created() {
        this.editarUsuario(this.id);
    },
}
</script>