<script>
import { mapState } from 'vuex';
import Brick from '@/Brick.vue';

export default {
  name: 'brick-form',
  computed: mapState(['notification']),
  components: {
    Brick,
  },
  data() {
    return {
      instruction: '',
      owner: {
        name: 'anonymous',
      },
    };
  },
  methods: {
    handleSaveBrick() {
      const { instruction, owner } = this;
      this.$store.commit('saveBrick', {
        instruction, owner,
      });
      this.instruction = '';
    },
  },
};
</script>

<template>
  <brick name="jerry-built-stockpile">
    <template v-slot:old>
      <p>
        Good question.
        Maybe we need some sort of stockpile when we have many bricks!
        Until then, you can send your brick via email: <a href="mailto:sendmybrick@gmail.com">sendmybrick@gmail.com</a>
      </p>
    </template>
    <p>This is the request form for a brick:</p>
    <label for="instruction">Instruction: </label>
    <input type="text" id="instruction" placeholder="eg. Change backgroud color." v-model="instruction" style="width:256px;">
    <br>
    <label for="owner">Owner: </label>
    <input type="text" id="owner" v-model="owner.name">
    <br>
    <label for="profile">Profile: </label>
    <input type="text" id="profile" placeholder="eg. http://twitter.com/ozdevi" v-model="owner.profile" style="width:256px;">
    <br>
    <input type="button" value="Save my brick" @click="handleSaveBrick"> {{notification}}
  </brick>
</template>
