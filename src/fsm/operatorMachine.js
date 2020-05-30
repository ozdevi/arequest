import {
  Machine, assign, send,
} from 'xstate';
import truckMachine from './truckMachine';

const opActions = {
  unloadTruck: assign({
    stockpile: (_, event) => event.data,
    storage: (_, event) => ({
      bricks: event.data,
      hasBricks: event.data.length > 0,
      hasCalled: true,
    }),
  }),
  recordBricks: assign({
    history: ({ stockpile }) => stockpile.reduce((acc, brick) => {
      const recorder = acc;
      if (brick.isDone && brick.ftime && !brick.redundant) {
        recorder[brick.id] = {
          id: brick.id,
          type: 'done',
          note: brick.note || `Brick ${brick.instruction}`,
          time: brick.ftime?.toDate(),
        };
      }
      return recorder;
    }, {}),
  }),
  buildBricks: assign({
    builders: ({ stockpile }) => stockpile.filter((brick) => brick.isDone).reduce((acc, brick) => {
      const builder = acc;
      builder[brick.name] = {
        ...brick,
      }; // hard-coded
      return builder;
    }, {}),
  }),
  tellStory: assign(({ storage }, event) => {
    const { history } = event.data;
    const stockpile = storage.bricks.filter((b) => b.ctime.toDate() <= history.time).map((b) => {
      if (b.ftime && b.ftime.toDate() > history.time) {
        return {
          ...b,
          isDone: false,
        };
      }
      return b;
    });
    const builders = stockpile.filter((brick) => brick.isDone).reduce((acc, brick) => {
      const builder = acc;
      builder[brick.name] = { ...brick };
      return builder;
    }, {});
    return {
      stockpile,
      builders,
    };
  }),
};

export default Machine({
  id: 'operator',
  context: {
    stockpile: [],
    history: [],
    builders: [],
    storage: {},
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: 'working',
        SHOW_HISTORY: 'timeTravelling',
      },
    },
    working: {
      invoke: {
        id: 'truck',
        src: truckMachine,
        onDone: {
          actions: ['unloadTruck', 'recordBricks', 'buildBricks', send('STOP')],
        },
      },
      entry: send('CARRY_BRICKS', { to: 'truck' }),
      on: {
        STOP: 'idle',
      },
    },
    timeTravelling: {
      entry: ['tellStory'],
      on: {
        BACK_TO_NOW: {
          target: 'working',
        },
        SHOW_HISTORY: 'timeTravelling',
      },
    },
    headoff: { type: 'final' },
  },
}, {
  actions: opActions,
});
