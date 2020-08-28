<template>
  <div id="app" align="center">
    <router-link :to="{name:'Inicio'}">
      <img src="./assets/logo.png" alt="">
    </router-link>
    <router-view/>
  </div>
</template>