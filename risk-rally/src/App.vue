<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <img
      alt="GVB logo"
      class="logo"
      src="@/assets/gvb_logo.svg"
      width="125"
      height="125"
    />

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
body {
  background-color: white;
  color: black; /* Add text color */
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 20px;
  transition: background-color 0.3s, color 0.3s; /* Add smooth transition */
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

input[type="text"] {
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  font-size: 1em;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
