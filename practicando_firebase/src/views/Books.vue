<template>
<v-layout class="px-3 d-flex justify-space-around flex-wrap mb-13 mb-md-0">
    <CardBook v-for="(book, index) in books" :key="index" v-bind:book="book" />
</v-layout>
</template>

<script>
import CardBook from '../components/CardBook'
import {
    mapState
} from "vuex"

export default {
    name: 'Books',
    data() {
        return {
            search: 'javascript'
        }
    },
    computed: {
        ...mapState(['books'])
    },
    components: {
        CardBook
    },
}
</script>

<style>

</style>>
