Vue.component('formulario',{
    template:
    `
    <div>
        <div class="container" align="center">
            <input type="text" class="form-control mt-2" v-model="$store.state.nombre" placeholder="Nombre">
            <input type="number" class="form-control mt-2" v-model="$store.state.phone" placeholder="Telefono">
            <button class="btn btn-primary mt-2" @click="$store.commit('addActivity')">Save</button>
        </div>
        <div class="mt-3">
            <rows></rows>
        </div>
    </div>
    `
})