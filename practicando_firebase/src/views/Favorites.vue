<template>
<v-layout class="px-3 d-flex justify-space-around flex-wrap mb-13 mb-md-0">
    <CardBook v-for="(book, index) in user.favorites" :key="index" v-bind:book="book" />
</v-layout>
</template>

<script>
import {
    mapState
} from 'vuex'
import CardBook from '../components/CardBook'
export default {
    name: 'Favorites',
    computed: {
        ...mapState(['user'])
    },
    components: {
        CardBook
    }
}
</script>
