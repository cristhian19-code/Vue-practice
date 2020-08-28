<template>
    <div class="container-fluid">
        <router-link :to="{name:'Agregar'}">
            <button class="btn btn-success my-3 mx-2">Add</button>
        </router-link>
        <router-link :to="{name:'Compra'}">
            <button class="btn btn-primary mx-2">Shop</button>
        </router-link>
        <table class="table table-striped">
            <thead class="text-center">
                <tr>
                    <th>Producto</th>
                    <th>Precio/u</th>
                    <th>Cantidad</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="producto of productos" :key="producto.id">
                    <td>{{producto.nombre}}</td>
                    <td>{{producto.precio}}</td>
                    <td>{{producto.cantidad}}</td>
                    <td class="d-flex justify-content-center">
                        <router-link :to="{name:'Editar',params:{id:producto.id}}">
                            <button class="btn btn-primary mx-2">Edit</button>
                        </router-link>
                        <button class="btn btn-danger mx-2" @click="eliminarProducto(producto.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name:'Inicio',
    computed: {
        ...mapState(['productos'])
    },
    methods: {
        ...mapActions(['getProductos','eliminarProducto'])
    },
    created() {
        this.getProductos();
    },
}
</script>