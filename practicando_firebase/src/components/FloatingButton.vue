<template>
<v-speed-dial v-model="fab" :bottom="bottom" :right="right" :direction="direction" :transition="transition">
    <template v-slot:activator>
        <v-btn v-model="fab" color="info darken-2" dark fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-avatar v-if="!fab && photo" size="55">
                <img :src="photo" alt="alt">
            </v-avatar>
            <v-icon v-if="!fab && !photo">mdi-account-circle</v-icon>
        </v-btn>
    </template>
    <v-btn fab dark small color="green">
        <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn @click="changeStatus(true)" fab dark small color="info">
        <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn @click="cerrarSesion()" fab dark small color="secondary">
        <v-icon>mdi-arrow-right-bold-box</v-icon>
    </v-btn>
</v-speed-dial>
</template>

<script>
import {
    mapActions
} from 'vuex'
export default {
    props: ['photo'],
    data() {
        return {
            direction: 'top',
            fab: false,
            fling: false,
            tabs: null,
            right: true,
            bottom: true,
            transition: 'slide-y-reverse-transition'
        }
    },
    methods: {
        ...mapActions(['cerrarSesion', 'changeStatus'])
    },
}
</script>
