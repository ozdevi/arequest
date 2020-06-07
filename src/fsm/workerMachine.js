import { Machine, assign } from 'xstate';
import { db } from '@/store/database';

const services = {
  getWorkers: () => db.collection('workers')
    .get()
    .then(({ docs }) => docs
      .map((s) => ({
        id: s.id,
        ...s.data(),
      }))),
};

const actions = {
  loadWorkers: assign({
    workers: (_, event) => event.data,
  }),
  reportAccident: assign({
    error: (_, event) => event.data.errorMsg || event.data.message,
  }),
};

export default Machine({
  id: 'worker',
  context: {
    truck: 'worker',
    workers: [],
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        CALL_WORKERS: 'calling',
      },
    },
    calling: {
      invoke: {
        src: 'getWorkers',
        onDone: {
          target: 'idle',
          actions: ['loadWorkers'],
        },
        onError: {
          target: 'idle',
          actions: ['reportAccident'],
        },
      },
    },
  },
}, {
  services,
  actions,
});
