<template>
    <div class="d-flex justify-content-center">
        <form @submit.prevent="editUser(datos)" class="col-6" align="center">
            <input type="text" class="form-control text-center" v-model="datos.nombre">
            <input type="text" class="form-control text-center" v-model="datos.apellido">
            <input type="text" class="form-control text-center" v-model.number="datos.numero">
            <input type="text" class="form-control text-center" v-model.number="datos.dni">
            <button class="btn btn-primary mt-2">Edit</button>
        </form>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'Editar',
    data(){
        return {
            id: this.$route.params.id  
        }
    },
    computed: {
        ...mapState(['datos'])
    },
    methods: {
        ...mapActions(['getUser','editUser'])
    },
    created() {
        this.getUser(this.id)
    },

}
</script>