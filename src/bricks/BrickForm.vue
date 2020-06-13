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
  <brick name="jerry-built-stockpile" tag="div">
    <template v-slot:old>
      <p>
        Good question.
        Maybe we need some sort of stockpile when we have many bricks!
        Until then, you can send your brick via email: <a href="mailto:sendmybrick@gmail.com">sendmybrick@gmail.com</a>
      </p>
    </template>
    <h3>This is the request form for a brick:</h3>
    <brick name="andy-mvp-css">
      <template v-slot:old>
        <label for="instruction-old">Instruction: </label>
        <input type="text" id="instruction-old" placeholder="eg. Change background color." v-model="instruction" style="width:256px;">
        <br>
        <label for="owner-old">Owner: </label>
        <input type="text" id="owner-old" v-model="owner.name">
        <br>
        <label for="profile-old">Profile: </label>
        <input type="text" id="profile-old" placeholder="eg. http://twitter.com/ozdevi" v-model="owner.profile" style="width:256px;">
        <br>
        <input type="button" value="Save my brick" @click="handleSaveBrick" class="brick-builder-jerry-built-stockpile"> {{notification}}
      </template>

      <brick name="squirrel">
        <template v-slot:old>
          <label for="instruction-old-2">Instruction: </label>
          <input type="text" id="instruction-old-2" placeholder="eg. Change background color." v-model="instruction" style="width:256px;">
          <label for="owner-old-2">Owner: </label>
          <input type="text" id="owner-old-2" v-model="owner.name">
          <label for="profile-old-2">Profile: </label>
          <input type="text" id="profile-old-2" placeholder="eg. http://twitter.com/ozdevi" v-model="owner.profile" style="width:256px;">
          <a @click="handleSaveBrick" class="brick-builder-jerry-built-stockpile">
            <strong>Save my brick</strong>
          </a>
        </template>
        <div class="brick-form under-construction-band brick-builder-jerry-built-stockpile">
          <div class="form-inputs">
            <p v-if="notification">
              <mark>
                <strong>{{notification}}</strong>
              </mark>
            </p>
            <label for="instruction">Instruction: </label>
            <input type="text" id="instruction" placeholder="eg. Change background color." v-model="instruction">
            <label for="owner">Owner: </label>
            <input type="text" id="owner" v-model="owner.name">
            <label for="profile">Profile: </label>
            <input type="text" id="profile" placeholder="eg. http://twitter.com/ozdevi" v-model="owner.profile">
            <a @click="handleSaveBrick">
              <strong>Save my brick</strong>
            </a>
          </div>
          <div class="squirrel brick-builder-squirrel"></div>
        </div>
      </brick>
    </brick>
  </brick>
</template>

<style scoped lang="scss">
  .brick-form {
    display: flex;
    background-color: #e4d8bf;
    margin: 32px 0;
    div {
      flex: 1 1 auto;
    }
    .form-inputs {
      padding: 16px;
      input {
        width: 50%;
      }
    }
    .squirrel {
      text-align: right;
      background: url('~@/assets/squirrel.jpg') top right no-repeat;
      background-size: cover;
    }
  }
.yellow-bg {
  .under-construction-band {
    position: relative;

    &:before, &:after {
      position: absolute;
      top: -16px;
      left: -16px;
      z-index: 1;
      box-sizing: border-box;
      display: block;
      width: calc(100% + 32px);
      height: calc(100% + 32px);
      content: "";
      pointer-events: none;
    }

    &:before {
      border-top: 16px solid;
      border-bottom: 16px solid;
      border-image: repeating-linear-gradient(
          10deg,
          black,
          black 10px,
          yellow 10px,
          yellow 20px
      ) 1;
    }

    &:after {
      border-left: 16px solid;
      border-right: 16px solid;
      border-image: repeating-linear-gradient(
          75deg,
          black,
          black 10px,
          yellow 10px,
          yellow 20px
      ) 1;
    }
  }
}

</style>
