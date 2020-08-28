Vue.component('tabla',{
    template:
    `
    <table class="table mt-3">
        <thead class="thead-dark">
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody v-for="(dato,index) of datos">
            <tr :class="{'bg-dark text-white' : dato.status,'bg-light text-dark' : !dato.status}">
                <th scope="row">{{index}}</th>
                <td>{{dato.name}}</td>
                <td>{{dato.phone}}</td>
                <td>
                    <button class="btn btn-primary btn-sm" @click="editStatus(index)">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" @click="deleteUser(index)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    `,
    props: ['datos'],
    methods: {
        deleteUser(index) {
            this.datos.splice(index,1);
        },
        editStatus(index){
            this.datos[index].status = ! this.datos[index].status;
        }
    }
});