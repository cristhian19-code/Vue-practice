Vue.component('father',{
    template:
    `
    <div>
        <div class="p-5 bg-dark text-white">
            <h1>Contenedor Padre {{numero}}</h1>
            <button class="btn btn-success btn-sm" @click="numero++">+</button>
            <input class="form-control" v-model="nombre">
            <h5>{{nombre}}</h5>
            <h5>{{name}}</h5>
            <children :numero="numero" :nombre="nombre" @nombreChildren="name = $event"></children>
        </div>
    </div>
    `,
    data(){
        return{
            numero:0,
            nombre:'',
            name:''
        }
    }
})