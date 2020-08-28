<template>
    <div class="container-fluid" align="center">
        <p class="display-4">Inicio</p>
        <router-link :to="{name: 'Usuarios'}">
            <button class="btn btn-success">Usuarios</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Inicio'    
}
</script>