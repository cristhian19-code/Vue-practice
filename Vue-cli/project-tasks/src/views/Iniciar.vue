<template>
	<div class="container-fluid">
		<p class="display-4 mt-3">Iniciar Sesion</p>
		<form class="col-12 col-md-7" @submit.prevent="iniciarSesion({
			email,
			password
		})">
			<input type="email" class="form-control mt-3" placeholder="Email" v-model="email">
			<input type="password" class="form-control mt-3" placeholder="Password" v-model="password">
			<button class="btn btn-primary mt-3">Ingresar</button>
		</form>
	</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {

	name: 'Iniciar',
	data() {
		return {
			email:'',
			password:''
		};
	},
	methods: {
		...mapActions(['iniciarSesion'])
	},
};
</script>
