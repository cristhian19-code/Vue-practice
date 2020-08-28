const app = new Vue({
    el: '#app',
    data: {
        titulo:'Estamos en Vue',
        contador:0
    },
    computed:{
        invertido(){
            return this.titulo.split('').reverse().join('');
        },
        color(){
            if(this.contador>100){
                this.contador=100;
            }
            return {
                'bg-success': this.contador <=25,
                'bg-primary': this.contador >25 && this.contador <=50,
                'bg-info': this.contador >50 && this.contador <=75,
                'bg-danger': this.contador >75 && this.contador <=100,
            }
        }
    }
});