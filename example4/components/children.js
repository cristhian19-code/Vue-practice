Vue.component('children',{
    template:
    `
    <div class="p-5 bg-primary">
        <h1>{{nombreChildren}}</h1>
        <h4>Contenedor Hijo {{numero}} {{nombre}}</h4>
    </div>
    `,
    props:['numero','nombre'],
    data(){
        return{
            nombreChildren:'Christian'
        }
    },
    mounted(){
        this.$emit('nombreChildren',this.nombreChildren);
    }
});