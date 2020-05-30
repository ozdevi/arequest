import { Machine, assign } from 'xstate';
import { db } from '@/store/database';

const services = {
  getBricks: () => db.collection('bricks')
    .where('approved', '==', true)
    .get().then(({ docs }) => docs
      .sort((b1, b2) => b1.data().ctime.toDate() - b2.data().ctime.toDate())
      .map((s) => ({
        id: s.id,
        ...s.data(),
      }))),
};

const actions = {
  loadBricks: assign({
    bricks: (_, event) => event.data,
  }),
  reportAccident: assign({
    error: (_, event) => event.data.errorMsg || event.data.message,
  }),
};

export default Machine({
  id: 'truck',
  context: {
    truck: 'truck',
    bricks: [],
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        CARRY_BRICKS: 'carrying',
      },
    },
    carrying: {
      invoke: {
        src: 'getBricks',
        onDone: {
          target: 'loaded',
          actions: ['loadBricks'],
        },
        onError: {
          target: 'accident',
          actions: ['reportAccident'],
        },
      },
    },
    loaded: {
      type: 'final',
      data: (context) => context.bricks,
    },
    accident: { type: 'final' },
  },
}, {
  services,
  actions,
});
