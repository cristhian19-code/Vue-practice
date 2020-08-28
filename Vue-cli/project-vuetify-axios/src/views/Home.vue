<template>
  <div>
    <v-date-picker
    color="secondary"
    v-model="fecha"
    full-width
    locale="es-pe"
    :min="minimo"
    :max="maximo"
    @change="getDolar(fecha)"
    >
    </v-date-picker>
    <v-layout justify-center mt-2>
      <v-flex text-center>
        <v-card dark color="secondary">
          {{valor}}
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'Home',
  data(){
    return {
      fecha: new Date().toISOString().substring(0,10),
      minimo: '1984',
      maximo: new Date().toISOString().substring(0,10),
      valor: null
    }
  },
  methods: {
    async getDolar(day){
      let fecha = await day.split('-');
      let dia = fecha[2]+'-'+fecha[1]+'-'+fecha[0];
      try {
        let datos = await axios.get(`https://mindicador.cl/api/dolar/${dia}`);
        console.log(datos.data.serie[0]);
        if(datos.data.serie[0] != undefined){
          this.valor = await datos.data.serie[0].valor;
        }else{
          this.valor =await "No hay registro";
        }
      } catch (error) {
        valor="Sin registro"        
      }
    }
  }
}
</script>
