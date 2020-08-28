<template>
    <div class="container">
        <h1>Edit</h1>
        <form @submit.prevent="editProduct(producto)" class="text-center col-8">
            <input type="text" class="text-center form-control mt-3" v-model="producto.producto"> 
            <input type="number" class="text-center form-control mt-3" v-model.number="producto.stock">
            <button class="btn btn-primary mt-3">Edit <i class="fas fa-edit"></i></button>
        </form>  
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'Edit',
    data(){
        return{
            id:this.$route.params.id
        }
    },
    computed:{
        ...mapState(['producto'])
    },
    methods: {
        ...mapActions(['getProduct','editProduct'])
    },
    created() {
        this.getProduct(this.id);
    },
}
</script>