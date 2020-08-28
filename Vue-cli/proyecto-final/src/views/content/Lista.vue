<template>
    <div class="container-fluid" align="center">
        <h2 class="my-2">Lista de Tareas</h2>
        <div class="row my-2 col-12 col-md-10 justify-content-center">
            <b-button v-b-modal.modal-center-add class="btn btn-primary col-6 col-md-4">Add</b-button>
            <input type="text" class="form-control my-3" placeholder="Search" v-model="search" v-on:keyup="filtradoAmigos(search)">
        </div>
        <div class="mt-5" :hidden="!carga">
            <clip-loader :size="size"></clip-loader>
        </div>
        <table class="table table-hover" :hidden="carga">
            <thead>
                <tr class="text-center">
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="(amigo,index) of filtrarAmigos" :key="index">
                    <th scope="row">{{index}}</th>
                    <td>{{amigo.nombre}}</td>
                    <td>{{amigo.apellido}}</td>
                    <td>{{amigo.celular}}</td>
                    <td>{{amigo.email}}</td>
                    <td>
                        <div class="container">
                            <b-button v-b-modal.modal-center-edit class="btn btn-success mx-1" @click="obtenerAmigo(amigo.id)">Edit</b-button>
                            <b-button  class="btn btn-danger mx-1" @click="eliminarAmigo(amigo.id)">Delete</b-button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <!-- modal para agregar amigo -->
            <b-modal id="modal-center-add" centered title="Add Friend" :show="false">
                <div class="container-fluid col-10">
                    <input type="text" class="form-control my-2" placeholder="First Name" v-model="nombre">
                    <input type="text" class="form-control my-2" placeholder="Last Name" v-model="apellido">
                    <input type="number" class="form-control my-2" placeholder="Phone" v-model.number="celular">
                    <p class="text-danger" v-if="alertPhone">Minimo 7 digitos</p>
                    <input type="text" class="form-control my-2" :class="alertEmail" placeholder="Email" v-model="$v.email.$model">
                </div>
                <template v-slot:modal-footer>
                    <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="agregarAmigo({
                            nombre,
                            apellido,
                            celular,
                            email
                        })"
                    >
                        Agregar
                    </b-button>
                </template>
            </b-modal>
            <!-- modal para editar amigo -->
            <b-modal id="modal-center-edit" centered title="Edit Friend">
                <div class="mt-5" :hidden="!cargarEdit">
                    <clip-loader :size="size"></clip-loader>
                </div>
                <div class="container-fluid col-10" :hidden="cargarEdit">
                    <label for="">Nombre: </label>
                    <input type="text" class="text-center form-control my-2" placeholder="First Name" v-model="friend.nombre">
                    <label for="">Apellido: </label>
                    <label for=""></label>
                    <input type="text" class="text-center form-control my-2" placeholder="Last Name" v-model="friend.apellido">
                    <label for="">Celular/Telefono: </label>
                    <input type="number" class="text-center form-control my-2" placeholder="Phone" v-model.number="friend.celular">
                    <label for="">Email: </label>
                    <input type="text" class="text-center form-control my-2" placeholder="Email" v-model="friend.email">
                </div>
                <template v-slot:modal-footer>
                    <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="editarAmigo({
                            id:friend.id,
                            nombre:friend.nombre,
                            apellido:friend.apellido,
                            celular:friend.celular,
                            email:friend.email,
                        })"
                    >
                        Editar
                    </b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import {required,email,minLength} from 'vuelidate/lib/validators'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
    name: 'Lista',
    components:{
        ClipLoader
    },
    data() {
        return {
            nombre: '',
            apellido: '',
            celular: '',
            email: '',
            search: '',
            size:'60px'
        }
    },
    validations:{
        nombre:required,
        apellido:required,
        email:{
            required,
            email
        },
        celular: {
            required,
            minLength: minLength(7)
        }
    },
    computed: {
        ...mapState(['friend','amigos','carga','cargarEdit']),
        ...mapGetters(['filtrarAmigos']),
        alertEmail(){
            if(this.$v.email.$invalid && this.$v.email.$model != ''){
                return 'is-invalid'
            }else if(!this.$v.email.$invalid && this.$v.email.$model != ''){
                return 'is-valid'
            }
        },
        alertPhone(){
            if(this.$v.celular.$invalid && this.$v.celular.$model != ''){
                return true
            }else if(!this.$v.celular.$invalid && this.$v.celular.$model != ''){
                return false
            }
        }
    },
    methods: {
        ...mapActions(['editarAmigo','agregarAmigo','mostrarAmigos','eliminarAmigo','obtenerAmigo','filtradoAmigos'])
    },
    created() {
        this.mostrarAmigos()
    },
}
</script>