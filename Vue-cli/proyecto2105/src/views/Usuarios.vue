<template>
    <div class="container-fluid">
        <p class="display-3 mb-3">Registro</p>
        <router-link :to="{name: 'AgregarUsuario'}">
            <button class="btn btn-success my-3">Agregar</button>
        </router-link>
        <table class="table table-hover">
            <thead>
                <tr class="text-center" >
                    <th>Cod</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Number</th>
                    <th>Dni</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="(usuario,index) of usuarios" :key="index">
                    <th scope="row" v-if="index<9">00{{index+1}}</th>
                    <th scope="row" v-else>0{{index+1}}</th>
                    <td>{{usuario.nombre}}</td>
                    <td>{{usuario.apellido}}</td>
                    <td>{{usuario.numero}}</td>
                    <td>{{usuario.dni}}</td>
                    <td>
                        <router-link :to="{name: 'Editar',params: {id:usuario.id}}">
                            <button class="btn btn-primary mx-2">Editar</button>
                        </router-link>
                        <button class="btn btn-danger mx-2" @click="eliminarUsuario(usuario.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name: 'Usuarios',
    computed: {
        ...mapState(['usuarios'])
    },
    methods: {
        ...mapActions(['mostrarPersonas','eliminarUsuario'])
    },
    created() {
        this.mostrarPersonas()
    },
}
</script>