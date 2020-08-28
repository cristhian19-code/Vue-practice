Vue.component('inputs',{
    template:
    `
        <div>
            <div align="center">
                <input type="text" class="form-control mt-3" v-model="$store.state.nombre" placeholder="Nombre">
                <input type="text" class="form-control mt-3" v-model="$store.state.telefono" @keyup.enter="insertUser" placeholder="Telefono">
                <button class="btn btn-success mt-3" @click="llenandoDatos">Send</button>
            </div>
            <tabla></tabla>
        </div>
    `,
    methods:{
        ...Vuex.mapMutations(['insertUser']),
        ...Vuex.mapActions(['llenandoDatos'])
    }
})