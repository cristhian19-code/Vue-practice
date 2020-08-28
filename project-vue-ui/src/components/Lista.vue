<template>
    <div class="container">
        <ul class="list-group">
            <li 
             v-for="(fruta,index) of arrayOrdenado" :key="fruta.id" @click="aumentar(index)"
            class="list-group-item d-flex justify-content-between align-items-center">
                {{fruta.nombre}}
                <span class="badge badge-primary badge-pill">{{fruta.cantidad}}</span>
            </li>
        </ul>
        <div class="container">
            <button class="btn btn-primary mt-2" @click="reset">Reset</button>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name:'Lista',
    computed: {
        ...mapState(['frutas']),
        arrayOrdenado(){
            return this.frutas.sort((a,b)=> b.cantidad - a.cantidad);
        }
    },
    methods:{
        ...mapMutations(['aumentar','reset'])
    }
    
}
</script>
