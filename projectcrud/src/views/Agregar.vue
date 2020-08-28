<template>
    <div class="container">
        <form @submit.prevent="agregarProducto(productos)" class="col-10 col-md-7">
            <input type="text" class="form-control mt-3 text-center" v-model="productos.nombre" placeholder="Nombre del producto" autofocus autocomplete="off">
            <input type="number" class="form-control mt-3 text-center" step="0.1" v-model.number="productos.precio" placeholder="Precio unitario">
            <input type="number" class="form-control mt-3 text-center" v-model.number="productos.cantidad" placeholder="Cantidad">
            <button class="btn btn-primary mt-3">Add</button>
        </form>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name: 'Agregar',
    computed: {
        ...mapState(['productos'])
    },
    methods: {
        ...mapActions(['agregarProducto'])
    }
}
</script>
