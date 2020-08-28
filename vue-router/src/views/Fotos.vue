<template>
    <div>
        <router-link :to="{name:'Fotos' , params:{id}}" v-for="(id,index) of link" :key="index">
            <button class="btn btn-primary">Foto {{id}}</button>
        </router-link>
        <Foto/>
         <div class="container">
                <button class="btn btn-primary" @click="next">Next</button>
                <button class="btn btn-success" @click="home">Home</button>
                <button class="btn btn-danger" @click="back">Back</button>
        </div>
    </div>
</template>

<script>
import Foto from '@/components/ViewFotos'
export default {
    name:'Fotos',
    components:{
        Foto
    },
    methods: {
        next(){
            this.$router.go(1)
        },
        back(){
            this.$router.go(-1)
        },
        home(){
            this.$router.push('/')
        }
    },
    data(){
        return{
            link:[0,1,2,3]
        }
    }
}
</script>
