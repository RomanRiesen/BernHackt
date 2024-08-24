<template>
  <RiskGame/>
</template>

<script>
import RiskGame from './components/RiskGame.vue'

export default {
  name: 'App',
  components: {
    RiskGame
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
