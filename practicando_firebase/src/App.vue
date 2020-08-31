<template>
<v-app>
    <v-app-bar app color="secondary" dark v-if="windowsWidth>=1000">
        <p class="display-1 mt-2">Hoteles</p>
        <v-btn color="secondary" :to="{name:'Home'}">Home</v-btn>
        <v-btn color="secondary" :to="{name:'Books'}">Books</v-btn>
        <v-btn color="secondary" :to="{name:'Favorites'}">Favorites</v-btn>
        <v-btn color="secondary"></v-btn>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>
    <v-bottom-navigation fixed class="d-flex justify-space-around" v-model="bottomNav" v-if="windowsWidth<1000">
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
</v-app>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {
            windowsWidth: window.innerWidth,
            bottomNav: ''
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.windowsWidth = window.innerWidth
            })
        })
    },
}
</script>
