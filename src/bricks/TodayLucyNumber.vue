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
  <brick name="todays-luck-number"> Today's random number is {{randomNumber}}</brick>
</template>
