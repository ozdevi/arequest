<script>
import Brick from './Brick.vue';
import BrickForm from './bricks/BrickForm.vue';
import Stockpile from './bricks/Stockpile.vue';
import FontLoader from './bricks/FontLoader.vue';
import BuyMeBrick from './bricks/BuyMeBrick.vue';

export default {
  name: 'App',
  components: {
    Brick,
    BrickForm,
    Stockpile,
    FontLoader,
    BuyMeBrick,
  },
  data() { return { $loader: {} }; },
  created() {
    this.$operatorMachine.send({ type: 'START' });
    this.$loader = this.$loading.show();
  },
  updated() {
    if (this.storage && this.storage.hasCalled) {
      this.$loader.hide();
    }
    if (this.storage) {
      document.body.className = '';
      document.body.classList.add(...this.brickStyler);
    }
  },
  computed: {
    stockpile() {
      return this.$operatorMachine.context.stockpile;
    },
    storage() {
      return this.$operatorMachine.context.storage;
    },
    history() {
      return this.$operatorMachine.context.history;
    },
    builders() {
      return this.$operatorMachine.context.builders;
    },
    brickStyler() {
      if (this.builders['andy-mvp-css']) {
        const file = document.createElement('link');
        file.rel = 'stylesheet';
        file.href = 'mvp.css';
        file.id = 'mvp';
        document.head.appendChild(file);
      } else {
        const file = document.querySelector('link[id="mvp"]');
        if (file) {
          file.disabled = true;
        }
      }
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
  <main id="app">
    <h1>
      <brick name="user-bricks-logo">
        <img src="./assets/user-bricks-logo.png" alt="" width="100" style="vertical-align: middle;"/>
      </brick>
      Hello, user!
    </h1>
    <p>
      <brick name="introductory-text">
        <template v-slot:old>
          This website will be built on top of your requests.
          Each request is a brick and we can start a construction with them. So this is really under construction. Go bring a brick!
        </template>
        This website will be entirely built on top of your requests.
        Each request is a brick and construction is on going, forever. So this is really, always, under construction.  Go add a brick!
      </brick>
    </p>
    <h2>Where can I put my bricks?</h2>
    <brick-form/>
    <stockpile />
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
      <font-loader></font-loader>
      <div>
        <brick name="under-construction-gif">
          <small>gif graciously taken from <a href="http://textfiles.com/underconstruction/">textfiles.com</a></small>
        </brick>
      </div>
    </footer>
    <buy-me-brick></buy-me-brick>
  </main>
</template>

<style lang="scss">
.yellow-bg{
    background: #F9D206;
}
.base {
  .isDone {
    .instruction{
      color: #BBB; /* Brick Brick Brick */
    }
  }
}

.yellow-bg {
  .isDone {
    .instruction{
      color: inherit;
      opacity: .3;
    }
  }
}

.sweet-checkboxes {
  ul {
    list-style: none;
  }

  li input{
    vertical-align: top;
    margin-bottom: 0;
  }

}
.paragraph-length {
  p, .container {
    max-width: 32em;
  }
}
.wide-enough-paragraphs {
  p, .container {
    max-width: 50em;
  }
}
.oxygen-mono-font {
  font-family: 'Oxygen Mono', monospace;
}
</style>
