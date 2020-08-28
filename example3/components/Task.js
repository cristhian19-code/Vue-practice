Vue.component('task',{
    template:
    `
        <div>
            <div class="row justify-content-center">
                <input class="form-control col-6" @keyup.enter="addTask" v-model="tarea" placeholder="task">
            </div>
            <div v-for="(task,index) of tasks" class="mt-3">
                <div class="alert d-flex justify-content-between" :class="{'alert-success' : task.estado , 'alert-danger' : !task.estado}" role="alert">
                    <div> 
                    {{task.task}} || {{task.estado}}
                    </div>   
                    <div>
                        <button class="btn btn-success" @click="editTask(index)">Ok</button>
                        <button class="btn btn-danger" @click="deleteTask(index)">X</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods:{
        addTask() {
            this.tasks.push({
                task:this.tarea,
                estado:false
            });
            this.tarea = '';
        },
        editTask(index){
            this.tasks[index].estado = !this.tasks[index].estado;
        },
        deleteTask(index){
            this.tasks.splice(index,1);
        }
    },
    data:function(){
        return{
            tasks:[],
            tarea:''
        }
    }
});