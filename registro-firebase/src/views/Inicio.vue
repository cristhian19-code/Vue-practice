<template>
    <div align="center">
        <p class=" text-center display-4">Registro</p>
        <router-link :to="{name:'Agregar'}">
            <button class="btn btn-success mb-3">Add</button>
        </router-link>
        <table class="table">
            <thead class="thead-light text-center">
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Numero</th>
                    <th>DNI</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="user of registro" :key="user.id">
                    <td>{{user.nombre}}</td>
                    <td>{{user.apellido}}</td>
                    <td>{{user.numero}}</td>
                    <td>{{user.dni}}</td>
                    <td class="d-flex justify-content-center">
                        <router-link :to="{name:'Editar',params:{id:user.id}}">
                            <button class="btn btn-success mx-2">Edit</button>
                        </router-link>
                        <button class="btn btn-danger mx-2" @click="deleteUser(user.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name: 'Inicio',
    computed: {
        ...mapState(['registro'])
    },
    methods: {
        ...mapActions(['getUsers','deleteUser'])
    },
    created() {
        this.getUsers();
    },
}
</script>