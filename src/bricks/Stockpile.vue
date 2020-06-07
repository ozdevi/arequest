<script>
import Brick from '@/Brick.vue';
import TodayLucyNumber from './TodayLucyNumber.vue';

export default {
  name: 'Stockpile',
  components: { Brick, TodayLucyNumber },
  computed: {
    stockpile() {
      return this.$operatorMachine.context.stockpile;
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
    visualiseChanges(brick, action) {
      const leaderLine = this.leaderLines[brick.id];
      if (leaderLine && this.toggleLeaderLine) {
        leaderLine.position();
        leaderLine[action]('draw');
      }
    },
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
        :class="{expanded: expanded.includes(brick.id), isDone: brick.isDone}"
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
        <span :class="{instruction: true}" :id="`brick-${brick.order}`" @mouseup="expand(brick.id)">
          <span
            :class="{
              'instruction-label':true, quote: brick.owner.name !== 'me',
              [`brick-builder-${brick.name}`]: !brick.isDone
            }"
            @mouseenter="visualiseChanges(brick,'show')"
            @mouseleave="visualiseChanges(brick,'hide')"
            :ref="`brick-ref-${brick.id}`"
          >{{brick.instruction}}</span>
          <div v-if="brick.order && brick.order === 8"><today-lucy-number/></div>
        </span>
        <span class="brick-owner">&mdash;
          <component :is="brick.owner.profile ? 'a' : 'span'" :href="brick.owner.profile ? brick.owner.profile : null">
            {{brick.owner.name}}
          </component>
        </span>
      </li>
    </ul>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.truncate-long-lines {
  .stockpile{
    li {
      &.expanded {
        margin-bottom: .5em;
      }
      &.isDone .instruction-label {
        text-decoration: line-through;
        &.quote{
          &:before {
            content: "“";
          }
          &:after {
            content: "”";
          }
        }
      }
    }
    li:not(.expanded) {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: stretch;
      align-content: stretch;

      .instruction {
        cursor: pointer;
        flex: 0 1 auto;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .brick-owner {
        flex: 1 0 auto;
      }
    }
    li {
      .brick-owner {
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
    }
  }
}
</style>
