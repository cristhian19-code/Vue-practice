<template>
  <div class="container-fluid">
        <p class="display-4 mt-3">Editar</p>
        <form class="col-8" @submit.prevent="editarTarea({
                id,
                nombre: tarea.nombre
            })">
            <input type="text" class="text-center mt-3 form-control" v-model="tarea.nombre">
            <button class="mt-3 btn btn-primary">Editar</button>
        </form>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'

export default {
    name: 'Editar',
    data(){
        return{
            id: this.$route.params.id
        }
    },
    computed: {
      ...mapState(['tarea'])  
    },
    methods: {
        ...mapActions(['getTarea','editarTarea'])
    },
    created() {
        this.getTarea(this.id);
    },
}
</script>