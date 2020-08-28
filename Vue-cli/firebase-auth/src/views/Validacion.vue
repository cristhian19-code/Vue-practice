<template>
  <div class="container-fluid">
    <p class="display-4">Vuelidate</p>
    <form class="col-8" @submit.prevent="submit">
        <input type="email" placeholder="example@gmail.com" class=" form-control my-3"
        v-model="$v.email.$model"
        :class="{'is-invalid':$v.email.$invalid,'is-valid':!$v.email.$invalid}"
        >
        <p v-if="$v.email.$required">Email incorrecto</p>
        <input type="password" v-model="$v.password.$model" class="form-control mt-3" placeholder="Ingrese Contraseña"
            :class="{'is-invalid':$v.password.$invalid,'is-valid':!$v.password.$invalid}"
        >
        <p class="text-danger" v-if="!$v.password.minLength">Minimo 6 caracteres</p>

        <input type="password" v-model="$v.repeatpassword.$model" class="form-control mt-3" placeholder="Confirme contraseña"
            :class="{'is-invalid':$v.repeatpassword.$invalid,'is-valid':!$v.repeatpassword.$invalid}" 
        >
        <b-button class="mt-3" variant="primary" :disabled="$v.$invalid" type="submit">Send</b-button>
    </form>

  </div>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
    name: 'Validacion',
    data() {
        return {
            email: '',
            password:'',
            repeatpassword:''
        }
    },
    validations:{
        email:{required,email},
        password:{
            minLength: minLength(6)
        },
        repeatpassword:{
            sameAsPassword : sameAs('password')
        }
    },
    methods: {
        submit(){
            this.$v.$touch();
            if(this.$v.$invalid){
                console.log('se genero un error');
            }else{
                console.log('todos los campos correctos')
            console.log('enviando informacion ', this.$v.email.$model, this.$v.password.$model, this.$v.repeatpassword.$model)
            }
        }
    }
}
</script>
