<template>
    <div class="container" align="center">
        <p class="display-4">Agregar</p>
        <form @submit.prevent="addUser(datos)" class="col-10 col-md-7">
            <input type="text" class="form-control mt-2 text-center" v-model="datos.nombre" placeholder="Nombre">
            <input type="text" class="form-control mt-2 text-center" v-model="datos.apellido" placeholder="Apellido">
            <input type="text" class="form-control mt-2 text-center" v-model.number="datos.numero" placeholder="Telefono">
            <input type="text" class="form-control mt-2 text-center" v-model.number="datos.dni" placeholder="Dni">
            <button class="btn btn-primary mt-2">Add</button>
        </form>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'Agregar',
    computed: {
        ...mapState(['datos'])
    },
    methods:{
        ...mapActions(['addUser'])
    },
    created() {
        this.datos.nombre = '';
        this.datos.apellido = '';
        this.datos.numero = '';
        this.datos.dni = '';
    },
}
</script>