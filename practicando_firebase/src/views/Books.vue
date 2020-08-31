<template>
<v-layout class="px-3 d-flex justify-space-around flex-wrap ">
    <CardBook v-for="(book, index) in books" :key="index" />
</v-layout>
</template>

<script>
import CardBook from '../components/CardBook'
export default {
    name: 'Books',
    data() {
        return {
            books: [1, 2, 3, 4, 5, 6]
        }
    },
    components: {
        CardBook
    }
}
</script>

<style>

</style>>
