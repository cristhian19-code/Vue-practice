<template>
    <div class="container">
        <form @submit.prevent="editarProducto(producto)" class="col-10" align="center">
            <input type="text" class="mt-3 text-center form-control" v-model="producto.nombre" placeholder="Producto">
            <input type="number" step="0.1" class="mt-3 text-center form-control" v-model="producto.precio" placeholder="Precio">
            <input type="number" class="mt-3 text-center form-control" v-model="producto.cantidad" placeholder="Cantidad">
            <button class="btn btn-success mt-3">Edit</button>
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
        ...mapState(['producto'])
    },
    methods: {
        ...mapActions(['editarProducto','getProducto'])
    },
    created() {
        this.getProducto(this.id)
    },
}
</script>
