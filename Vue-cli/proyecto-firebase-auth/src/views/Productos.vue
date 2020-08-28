<template>
    <div class="container-fluid">
        <p class="display-4">Productos</p>
        <router-link :to="{name: 'Comprar'}">
            <button class="btn btn-success">Shop</button>
        </router-link>
        <table class="table mt-3">
            <thead class="thead-light">
                <tr class="text-center">
                    <th>Cantidad</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody v-for="producto of productos" :key="producto.id">
                <tr class="text-center">
                    <td>{{producto.cantidad}}</td>
                    <td>{{producto.nombre}}</td>
                    <td>{{producto.precio}}</td>
                    <td class="d-flex justify-content-center">
                        <router-link :to="{name: 'Editar', params:{id: producto.id}}">
                            <button class="mx-2 btn btn-success">Edit</button>
                        </router-link>
                        <button class="mx-2 btn btn-danger" @click="eliminarProducto(producto.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'

export default {
    name: 'Productos',
    methods: {
        ...mapActions(['mostrarDatos','eliminarProducto'])
    },
    computed: {
        ...mapState(['productos'])
    },
    created() {
        this.mostrarDatos();
    },
}
</script>