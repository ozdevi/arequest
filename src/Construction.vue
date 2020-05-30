<script>
import Brick from './Brick.vue';
import BrickForm from './bricks/BrickForm.vue';
import TodayLucyNumber from './bricks/TodayLucyNumber.vue';

export default {
  name: 'App',
  components: {
    Brick,
    BrickForm,
    TodayLucyNumber,
  },
  created() {
    this.$operatorMachine.send({ type: 'START' });
  },
  computed: {
    stockpile() {
      return this.$operatorMachine.context.stockpile;
    },
    history() {
      return this.$operatorMachine.context.history;
    },
    builders() {
      return this.$operatorMachine.context.builders;
    },
    brickStyler() {
      return Object.keys(this.builders);
    },
  },
  methods: {
    showHistory($event) {
      const { value: history } = $event.target;
      switch (history) {
        case 'LATEST':
          this.$operatorMachine.send('BACK_TO_NOW');
          break;
        case 'BASE':
        default:
          break;
      }
      this.$operatorMachine.send({
        type: 'SHOW_HISTORY',
        data: {
          history: this.history[$event.target.value],
        },
      });
    },
  },
};
</script>

<template>
  <div id="app" :class="brickStyler">
    <h1>Hello, user!</h1>
      <p>
        This website will be built on top of your requests.
        Each request is a brick and we can start a construction with them. So this is really under construction. Go bring a brick!
      </p>
      <h2>Where can I put my bricks?</h2>
      <brick-form/>
      <h3>Todo:</h3>
      <ul>
        <li :title="`Brick #${brick.order} by @${brick.owner.name} on ${brick.ctime.toDate()}`" v-for="brick in stockpile" :key="brick.order">
          <brick name="sweet-checkboxes">
            <brick name="readonly-checkboxes">
              <template v-slot:old>
                <input type="checkbox" :checked="brick.isDone" :aria-checked="brick.isDone">
              </template>
              <input type="checkbox" disabled :checked="brick.isDone" :aria-checked="brick.isDone">
            </brick>
          </brick>
          <label :class="{isDone: brick.isDone}" :id="`brick-${brick.order}`">
            {{brick.instruction}} &mdash; <a :href="brick.owner.profile">{{brick.owner.name}}</a>
          </label>
          <em v-if="brick.name === 'todays-luck-number'"><today-lucy-number/></em>
        </li>
      </ul>
      <footer>
        <div>
          <brick name="under-construction-gif">
            <img src="./assets/under-construction.gif" alt="A pictogram worker is digging the ground." title="Brick #1 by @ozdevi on 2020-05-14" />
          </brick>
        </div>
        History:
        <select name="history" @change="showHistory($event)">
          <option value="LATEST" selected>Latest</option>
          <option v-for="(value,key, hindex) in history" :key="key" :value="value.id">#{{hindex}} {{value.note}}</option>
        </select>
        <br>
        <br>
        <div>
          <brick name="under-construction-gif">
            <small>gif graciously taken from <a href="http://textfiles.com/underconstruction/">textfiles.com</a></small>
          </brick>
        </div>
      </footer>
  </div>
</template>

<style lang="scss" scoped>
.base {
  .isDone {
    text-decoration: line-through;
    color: #BBB; /* Brick Brick Brick */
  }
}
.sweet-checkboxes {
  ul {
    list-style: none;
  }

  li input{
    vertical-align: top;
  }

}
.paragraph-length {
  p {
    max-width: 32em;
  }
}
</style>
