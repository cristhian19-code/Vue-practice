<template>
<v-layout d-flex justify-center mt-5>
    <v-flex xs11 md8 mt-5>
        <v-card>
            <v-card-text class="text-center" v-if="state">
                <h1 class="display-2">Iniciar Sesion</h1>
                <v-form class="mt-2 ">
                    <v-text-field v-model="iniciar.email" color="secondary" type="email" required label="Email" class="my-3" autocomplete="off"></v-text-field>
                    <v-text-field v-model="iniciar.password" color="secondary" type="password" label="Password" class="my-3"></v-text-field>
                    <v-btn type="submit" @click.prevent="IniciarSesion(iniciar)" block color="info" class="my-3" dark>Iniciar</v-btn>
                    <h4>Iniciar con: </h4>
                    <v-layout row wrap justify-center>
                        <v-btn @click="RegistrarGoogle()" height="50" width="50" icon color="error" class="mx-2 my-3">
                            <v-icon size="40">mdi-google</v-icon>
                        </v-btn>
                        <v-btn @click="RegistrarFacebook()" height="50" width="50" icon color="info" class="mx-2 my-3">
                            <v-icon size="40">mdi-facebook</v-icon>
                        </v-btn>
                    </v-layout>
                    <a @click="state=false">Aun no estas registrado?</a>
                </v-form>
            </v-card-text>
            <v-card-text class="text-center" v-else>
                <h1 class="display-2">Registrarse</h1>
                <v-form class="mt-2">
                    <v-text-field v-model="registrar.email" color="secondary" type="email" required label="Email" class="my-3" autocomplete="off"></v-text-field>
                    <v-text-field v-model="registrar.password" color="secondary" type="password" label="Password" class="my-3"></v-text-field>
                    <v-text-field v-model="registrar.name" color="secondary" type="text" label="Fullname" class="my-3"></v-text-field>
                    <v-btn type="submit" @click.prevent="Registrar(registrar)" block color="success" class="my-3" dark>Registrarse</v-btn>
                    <a @click="state=true">Ya tienes una cuenta?</a>
                </v-form>
            </v-card-text>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import {
    mapActions,
} from 'vuex'

export default {
    name: 'Home',
    data() {
        return {
            state: true,
            registrar: {
                email: '',
                password: '',
                name: '',
                photo: ''
            },
            iniciar: {
                email: '',
                password: '',
            }
        }
    },

    methods: {
        ...mapActions(['RegistrarGoogle', 'Registrar', 'IniciarSesion', 'RegistrarFacebook'])
    },
}
</script>
