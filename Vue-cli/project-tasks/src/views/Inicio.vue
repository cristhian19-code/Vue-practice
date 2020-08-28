<template>
	<div class="container">
		<p class="display-4">Inicio</p>
    <router-link :to="{name: 'Amigos'}">
      <button class="btn btn-success">Amigos</button>
    </router-link>
	</div>
</template>

<script>

export default {

  name: 'Inicio',
  				
  data () {
    return {
      carga:true
    }
  }
}
</script>
