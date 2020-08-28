<template>
    <div class="container-fluid">
        <p class="display-4">
            Bienvenido {{usuario.email}}
        </p>
        <form @submit.prevent="agregarTarea({
            nombre
        })" class="row col-sm-8 col-md-12 container-fluid">
            <input type="text" class="mt-2 col-md-10 form-control" v-model="nombre">
            <button class="mt-2 col-md-2 btn btn-primary">Agregar Tarea</button>
        </form>
        <form>
            <input class="form-control my-3" type="text" v-model="texto" placeholder="Buscar..." v-on:keyup="buscadorTareas(texto)">
        </form>
        <p>{{texto}}</p>
        <table class="table table-hover mt-3">
            <thead>
                <tr class="text-center">
                    <th>#</th>
                    <th>Tarea</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="(tarea,index) of arrayFiltrado" :key="index">
                    <th scope="row">{{index}}</th>
                    <td>{{tarea.nombre}}</td>
                    <td>
                        <router-link :to="{name: 'Editar', params: {id: tarea.id}}">
                            <button class="mx-2 btn btn-success">Editar</button>
                        </router-link>
                        <button class="mx-2 btn btn-danger" @click="eliminarUsuario(tarea.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    name: 'Inicio',
    data(){
        return{
            nombre:'',
            texto:''
        }
    },
    computed: {
        ...mapState(['usuario','tareas']),
        ...mapGetters(['arrayFiltrado'])
    },
    methods: {
        ...mapActions(['mostrarTareas','agregarTarea','eliminarUsuario','buscadorTareas'])
    },
    created() {
        this.mostrarTareas()
    },
}
</script>