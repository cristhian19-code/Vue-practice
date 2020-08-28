<template>
    <div class="container-fluid">
        <p class="display-4">Inicio</p>
        <router-link :to="{name: 'Lista'}">
            <button class="btn btn-outline-success">Lista</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Inicio'
}
</script>