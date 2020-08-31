<template>
<v-layout d-flex justify-center>
    <v-flex xs11 md8 mt-5>
        <v-card>
            <v-card-text class="text-center" v-if="state">
                <h1 class="display-2">Iniciar Sesion</h1>
                <v-form class="mt-2 ">
                    <v-text-field color="secondary" type="email" required label="Email" class="my-3" autocomplete="off"></v-text-field>
                    <v-text-field color="secondary" type="password" label="Password" class="my-3"></v-text-field>
                    <v-btn block color="info" class="my-3" dark>Iniciar</v-btn>
                    <h4>Iniciar con: </h4>
                    <v-layout row wrap justify-center>
                        <v-btn height="50" width="50" icon color="error" class="mx-2 my-3">
                            <v-icon size="40">mdi-google</v-icon>
                        </v-btn>
                        <v-btn height="50" width="50" icon color="info" class="mx-2 my-3">
                            <v-icon size="40">mdi-facebook</v-icon>
                        </v-btn>
                    </v-layout>
                    <a @click="state=false">Aun no estas registrado?</a>
                </v-form>
            </v-card-text>
            <v-card-text class="text-center" v-else>
                <h1 class="display-2">Registrarse</h1>
                <v-form class="mt-2">
                    <v-text-field color="secondary" type="email" required label="Email" class="my-3" autocomplete="off"></v-text-field>
                    <v-text-field color="secondary" type="password" label="Password" class="my-3"></v-text-field>
                    <v-btn block color="success" class="my-3" dark>Registrarse</v-btn>
                    <a @click="state=true">Ya tienes na cuenta?</a>
                </v-form>
            </v-card-text>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            state: true
        }
    },
}
</script>
