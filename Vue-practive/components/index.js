Vue.component('formulario',{
    template:
    `
    <div>
        <div align="center" class="col-10">
            <input type="text" class="form-control mt-2" v-model="name">
            <input type="number" class="form-control mt-2" v-model="phone">
            <button class="btn btn-success mt-2" @click="addUser">Save</button>
        </div>
        <tabla :datos="datos"></tabla>
    </div>
    `,
    data(){
        return {
            datos:[],
            name:'',
            phone:''
        }
    },
    methods: {
        addUser() {
            if(this.name != '' && this.phone != ''){
                this.datos.push({
                    name:this.name,
                    phone:this.phone,
                    status:false
                });
                this.name = '';
                this.phone = '';
            }
        },
    }
});