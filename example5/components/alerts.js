Vue.component('rows',{
    template:
    `
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th class="text-center">#</th>
                <th class="text-center">First Name</th>
                <th class="text-center">Last Name</th>
                <th class="text-center">Options</th>
            </tr>
        </thead>
        <tbody v-for="(dato,index) of viewData">
            <tr :class="{'bg-dark text-white' : dato.estado , 'bg-light text-dark' : !dato.estado}">
                <td class="text-center" scope="row">{{index}}</td>
                <td class="text-center">{{dato.nombre}}</td>
                <td class="text-center">{{dato.phone}}</td>
                <td class="row justify-content-center">
                    <button class="btn btn-primary m-1" @click="editBackground(index)"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger m-1" @click="deleteUser(index)"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
    `,
    computed:{
        viewData(){
            return store.state.datos;
        }
    },
    methods: {
        deleteUser(index) {
            var datos = JSON.parse(localStorage.getItem('DBActivity'));
            datos.splice(index,1)
            localStorage.setItem('DBActivity',JSON.stringify(datos));
            store.state.datos.splice(index,1);
        },
        editBackground(index){
            store.state.datos[index].estado = !store.state.datos[index].estado 
            var datos = store.state.datos;
            localStorage.setItem('DBActivity',JSON.stringify(datos));
        }
    },
});