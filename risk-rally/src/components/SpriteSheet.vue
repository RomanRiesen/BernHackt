<template>
    <div class="sprite" :style="spriteStyle"></div>
  </template>
  
  <script>
  export default {
    props: {
        frame: {
            required: true
        }
    },
    data() {
      return {
        totalFrames: 43, // replace this with the actual number of frames in your spritesheet
        frameWidth: 64,
        frameHeight: 64
      };
    },
    computed: {
      spriteStyle() {
        return {
          backgroundImage: `url(https://i.imgur.com/bdriSLS.png)`,
          backgroundPosition: `-${this.frame * this.frameWidth}px 0`,
          width: `${this.frameWidth}px`,
          height: `${this.frameHeight}px`
        };
      }
    },
    mounted() {
      this.animate();
    },
    methods: {
      animate() {
      //  setInterval(() => {
      //    this.frame = (this.frame + 1) % this.totalFrames;
      //  }, 100); // change this value to adjust the animation speed
      }
    }
  };
  </script>
  
  <style scoped>
  .sprite {
    background-repeat: no-repeat;
    /*background-size: 128px;*/
  }
  </style>
