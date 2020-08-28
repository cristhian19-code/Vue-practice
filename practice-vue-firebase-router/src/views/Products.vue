<template>
  <div>
    <router-link :to="{name:'Agregar'}">
        <button class="btn btn-success">Add <i class="fas fa-plus-circle"></i></button>
    </router-link>
    <table class="table mt-3">
        <thead class="thead-dark">
            <tr class="text-center">
                <th>Product</th>
                <th>Stock</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody v-for="prod of products" :key="prod.id">
            <tr class="text-center">
                <td>{{prod.producto}}</td>
                <td>{{prod.stock}}</td>
                <td>
                    <router-link :to="{name:'Edit',params:{id:prod.id}}">
                        <button class="btn btn-primary mx-2">Edit <i class="fas fa-edit"></i></button>
                    </router-link>
                    <button class="btn btn-danger mx-2" @click="deleteProduct(prod.id)">Delete <i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'Products',
    computed: {
        ...mapState(['products'])
    },
    methods:{
        ...mapActions(['getProducts','deleteProduct'])
    },
    created() {
        this.getProducts();
    },
}
</script>
