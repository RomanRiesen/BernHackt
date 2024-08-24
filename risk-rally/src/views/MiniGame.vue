<template>
  <div class="game-container">
    <h1>Stormy Weather Game</h1>
    <div class="game-board">
      <div class="house">
        🏠 <br />
        <span v-if="houseHealth > 0">Health: {{ houseHealth }}</span>
        <span v-else>🏚️ Destroyed!</span>
      </div>
      <div class="storm">🌩️ Storms: {{ storms }}</div>
    </div>
    <button @click="reinforceHouse" :disabled="houseHealth <= 0">Reinforce House</button>
    <p v-if="houseHealth <= 0">The house has been destroyed!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      houseHealth: 100,
      storms: 0,
      stormInterval: null
    }
  },
  mounted() {
    this.startStorms()
  },
  methods: {
    startStorms() {
      // Start storms damaging the house every 2 seconds
      this.stormInterval = setInterval(() => {
        if (this.houseHealth > 0) {
          this.storms++
          this.houseHealth -= Math.floor(Math.random() * 20) + 5 // Random damage between 5 and 25
          if (this.houseHealth < 0) this.houseHealth = 0
        } else {
          clearInterval(this.stormInterval)
        }
      }, 2000)
    },
    reinforceHouse() {
      if (this.houseHealth > 0) {
        this.houseHealth += 15 // Reinforce the house, restoring health
        if (this.houseHealth > 100) this.houseHealth = 100 // Cap the health at 100
      }
    }
  },
  beforeUnmount() {
    // Clear the interval when the component is destroyed
    clearInterval(this.stormInterval)
  }
}
</script>

<style scoped>
.game-container {
  margin-top: 50px;
  text-align: center;
}
.game-board {
  display: flex;
  justify-content: space-around;
  margin: 20px auto;
  width: 50%;
}
.house {
  font-size: 3em;
  color: green;
}
.storm {
  font-size: 3em;
  color: darkblue;
}
button {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:disabled {
  background-color: grey;
}
</style>
