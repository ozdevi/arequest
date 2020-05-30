import Vue from 'vue';
import Vuex from 'vuex';
import { db, FieldValue } from '@/store/database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bricks: {},
    obricks: {},
    notification: '',
    config: {},
  },
  mutations: {
    async bindBricks(state) {
      const brickSnapshot = await db.collection('bricks')
        .where('approved', '==', true)
        .get();

      const bricks = brickSnapshot.docs.sort((b1, b2) => b1.data().ctime.toDate() - b2.data().ctime.toDate()).reduce((acc, doc) => {
        const brick = { ...doc.data() };
        acc[`brick-${brick.order}`] = {
          id: doc.id,
          ...brick,
        };
        return acc;
      }, {});

      state.obricks = bricks;
      state.bricks = bricks;

      const configSnapshot = await db.collection('ub')
        .doc('configs')
        .get();

      const config = configSnapshot.data();
      state.config = config;
    },
    async saveBrick(state, { instruction, owner }) {
      try {
        await db.collection('bricks').add({
          instruction,
          owner,
          ctime: FieldValue.serverTimestamp(),
        });
        state.notification = 'Your brick is saved!';
      } catch (error) {
        throw new Error('Opps...');
      }
    },
  },
  actions: {

  },
  modules: {
  },
});
