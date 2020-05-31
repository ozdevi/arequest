<script>
export default {
  name: 'brick',
  props: {
    name: String,
    action: String,
    related: Array,
    tag: {
      type: String,
      default: 'span',
    },
  },
  computed: {
    brick() {
      const operatorContext = this.$operatorMachine.context;
      const { builders } = operatorContext;
      const brick = builders[this.name];
      return brick && (brick.isDone || brick.isDeveloping);
    },
  },
};
</script>

<template>
  <component :is="tag" v-if="brick"><slot></slot></component>
  <component :is="tag" v-else><slot name="old"></slot></component>
</template>
