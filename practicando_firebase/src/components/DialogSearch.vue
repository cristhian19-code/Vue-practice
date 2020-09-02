<template>
<v-dialog v-model="status" persistent max-width="290">
    <v-card>
        <v-card-text class="pb-0 pt-3">
            <v-text-field v-model="search" color="secondary" label="Name of the book"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" text @click="changeStatus(false)">Disagree</v-btn>
            <v-btn color="green darken-1" text @click="Busqueda(search)">Search</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'
export default {
    data() {
        return {
            search: ''
        }
    },
    methods: {
        ...mapActions(['changeStatus', 'Busqueda'])
    },
    computed: {
        ...mapState(['status'])
    },
}
</script>

<style>

</style>
