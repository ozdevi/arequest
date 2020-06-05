<script>
export default {
  name: 'brick',
  props: {
    name: String,
    tag: {
      type: String,
      default: 'span',
    },
    isDevMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    brick() {
      const operatorContext = this.$operatorMachine.context;
      const { builders } = operatorContext;
      const brick = builders[this.name];
      return this.isDevMode ? true : (brick && brick.isDone);
    },
  },
};
</script>

<template>
  <component :is="tag" v-if="brick === true"><slot></slot></component>
  <component :is="tag" v-else><slot name="old"></slot></component>
</template>
