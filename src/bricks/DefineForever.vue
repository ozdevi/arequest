<script>

export default {
  name: 'define-forever',
  data() {
    return {
      defined: false,
    };
  },
  methods: {
    defineForever() {
      this.defined = !this.defined;
    },
  },
};
</script>

<template>
  <span class="define-forever brick-builder-define-forever" :class="{defined: this.defined}" @click="defineForever">
    <span class="title">forever</span>
    <div v-if="defined">
      <span class="posgram" title="A word that describes or gives more information about a verb, adjective or other adverb.">adverb.</span>
      <div class="definitions">
        <div class="definition">
          <span class="definition-count">B1</span>
          <div class="definition-label">for all time:</div>
          <q class="definition-example">I like the UserBricks but I don't imagine It'll live forever</q>
        </div>
        <div class="definition">
          <span class="definition-count">B2</span>
          <div class="definition-label">for an extremely long time or too much time:</div>
          <q class="definition-example">We'd better work a bit quicker - it's going to take forever if we go at this pace</q>
        </div>
      </div>
    </div>
  </span>
</template>

<style scoped lang="scss">
.define-forever {
  font-weight: bold;
  cursor: pointer;
  &:not(.defined):hover {
    animation: move linear 2s infinite;
  }
  &:before, &:after {
    content: " ";
  }
  &.defined {
    display: block;
    margin: 16px 0;
    background-color: #ffeb84;
    padding: 16px;
    .title {
      font-size: 2em;
      line-height: 1em;
    }
    .posgram {
      font-style: italic;
    }
    .definition {
      margin: 8px 0;
      &-count {
        font-size: .8em;
        background-color: #000;
        border-radius: 50px;
        display: inline-block;
        color: #FFF;
        padding: 4px 6px;
        line-height: .8em;
      }
      &-label {
        font-size: 1.2em;
      }
      &-example {
        font-style: italic;
        color: rgba(0,0,0,.3);
        font-size: .9em;
      }
    }
  }
}

@keyframes move {
  0% {
    text-shadow:
      1px -1px 0 hsla(0, 100%, 50%, 1),
      -1px 1px 0 hsla(180, 100%, 50%, 1)
  ;
  }
  25% {
    text-shadow:
      -1px -1px 0 hsla(180, 100%, 50%, 1),
      1px 1px 0 hsla(0, 100%, 50%, 1)
  ;
  }
  50% {
    text-shadow:
      -1px 1px 0 hsla(0, 100%, 50%, 1),
      1px -1px 0 hsla(180, 100%, 50%, 1)
  ;
  }
  75% {
    text-shadow:
      1px 1px 0 hsla(180, 100%, 50%, 1),
      -1px -1px 0 hsla(0, 100%, 50%, 1)
  ;
  }
  100% {
    text-shadow:
      1px -1px 0 hsla(0, 100%, 50%, 1),
      -1px 1px 0 hsla(180, 100%, 50%, 1)
  ;
  }
}
</style>
