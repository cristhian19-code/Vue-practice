<template>
    <div class="container-fluid" align="center">
        <p class="display-3">Agregar</p>
        <form @submit.prevent="agregarUsuario({
            nombre,
            apellido,
            numero,
            dni
        })" class="col-7" align="center">
            <input type="text" class="mt-3 form-control" v-model="nombre" placeholder="Nombre">
            <input type="text" class="mt-3 form-control" v-model="apellido" placeholder="Apellido">
            <input type="number" class="mt-3 form-control" v-model.number="numero" placeholder="Telefono/Celular">
            <input type="number" class="mt-3 form-control" v-model.number="dni" placeholder="Dni">
            <button class="mt-3 btn btn-primary">Agregar</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'AgregarUsuario',
    data(){
        return{
            nombre: '',
            apellido: '',
            numero: 0,
            dni: 0,
        }
    },
    methods: {
        ...mapActions(['agregarUsuario'])
    },
}
</script>