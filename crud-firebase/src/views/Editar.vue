<template>
  <div align="center">
        <h1>Editar</h1>
        <h5>{{id}}</h5>
        <div class="container">
            <form action="" @submit.prevent="editar(tarea)">
                <input type="text" class="form-control" v-model="tarea.nombre">
                <button class="btn btn-success">Editar</button>
            </form>
        </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'Editar',
    computed: {
        ...mapState(['tarea'])
    },
    data(){
        return{
            id: this.$route.params.id
        }
    },
    methods: {
        ...mapActions(['getTarea','editar'])
    },
    created() {
        this.getTarea(this.id)
    },

}
</script>
