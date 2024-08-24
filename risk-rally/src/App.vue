<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="GVB logo" class="logo" src="@/assets/gvb_logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Are you willing to Risk It?" />

      <nav>
        <RouterLink to="/">Home/Questionnaire</RouterLink>
        <RouterLink to="/game">Mini Game</RouterLink>
        <RouterLink to="/RiskGame">Risk Game</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

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
}

body {
  background-color: white;
  color: black; /* Add text color */
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: center;
  transition:
    background-color 0.3s,
    color 0.3s; /* Add smooth transition */
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #ffffff;
    color: rgb(0, 0, 0);

  }
}

.question-container,
.game-container {
  position: absolute;
  margin: 50px center;
  padding: 20px center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  width: 100%;
  transition: opacity 0.5s ease-in-out;
}

input[type='text'] {
  padding: 10px;
  margin: 10px center;
  width: 100%;
  font-size: 1em;
}

button {
  padding: 10px 20px;
  background-color: #FE8E18;
  color: white;
  border: none;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: #FE8E18;
}
</style>
