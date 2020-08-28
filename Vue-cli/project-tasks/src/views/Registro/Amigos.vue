<template>
    <div class="container-fluid">
        <p class="display-4 my-3">Amigos</p>
        <router-link :to="{name: 'Agregar'}">
            <button class="btn btn-outline-success mb-3">Agregar</button>
        </router-link>
        <div class="">
            <input type="text" class="form-control my-3" v-model="search" v-on:keyup="filtrarAmigos(search)" placeholder="Buscar Nombre/Apellido/Numero/Dni ....">
        </div>
        <div :hidden="!carga" class="mt-5">
            <pulse-loader></pulse-loader>
        </div>
        <table class="table table-hover" align="center" :hidden="carga">
            <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Dni</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="(amigo,index) of buscarAmigos" :key="index">
                    <th scope="row" v-if="index<9">00{{index+1}}</th>
                    <th scope="row" v-else-if="index>8 && index<99">0{{index+1}}</th>
                    <th scope="row" v-else>{{index+1}}</th>
                    <td>{{amigo.nombre}} </td>
                    <td>{{amigo.apellido}}</td>
                    <td>{{amigo.numero}}</td>
                    <td>{{amigo.dni}}</td>
                    <td>
                        <router-link :to="{name: 'Editar', params: {id: amigo.id}}">
                            <button class="mx-2 btn btn-outline-primary my-2 my-md-0">Edit</button>
                        </router-link>
                        <button @click="eliminarAmigo(amigo.id)" class="mx-2 btn btn-outline-danger my-2 my-md-0">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapActions,mapState,mapGetters} from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: 'Amigos',
    data() {
        return {
            search: ''
        }
    },
    computed: {
        ...mapState(['amigos','carga']),
        ...mapGetters(['buscarAmigos'])
    },
    methods: {
        ...mapActions(['mostrarAmigos','eliminarAmigo','filtrarAmigos'])
    },
    created() {
        this.mostrarAmigos();
    },
    components:{
        PulseLoader
    }
}
</script>

<style>

</style>