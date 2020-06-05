<script>
import WebFontLoader from 'webfontloader';
import Brick from '@/Brick.vue';
import fonts from '@/store/fonts.json';

export default {
  name: 'font-loader',
  data() {
    return {
      fonts,
      selectedFont: undefined,
    };
  },
  components: {
    Brick,
  },
  methods: {
    changeFont($event) {
      const { value: font } = $event.target;
      this.selectedFont = font;
      // eslint-disable-next-line no-undef
      WebFontLoader.load({
        google: {
          families: [font],
        },
        active: this.fontLoaded,
      });
    },
    fontLoaded() {
      document.body.style = `font-family: ${this.selectedFont}`;
    },
  },
};
</script>

<template>
  <brick name="font-loader" tag="div">
    Font chooser:
    <select @change="changeFont($event)">
      <option value="" selected>Choose a font.</option>
      <optgroup  v-for="(families, key) of fonts" :label="key.toUpperCase()" v-bind:key="key">
        <option v-for="font in families" v-bind:key="font">{{font}}</option>
      </optgroup>
    </select>
  </brick>
</template>

<style scoped lang="scss">
.today-lucky-number em{
  text-decoration: none!important;
  white-space: normal;
}
</style>
