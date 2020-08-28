<template>
    <div class="container">
        <form @submit.prevent="addProduct(producto)" class="col-8">
            <input type="text" class="text-center form-control mt-2" v-model="producto.producto" placeholder="Product">
            <input type="text" class="text-center form-control mt-2" v-model.number="producto.stock" placeholder="Stock">
            <button type="submit" class="mt-2 btn btn-dark">Send <i class="fas fa-save"></i></button>
        </form>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name:'Agregar',
    computed: {
        ...mapState(['producto'])
    },
    methods:{
        ...mapActions(['addProduct'])
    },
    created() {
        this.producto.producto = '';
        this.producto.stock = '';
    },
}
</script>