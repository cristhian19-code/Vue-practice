<template>
	<div class="container-fluid">
		<p class="display-4 mt-3">Registro</p>
		<form class="col-12 col-md-7" @submit.prevent="crearUsuario({
			email,
			password
		})">
			<input type="email" class="mt-3 form-control" v-model="$v.email.$model" placeholder="Email"
				:class="validationEmail"
			>
			<input type="password" class="mt-3 form-control" v-model.trim="password" placeholder="Password"
				:class="validationPassword"
			>
			<p class="text-danger" v-if="!$v.password.minLength">Minimo 9 caracteres</p>
			<input type="password" class="mt-3 form-control" v-model.trim="confirm_password" placeholder="Confirm Password"
				:class="validationConfirmPassword"
			>
			<button :disabled="Habilitar" class="mt-3 btn btn-primary">Registrame</button>
		</form>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
import { required, email, minLength ,sameAs} from 'vuelidate/lib/validators'

export default {

  name: 'Registro',

  data() {
    return {
		email:'',
		password:'',
		confirm_password:''
    }
  },
  computed: {
	  validationEmail(){
		if(this.$v.email.$model!='' && !this.$v.email.$invalid){
			return 'is-valid'
		}else if(this.$v.email.$model!='' && this.$v.email.$invalid){
			return 'is-invalid'
		}else{
			return ''
		}																																														
	  },														
	  validationPassword(){
		if(this.$v.password.$model!='' && !this.$v.password.$invalid){
			return 'is-valid'
		}else if(this.$v.password.$model!='' && this.$v.password.$invalid){
			return 'is-invalid'
		}else{
			return ''
		}
	  },
	  validationConfirmPassword(){
		if(this.$v.confirm_password.$model!='' && this.$v.confirm_password.sameAs){
			return 'is-valid'
		}else if(this.$v.confirm_password.$model!='' && !this.$v.confirm_password.sameAs){
			return 'is-invalid'
		}
	  },
	  Habilitar(){ 																																														
		if(!this.$v.confirm_password.$invalid && !this.$v.password.$invalid && !this.$v.email.$invalid){
			return false
		}else{
			return true
		}
	  }
  },
  validations:{
	email:{
		email,
		required
	},
	password:{
		required,
		minLength: minLength(9)
	},
	confirm_password: {
		required,
		sameAs: sameAs('password')
	}
  },
  methods: {
	...mapActions(['crearUsuario']),
	
  },
};
</script>

