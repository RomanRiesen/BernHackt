<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="orange">{{ msg }}</h1>
    <h2>RiskGame</h2>
    <h3>Ihr Risiko spielerisch Einschätzen</h3>
  </div>
  <button @click="$emit('done')">Los!</button>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 4.6rem;
  position: relative;
  top: -10px;
}

h2 {
  font-size: 2rem;
}

.greetings h1,
.greetings h2 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h2 {
    text-align: center;
  }
}
</style>
