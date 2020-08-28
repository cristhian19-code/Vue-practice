<template>
    <div class="container-fluid" align="center">
        <router-link :to="{name:'Productos'}">
            <button class="btn btn-primary">Back</button>
        </router-link>
        <form @submit.prevent="editarProducto({
            id,
            nombre: producto.nombre,
            cantidad: producto.cantidad,
            precio: producto.precio
        })" class="col-6">
            <p class="display-4">Editar</p>
            <input type="text" class="mt-3 form-control text-center" placeholder="Producto" v-model="producto.nombre">
            <input type="number" class="mt-3 form-control text-center" step="0.1" placeholder="Precio" v-model.number="producto.precio">
            <input type="number" class="mt-3 form-control text-center" placeholder="Cantidad" v-model.number="producto.cantidad">
            <button class="btn btn-primary mt-3">Update</button>
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
        ...mapActions(['mostrarProducto','editarProducto'])
    },
    created() {
        this.mostrarProducto(this.id);
    },
}
</script>