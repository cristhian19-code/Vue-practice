<template>
<v-app id="create">
    <v-app-bar app color="secondary" dark v-if="windowsWidth>=960" class="d-flex justify-space-between align-center">
        <v-flex class="d-flex align-center">
            <p class="display-1 mt-2 mr-3">Hoteles</p>
            <v-btn color="info" class="mx-2" :to="{name:'Home'}">Home</v-btn>
            <v-btn color="info" class="mx-2" :to="{name:'Books'}">Books</v-btn>
            <v-btn color="info" class="mx-2" :to="{name:'Favorites'}">Favorites</v-btn>
        </v-flex>
        <v-flex class="d-flex align-center" v-if="user">
            <v-avatar size="50" color="indigo">
                <span class="display-1">{{user.name[0]}}</span>
            </v-avatar>
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

        <v-btn :to="{name:'Books'}" value="nearby">
            <span>Books</span>
            <v-icon>mdi-book</v-icon>
        </v-btn>
    </v-bottom-navigation>
    <DialogSearch />
</v-app>
</template>

<script>
import {
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
            dialog: false
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
