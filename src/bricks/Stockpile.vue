<script>
import Brick from '@/Brick.vue';

export default {
  name: 'Stockpile',
  components: { Brick },
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
  <div>
    <h3>Todo (stockpile):</h3>
    <p>
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
           <span>{{brick.instruction}}</span>
          </span>
          <span class="brick-owner">&mdash; <a :href="brick.owner.profile">{{brick.owner.name}}</a></span>
        </li>
      </ul>
    </p>
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
      .brick-owner {
        flex: 1 0 auto;
      }
    }
    li {
      .brick-owner {
        margin-left: 8px;
      }
    }
  }
}
</style>
