<template>
    <div class="container-fluid">
        <p class="display-4 my-3">Editar</p>
        <div :hidden="!carga" class="mt-5">
            <pulse-loader></pulse-loader>
        </div>
        <form :hidden="carga" class="col-12 col-md-7" @submit.prevent="editarAmigo({
            id,
            nombre: amigo.nombre,
            apellido: amigo.apellido,
            numero: amigo.numero,
            dni: amigo.dni,
        })">
            <input type="text" placeholder="Last Name" class="form-control mt-3 text-center" v-model="amigo.nombre">
            <input type="text" placeholder="First Name" class="form-control mt-3 text-center" v-model="amigo.apellido">
            <input type="number" placeholder="Phone" class="form-control mt-3 text-center" v-model.number="amigo.numero">
            <input type="number" placeholder="Dni" class="form-control mt-3 text-center" v-model.number="amigo.dni">
            <button class="btn btn-outline-success mt-3">Edit</button>
        </form>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name:'Editar',
    data() {
        return {
            id: this.$route.params.id
        }
    },
    components:{
        PulseLoader
    },
    computed: {
        ...mapState(['amigo','carga'])
    },
    methods: {
        ...mapActions(['encontrarAmigo','editarAmigo'])
    },
    created() {
        this.encontrarAmigo(this.id);
    },
}
</script>