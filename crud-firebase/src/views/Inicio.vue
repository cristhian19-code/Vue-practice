<template>
    <div class="container" align="center">
      <h1>Lista de Tareas</h1>
      <ul v-for="(tarea,index) of tareas" :key="index">
        <li class="d-flex justify-content-between" >{{tarea.nombre}}
          <router-link :to="{name:'Editar',params:{'id':tarea.id}}">
            <button class="btn btn-primary">Edit</button>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex'
    export default {
      name: 'Inicio',
      computed: {
        ...mapState(['tareas'])
      },
      methods: {
          ...mapActions(['getTareas'])
      },
      created() {
        this.getTareas();
      },
    }
</script>