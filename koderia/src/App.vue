<template>
  <v-app>
    <Header/>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/content/Home'
import Header from './components/navigation/Header'


export default {
  name: 'App',
  components: {
    Home,
    Header
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style>

</style>
