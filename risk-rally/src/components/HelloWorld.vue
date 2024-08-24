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
    <h2>RiskGame - Ihr Risiko spielerisch Einschätzen</h2>
  </div>
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
    text-align: left;
  }
}
</style>
