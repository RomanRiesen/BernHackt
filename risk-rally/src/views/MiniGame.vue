<!-- src/views/MiniGame.vue -->
<template>
  <div id="mini-game">
    <h1>Mini Game: Save the House!</h1>
    <div class="game-container">
      <div ref="house" class="house" :style="houseStyle"></div>
      <div v-for="(storm, index) in storms" :key="index" class="storm" :style="storm.style"></div>
    </div>
    <p v-if="gameOver">Game Over! You survived for {{ score }} seconds.</p>
    <button @click="startGame" v-if="!isPlaying">Start Game</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      housePosition: 50, // Horizontal position of the house
      storms: [], // Array of storms falling from the sky
      isPlaying: false,
      gameOver: false,
      score: 0,
      intervalId: null
    }
  },
  computed: {
    houseStyle() {
      return {
        left: this.housePosition + '%'
      }
    }
  },
  methods: {
    startGame() {
      this.isPlaying = true
      this.gameOver = false
      this.score = 0
      this.storms = []
      this.intervalId = setInterval(this.spawnStorm, 1000)
      this.moveStorms()
      this.increaseScore()
      document.addEventListener('keydown', this.moveHouse)
    },
    moveHouse(event) {
      if (event.key === 'ArrowLeft' && this.housePosition > 0) {
        this.housePosition -= 5
      } else if (event.key === 'ArrowRight' && this.housePosition < 90) {
        this.housePosition += 5
      }
    },
    spawnStorm() {
      const stormPosition = Math.floor(Math.random() * 90) // Random horizontal position
      this.storms.push({ style: { left: stormPosition + '%', top: '0%' } })
    },
    moveStorms() {
      setInterval(() => {
        this.storms = this.storms.map((storm) => {
          const newTop = parseInt(storm.style.top) + 5
          if (newTop > 90 && this.checkCollision(storm.style.left, newTop)) {
            this.endGame()
          }
          return { style: { ...storm.style, top: newTop + '%' } }
        })
      }, 100)
    },
    checkCollision(stormLeft, stormTop) {
      const stormLeftNumber = parseInt(stormLeft)
      return stormTop > 80 && Math.abs(stormLeftNumber - this.housePosition) < 10
    },
    increaseScore() {
      setInterval(() => {
        if (this.isPlaying) {
          this.score += 1
        }
      }, 1000)
    },
    endGame() {
      this.isPlaying = false
      this.gameOver = true
      clearInterval(this.intervalId)
      document.removeEventListener('keydown', this.moveHouse)
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
    document.removeEventListener('keydown', this.moveHouse)
  }
}
</script>

<style scoped>
.game-container {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #87ceeb;
  overflow: hidden;
  border: 2px solid #333;
  margin: 20px 0;
}

.house {
  position: absolute;
  bottom: 0;
  width: 10%;
  height: 10%;
  background-color: brown;
}

.storm {
  position: absolute;
  width: 10%;
  height: 10%;
  background-color: gray;
}

button:hover {
  background-color: #0056b3;
}
</style>
