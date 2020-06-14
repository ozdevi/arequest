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
          <div class="squirrel brick-builder-squirrel brick-builder-super-squirrel"></div>
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
.super-squirrel {
  .brick-form {
    .squirrel {
      position: relative;
    }
    .squirrel:hover {
      &:after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right : 0;
        background: linear-gradient(90deg, transparent 50%, #000 0);
        background-size: 30px 100%;
        animation: break-trap 3s 3s forwards;
      }
      animation:
        trapped-squirrel 3s forwards,
        super-squirrel 3s 3s infinite;
    }
  }

  @keyframes trapped-squirrel {
    0% {
      -webkit-filter: hue-rotate(0deg) saturate(2) invert(0);
    }

    50% {
      -webkit-filter: hue-rotate(360deg) saturate(8) invert(.25);
    }

    100% {
      -webkit-filter: hue-rotate(0deg) saturate(2) invert(0);
    }
  }
  @keyframes super-squirrel {
    0% {
      background-image: url('~@/assets/super-squirrel.jpg');
    }

    100% {
      background-image: url('~@/assets/super-squirrel.jpg');
    }
  }
  @keyframes break-trap {
    0% {
      background: #000;
    }

    100% {
      background: transparent;
    }
  }
}

.yellow-bg {
  .under-construction-band {
    position: relative;
    border: 1em solid transparent;
    background:
      linear-gradient(white, white) padding-box,
      repeating-linear-gradient(-45deg, yellow 0, yellow 12.5%,
        transparent 0, transparent 25%,
        black 0, black 37.5%,
        transparent 0, transparent 50%) 0 / 5em 5em;
  }
}

</style>
