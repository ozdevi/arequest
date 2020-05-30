<script>
export default {
  name: 'brick',
  props: {
    name: String,
    action: String,
    related: Array,
  },
  computed: {
    brick() {
      const operatorContext = this.$operatorMachine.context;
      const { builders } = operatorContext;
      const brick = builders[this.name];
      return brick && brick.isDone;
    },
  },
};
</script>

<template>
  <span v-if="brick"><slot></slot></span>
  <span v-else><slot name="old"></slot></span>
</template>
