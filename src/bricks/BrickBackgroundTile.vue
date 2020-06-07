<script>
export default {
  name: 'brick-background-tile',
  computed: {
    bricks() {
      return [...Array(22).keys()];
    },
  },
  methods: {
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },
  },
};
</script>

<template>
  <div class="brick-background-tile-container brick-builder-brick-background-tile">
    <div class="brick-background-tile" ref="brick-background-tile">
      <div class="brick-item" v-for="b in bricks" :key="b" :style="{width: `${randomNumber(75,200)}px`}"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.brick-background-tile-container {
  position: fixed;
  bottom:0;
  left: 0;
  right: 0;
  z-index: -1;

  .brick-background-tile {
    display: flex;
    flex-flow: row wrap;
    flex-wrap: wrap;
    border-radius: 20%;
  }
  .brick-item{
    height: 96px;
    border-radius: 3px;
    background-color: rgba(0,0,0,.05);
    margin: 3px;
    flex: 1 0 auto;
  }
}
</style>
