<template>
    <div class="container col-6">
        <select class="custom-select mt-3" @change="compra($event)">
            <option selected>Seleccione su producto</option>
            <option :value="product.id" v-for="product of productos" :key="product.id">{{product.nombre}} || {{product.cantidad}}</option>
        </select>
        <input type="number" class="form-control mt-3" v-model.number="datos.cantidad">
        <button class="btn btn-success mt-3" @click="comprarProducto(datos)">Comprar</button>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name: 'Compra',
    data(){
        return{
            datos:{id:0,cantidad:0,stock:0}
        }
    },
    computed: {
        ...mapState(['productos','producto'])
    },
    methods: {
        ...mapActions(['getProductos','getProducto','comprarProducto']),
        async compra(producto){
            const id = producto.target.value
            await this.getProducto(id)
            this.datos.id = this.producto.id;
            this.datos.stock = this.producto.cantidad;
        }
    },
    created() {
        this.getProductos()
    },
}
</script>