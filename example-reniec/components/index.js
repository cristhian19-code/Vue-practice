Vue.component('index',{
    template:
    `
    <div>
        <div class="container" align="center">
            <input v-model="$store.state.nombre" type="text" class="form-control mt-3" placeholder="Nombre">
            <input v-model="$store.state.dni" type="text" class="form-control mt-3" @keyup.enter="guardarDatos" placeholder="Telefono">
            <button class=" btn btn-primary mt-3" @click="llenado">Send</button>
        </div>
        <tabla></tabla>
    </div>
    `,
    methods:{
        ...Vuex.mapMutations(['llenarDatos','guardarDatos']),
        ...Vuex.mapActions(['llenado'])
    }
});