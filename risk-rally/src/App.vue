<script setup>
import RiskGame from './components/RiskGame.vue'
import HelloWorld from './components/HelloWorld.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <img alt="GVB logo" class="logo" src="@/assets/gvb_logo.svg" width="125" height="125" />

  <div class="wrapper">
    <RiskGame />

    <!--<nav>
      <HelloWorld msg="Are you willing to Risk It?" />
        <RouterLink to="/">Home/Questionnaire</RouterLink>
        <RouterLink to="/game">Mini Game</RouterLink>
        <RouterLink to="/RiskGame">Risk Game</RouterLink>
      </nav>
      -->
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    RiskGame
  }
}
</script>

<style>
/* Global styles moved from index.html */
header {
  position: relative;
  height: 100vh;
}

.wrapper {
  position: absolute;
  top: 10%; /* Adjust to position the wrapper from the top */
  left: 50%;
  transform: translateX(-50%); /* Centers it horizontally */
  text-align: center;
  min-width: 50vw;
  min-height: 50vh;
}

.logo {
  position: absolute;
  top: 1em;
  left: 1em;
  height: 1em;
}

body {
  background-color: white;
  color: black; /* Add text color */
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 20px;
  transition:
    background-color 0.3s,
    color 0.3s; /* Add smooth transition */
}

/* Dark Mode */
/*@media (prefers-color-scheme: dark) {
  body {
    background-color: #121212;
    color: gray;
  }
}*/

.question-container,
.game-container {
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  width: 60%;
  transition: opacity 0.5s ease-in-out;
}

input[type='text'] {
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  font-size: 1em;
}

button {
  padding: 10px 20px;
  background-color: #fe8e18;
  color: white;
  border: none;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: #983903;
}
</style>
