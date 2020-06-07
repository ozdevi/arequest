<script>
import WebFontLoader from 'webfontloader';
import fonts from '@/store/fonts.json';

export default {
  name: 'font-loader',
  data() {
    return {
      fonts,
      selectedFont: 'Oxygen Mono',
    };
  },
  created() {
    WebFontLoader.load({
      google: {
        families: [this.selectedFont],
      },
      active: this.fontLoaded,
    });
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
  destroyed() {
    document.body.style = '';
  },
};
</script>

<template>
  <div>
    Change font:
    <select @change="changeFont($event)" v-model="selectedFont">
      <option value="" selected>Choose a font</option>
      <optgroup  v-for="(families, key) of fonts" :label="key.toUpperCase()" v-bind:key="key">
        <option v-for="font in families" v-bind:key="font">{{font}}</option>
      </optgroup>
    </select>
  </div>
</template>

<style scoped lang="scss">
.today-lucky-number em{
  text-decoration: none!important;
  white-space: normal;
}
select {
  display: inline-block;
}
</style>
