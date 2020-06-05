<script>
import MersenneTwister from '@dsibilly/mersenne-twister';
import Brick from '@/Brick.vue';
import format from 'date-fns/format';

const rng = new MersenneTwister(format(new Date(), 'dMyyyy'));

export default {
  name: 'todays-lucy-number',
  data() {
    return { randomNumber: rng.randomInt() };
  },
  components: {
    Brick,
  },
};
</script>

<template>
  <brick name="todays-lucky-number">
    <mark class="today-lucky-number">
      <strong>
        <em>Today's random number is {{randomNumber}}</em>
      </strong>
    </mark>
  </brick>
</template>

<style scoped lang="scss">
.today-lucky-number em{
  text-decoration: none!important;
  white-space: normal;
}
</style>
