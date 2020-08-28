<template>
    <div class="container" align="center">
        <select class="custom-select" @change="selecionado($event)">
            <option selected>Seleciona un producto</option>
            <option class="text-center" :value="producto.id" v-for="producto of productos" :key="producto.id">{{producto.nombre}}</option>
        </select>
        <input type="number" class="text-center mt-3 form-control" v-model.number="cantidad">
        <button class="btn btn-primary mt-3" @click="comprarProducto({
            id: product.id,
            cantidad: product.cantidad,
            cantidad_pedida: cantidad
        })">Comprar</button>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name: 'Comprar',
    data(){
        return{
            cantidad:0,
            product:{id:'',cantidad:0}
        }
    },
    computed: {
        ...mapState(['productos','producto'])
    },
    methods: {
        ...mapActions(['mostrarDatos','getProducto','comprarProducto']),
        async selecionado(producto){
            var id = producto.target.value;
            await this.getProducto(id);
            this.product.cantidad = this.producto.cantidad ;
            this.product.id = this.producto.id;
        }
    },
    created() {
        this.mostrarDatos();
    },
}
</script>