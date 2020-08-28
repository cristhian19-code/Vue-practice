<template>
    <div class="container">
        <input type="text" class="form-control my-3" placeholder="Buscar por Nombre" v-model="search" v-on:keyup="buscadorUsuarios(search)">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Dni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(usuario,index) of buscarUsuarios" :key="index">
                    <th scope="row" v-if="index<9">00{{index++}}</th>
                    <th scope="row" v-else-if="index>8 && index<99">0{{index++}}</th>
                    <th scope="row" v-else>{{index++}}</th>
                    <td>{{usuario.nombre}}</td>
                    <td>{{usuario.apellido}}</td>
                    <td>{{usuario.numero}}</td>
                    <td>{{usuario.dni}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
    name: 'Lista',
    data() {
        return {
            search: ''
        }
    },
    computed: {
        ...mapState(['usuarios']),
        ...mapGetters(['buscarUsuarios'])
    },
    methods: {
        ...mapActions(['mostrarAmigos','buscadorUsuarios'])
    },
    created() {
        this.mostrarAmigos();
    }
}
</script>

<style>

</style>