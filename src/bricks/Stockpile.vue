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
  },
  props: {
    msg: String,
  },
  data() {
    return {
      expanded: [],
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
  },
};
</script>

<template>
  <div class="container">
    <h3>Todo (stockpile):</h3>
    <ul class="stockpile">
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
              <input type="checkbox" disabled :checked="brick.isDone" :aria-checked="brick.isDone">
            </brick>
          </brick>
        </span>
        <span :class="{instruction: true}" :id="`brick-${brick.order}`" @mouseup="expand(brick.id)">
          <span :class="{'instruction-label':true, quote: brick.owner!=='me'}">{{brick.instruction}}</span>
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
