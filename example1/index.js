const app = new Vue({
    el: '#app',
    data: {
        tareas: [
        ],
        tarea: '',
        estado: false
    },
    methods: {
        agregarTarea() {
            this.tareas.push({
                tarea: this.tarea,
                estado: this.estado
            });
            this.tarea = '';
            localStorage.setItem('DB',JSON.stringify(this.tareas));
        },
        editarTarea(index){
            this.tareas[index].estado = ! this.tareas[index].estado;
            localStorage.setItem('DB',JSON.stringify(this.tareas));
        },
        eliminarTarea(index){
            this.tareas.splice(index,1);
            localStorage.setItem('DB',JSON.stringify(this.tareas));
        }
    },
    created: function(){
        const db = JSON.parse(localStorage.getItem('DB'));
        if(db == null){
            this.tareas = [];
        }else{
            this.tareas = db;
        }
    }
})