<script>
import Brick from '@/Brick.vue';
import { isElementInViewport } from '../utils/dom';
import TodayLuckyNumber from './TodayLuckyNumber.vue';
import DressupWithSquirrel from './DressupWithSquirrel.vue';

export default {
  name: 'Stockpile',
  components: { Brick, TodayLuckyNumber, DressupWithSquirrel },
  computed: {
    stockpile() {
      const { stockpile } = this.$operatorMachine.context;
      return stockpile.reverse();
    },
    leaderLines() {
      return this.stockpile.filter((b) => b.isDone)
        .reduce((acc, brick) => {
          const brickRef = this.$refs[`brick-ref-${brick.id}`];
          const brickBuilders = document.querySelectorAll(`.brick-builder-${brick.name}`);
          if (brickRef && brickRef.length > 0 && brickBuilders && brickBuilders.length > 0) {
            const leaderLine = new window.LeaderLine(
              brickRef[0],
              brickBuilders[0], {
                size: 2,
                endPlug: 'hand',
                hide: true,
              },
            );
            acc[brick.id] = leaderLine;
          }
          return acc;
        }, {});
    },
  },
  props: {
    msg: String,
  },
  data() {
    return {
      expanded: [],
      toggleLeaderLine: false,
      expanderLength: 120,
    };
  },
  methods: {
    expand(bid) {
      const selection = window.getSelection().toString();
      if (selection && selection !== '') { return; }
      const { expanded } = this;
      const eindex = expanded.indexOf(bid);
      if (eindex === -1) {
        this.expanded.push(bid);
      } else {
        expanded.splice(eindex, 1);
      }
    },
    visualiseChanges(brick) {
      const leaderLine = this.leaderLines[brick.id];
      if (leaderLine && this.toggleLeaderLine) {
        const { end: brickBuilder } = leaderLine;
        if (!isElementInViewport(brickBuilder)) {
          brickBuilder.scrollIntoView({ behavior: 'smooth' });
        }
        leaderLine.position();
        leaderLine.show('draw');
        window.setTimeout(() => {
          leaderLine.hide('draw');
        }, 2000);
      }
    },
    getInstruction({ instruction, id }) {
      const { expanded, expanderLength } = this;
      return expanded.includes(id) ? instruction : instruction.substr(0, expanderLength);
    },
  },
  destroyed() {
    const lkeys = Object.keys(this.leaderLines);
    lkeys.forEach((lk) => this.leaderLines[lk].remove());
  },
};
</script>

<template>
  <div class="container">
    <h3>Todo (stockpile):</h3>
    <ul class="stockpile brick-builder-truncate-long-lines">
      <li
        :title="`Brick #${brick.order} by @${brick.owner.name} on ${brick.ctime.toDate()}`"
        v-for="brick in stockpile"
        :key="brick.id"
        :class="{isDone: brick.isDone}"
      >
        <span>
          <brick name="sweet-checkboxes">
            <brick name="readonly-checkboxes">
              <template v-slot:old>
                <input type="checkbox" :checked="brick.isDone" :aria-checked="brick.isDone">
              </template>
              <input
                v-model="toggleLeaderLine"
                v-if="brick.name === 'visualise-changes'"
                type="checkbox"
                :checked="brick.isDone"
                :aria-checked="brick.isDone"
                :ref="`brick-ref-${brick.id}`"
                class="brick-builder-visualise-changes"
              />
              <input
                v-else
                disabled
                type="checkbox"
                :checked="brick.isDone"
                :aria-checked="brick.isDone"
                class="brick-builder-sweet-checkboxes brick-builder-readonly-checkboxes"
                :class="{'brick-builder-show-more-info-tooltip': brick.name === 'show-more-info-tooltip'}"
              />
            </brick>
          </brick>
        </span>
        <span :class="{instruction: true}" :id="`brick-${brick.order}`">
          <span
            :ref="`brick-ref-${brick.id}`"
            @click="visualiseChanges(brick,'show')"
            class="instruction-label"
            :class="{
              quote: brick.owner.name !== 'me',
              [`brick-builder-${brick.name}`]: !brick.isDone
            }"
          >{{getInstruction(brick)}}</span>&nbsp;
          <a @mouseup="expand(brick.id)" v-if="brick.instruction.length > expanderLength" class="instruction-label-expander">...</a>
        </span>
        <component :is="brick.owner.profile ? 'a' : 'span'" :href="brick.owner.profile ? brick.owner.profile : null" class="brick-owner">
          {{brick.owner.name}}
        </component>
        <div v-if="brick.order && brick.order === 8"><today-lucky-number/></div>
        <span v-if="brick.order && brick.order === 31"><dressup-with-squirrel/></span>
      </li>
    </ul>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.truncate-long-lines {
  .stockpile{
    padding: 0;
    margin-bottom: 32px;
    li {
      margin: 4px 0;
      &.isDone .instruction-label {
        cursor: pointer;
        text-decoration: line-through;
      }
    }

    li {
      .brick-owner {
        &:before {
          content: " – ";
        }
        margin-left: 8px;
        span {
          padding: 0 8px;
        }
      }
      .instruction-label {
        &.quote {
          &:before {
            content: "“";
          }

          &:after {
            content: "”";
          }
        }
      }
      .instruction-label-expander {
        cursor: pointer;
        &:before{
          content: " ";
        }
      }
    }
  }
}
</style>
