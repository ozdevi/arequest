<script>
import { isMobileOnly } from 'mobile-device-detect';

export default {
  name: 'dress-up-squirrel',
  data() {
    return {
      underwearCode: 0,
      name: 'dress-up-squirrel-game',
      isMobile: isMobileOnly,
    };
  },
  methods: {
    playDressUpGame(e) {
      e.preventDefault();
      this.$modal.show(this.name, {
        title: 'test',
        buttons: [
          {
            title: 'Deal with it',
            handler: () => { alert('Woot!'); },
          },
        ],
      });
    },
    changeUnderWear(e) {
      e.preventDefault();
      this.underwearCode = (this.underwearCode + 1) % 5;
    },
  },
};
</script>

<template>
  <span class="brick-builder-dress-up-squirrel">
    <a href="#" @click="playDressUpGame">Play dress up game with super squirrel</a>
    <modal :name="name" :width="isMobile ? 300: 600" :height="isMobile ? 300 :600">
      <div class="dress-up-container" :class="{[`underwear-${underwearCode}`]: true}">
        <div class="controls">
          <a href="#" @click="changeUnderWear"><b>Change underwear</b></a>
        </div>
      </div>
    </modal>
  </span>
</template>

<style scoped lang="scss">
.dress-up-container {
  @for $i from 0 through 5 {
    &.underwear-#{$i} {
      background-image: url('~@/assets/squirrel-dress-up/dug-#{$i}.jpg');
    }
  }
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  .controls {
    padding: 16px;
  }
}
</style>
