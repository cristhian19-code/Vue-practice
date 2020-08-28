Vue.component('tabla',{
    template:
    `
    <table class="table mt-3">
        <thead class="thead-dark">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody v-for="(dato,index) of datos">
            <tr>
                <th scope="row">{{index}}</th>
                <td>{{dato.nombre}}</td>
                <td>{{dato.telefono}}</td>
            </tr>
        </tbody>
    </table>
    `,
    computed:{
        ...Vuex.mapState(['datos']),
    }
})