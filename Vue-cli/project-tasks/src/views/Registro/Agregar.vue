<template>
  <div class="container-fluid">
        <p class="display-4">Agregar</p>
        <form @submit.prevent="agregarAmigo({
            nombre,
            apellido,
            numero,
            dni
        })" class="col-12 col-md-7">
            <input type="text" class="form-control mt-3" v-model="$v.nombre.$model" placeholder="First Name">
            <input type="text" class="form-control mt-3" v-model="$v.apellido.$model" placeholder="Last Name">
            <input type="number" class="form-control mt-3" v-model="$v.numero.$model" placeholder="Phone">
            <input type="number" class="form-control mt-3" v-model="$v.dni.$model" placeholder="Dni">
            <button class="btn btn-outline-success mt-3" :disabled="$v.nombre.$invalid || $v.apellido.$invalid || $v.numero.$invalid || $v.dni.$invalid || carga">Add</button>
        </form>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Agregar',
    data() {
        return {
            nombre: '',
            apellido: '',
            numero: '',
            dni: ''
        }
    },
    validations:{
        numero: {
            required,
            minLength: minLength(9)
        },
        dni: {
            required,
            minLength: minLength(8)
        },
        nombre: {
            required,
            minLength: minLength(2)
        },
        apellido: {
            required,
            minLength: minLength(2)
        }
    },
    methods: {
        ...mapActions(['agregarAmigo'])
    },
    computed: {
        ...mapState(['carga'])
    },
}
</script>

<style>

</style>