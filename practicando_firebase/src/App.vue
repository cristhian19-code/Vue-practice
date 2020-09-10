<template>
<v-app id="create">
    <v-app-bar app color="secondary" dark v-if="windowsWidth>=960" height="90">
        <p class="display-1 mt-2 mr-3">BookOnline</p>
        <v-btn color="info" class="mx-2" :to="{name:'Home'}">Home</v-btn>
        <v-btn color="info" class="mx-2" :to="{name:'Books'}">Books</v-btn>
        <v-btn color="info" class="mx-2" :to="{name:'Favorites'}">Favorites</v-btn>
        <v-btn color="error" class="mx-2" v-if="user" @click="cerrarSesion()">Sign Off</v-btn>
        <v-avatar class="mx-2" size="50" color="indigo" v-if="user">
            <span class="display-1">{{user.name[0]}}</span>
        </v-avatar>
        <v-flex class="mt-5" v-if="user">
            <v-form class="d-flex align-start">
                <v-text-field v-model="search" label="Search" cols="5" sm="7" single-line outlined></v-text-field>
                <v-btn height="55" class="ml-3" color="info" type="submit" @click.prevent="Busqueda(search)">
                    <v-icon>mdi-magnify</v-icon>Search
                </v-btn>
            </v-form>
        </v-flex>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

    <FloatingButton v-if="windowsWidth<960 && user" v-bind:photo="user.photo" />

    <v-bottom-navigation class="d-flex jusfify-space-around" fixed v-model="bottomNav" v-if="windowsWidth<960">
        <v-btn :to="{name:'Home'}" value="home">
            <span>Home</span>
            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn :to="{name: 'Favorites'}" value="favorites">
            <span>Favorites</span>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn :to="{name:'Books'}" value="books">
            <span>Books</span>
            <v-icon>mdi-book</v-icon>
        </v-btn>
    </v-bottom-navigation>
    <DialogSearch />
</v-app>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'
import FloatingButton from './components/FloatingButton'
import DialogSearch from './components/DialogSearch'

export default {
    name: 'App',

    data() {
        return {
            windowsWidth: window.innerWidth,
            bottomNav: '',
            dialog: false,
            search: ''
        }
    },
    components: {
        FloatingButton,
        DialogSearch
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.windowsWidth = window.innerWidth
            })
        })
    },
    methods: {
        ...mapActions(['cerrarSesion', 'Busqueda'])
    },
    computed: {
        ...mapState(['user'])
    },
}
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
    position: fixed;
    margin-bottom: 4rem;
}

#create .v-btn--floating {
    position: relative;
}
</style>
