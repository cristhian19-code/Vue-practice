<template>
    <div class="container">
        <p>{{$route.params.id}}</p>
        <img :src="data($route.params.id).url" alt="" class="rounded-lg" height="200px" width="400px">
       
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'Foto',
    computed:{
        ...mapState(['fotos'])
    },
    methods: {
        data(id) {
            return this.fotos[id]
        }
    },
}
</script>
