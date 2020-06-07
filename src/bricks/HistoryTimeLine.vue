<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import Brick from '@/Brick.vue';

export default {
  name: 'history-timeline',
  components: {
    Brick,
    VueSlider,
  },
  data() {
    return {
      dragging: false,
      timeTravelMode: false,
      selectedTime: undefined,
    };
  },
  computed: {
    history() {
      return this.$operatorMachine.context.history;
    },
    slider() {
      const data = Object.keys(this.history);
      const marks = data.reduce((acc, h) => {
        acc[h] = this.history[h].note;
        return acc;
      }, {});
      return {
        data,
        marks,
      };
    },
  },
  methods: {
    switchTimeTravelMode() {
      const { data } = this.slider;
      this.selectedTime = data[data.length - 1];
      if (!this.timeTravelMode) {
        this.$operatorMachine.send('BACK_TO_NOW');
      }
    },
    timeTravel(value) {
      this.$operatorMachine.send({
        type: 'SHOW_HISTORY',
        data: {
          history: this.history[value],
        },
      });
    },
    dragstart() {
      this.dragging = true;
    },
    dragend() {
      this.dragging = false;
    },
  },
};
</script>

<template>
  <brick name="history-timeline" tag="div" :is-dev-mode="true">
    <div :class="{'history-timeline': true, 'on': timeTravelMode, 'dragging': dragging}">
      <div class="timeline-switcher">
        <label for="timetravel-switcher" class="brick-builder-history-timeline brick-builder-history-horizontal">
          <input type="checkbox" id="timetravel-switcher" v-model="timeTravelMode" @change="switchTimeTravelMode">
          <span>Time travel: {{timeTravelMode ? 'ON' : 'OFF'}}</span>
        </label>
      </div>
      <div class="history-timeline-wrapper">
        <div class="timeline-dragger" v-if="timeTravelMode">
        <vue-slider
          v-model="selectedTime"
          :contained="true"
          :adsorb="true"
          :data="slider.data"
          :marks="dragging ? slider.marks : false"
          :lazy="true"
          :tooltip="dragging ? 'none' : 'always'"
          :tooltipFormatter="(t)=>history[t] ? history[t].note : ''"
          :tooltipStyle="{color:'#FFF', backgroundColor:'#000', borderColor: '#000'}"
          :label-style="{transformOrigin: '0 0', transform: 'rotate(-60deg)', margin: '-24px -8px', cursor: 'pointer', opacity: '.3'}"
          :active-style="{backgroundColor:'#000', color: '#FFF', padding: '8px', }"
          :label-active-style="{opacity: '1'}"
          :processStyle="{backgroundColor: '#b75d58'}"
          :railStyle="{backgroundColor: 'rgba(0,0,0,.15)'}"
          :stepStyle="{backgroundColor: '#8c4641'}"
          :silent="true"
          :include="true"
          @change="timeTravel"
          @error="errorSlider"
          @drag-start="dragstart"
          @drag-end="dragend"
        ></vue-slider>
      </div>
      </div>
    </div>
  </brick>
</template>

<style scoped lang="scss">
.history-timeline {
  padding: 16px;
  margin-top: 32px;
  position: fixed;
  z-index: 999;

  left: 0;
  bottom: 0;
  right: 0;

  &.dragging {
    min-height: 300px;
    .history-timeline-wrapper {
      min-height: 300px;
    }
  }

  &.on {
    background-color: #FFF;
  }

  .history-timeline-wrapper {
    display: flex;
    align-items: flex-end;
  }

  .timeline-switcher {
    position: absolute;
    left: 16px!important;
    bottom: 4px!important;
    label span {
      font-size: 14px;
      margin-left: 4px;
    }
    input[type="checkbox"]{
      vertical-align: 1px;
    }
  }

  .timeline-dragger {
    flex: 1 1 auto;
    max-width: 1080px;
    margin: 0 auto;
  }
}
</style>
