<script>
import Brick from '@/Brick.vue';

export default {
  name: 'orange',
  components: {
    Brick,
  },
};
</script>

<template>
  <brick name="orange" tag="div">
    <div class="orange brick-builder-orange">
      <div>23 oranges for 23rd brick!</div>
      <span>{{'🍊'.repeat(23)}}</span>
    </div>
  </brick>
</template>

<style scoped lang="scss">
.orange {
  margin-bottom: 16px;
}
</style>
