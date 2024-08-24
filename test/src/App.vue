<template>
  <a href="https://gvb.ch/"> <img style="max-height: 1em; position: absolute; left: 1em; top: 1em;"
    src="https://gvb.imgix.net/content/dam/gini/logos/gvb_logo.svg.gini-transform/original/gvb_logo.1620214076346.svg/" />
  </a>
  <RiskGame />
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
