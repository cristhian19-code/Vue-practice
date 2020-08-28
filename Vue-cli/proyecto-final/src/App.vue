<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>
<script>
import NavBar from './components/Navbar'

export default {
  namne: 'App',
  components:{
    NavBar
  }
}
</script>

