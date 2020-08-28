Vue.component('tabla',{
    template:
    `
    <table class="table mt-3">
        <thead class="thead-dark">
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
        </thead>
        <tbody v-for="(data,index) of datos">
            <tr>
                <th scope="row">{{index}}</th>
                <td>{{data.nombre}}</td>
                <td>{{data.dni}}</td>
            </tr>
        </tbody>
    </table>
    `,
    computed:{
        ...Vuex.mapState(['datos'])
    }
})