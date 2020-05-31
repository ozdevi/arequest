import Vue from 'vue';
import { VueStateMachine } from 'vue-xstate-plugin';
import operatorMachine from '@/fsm/operatorMachine';
import Construction from './Construction.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueStateMachine, [
  {
    config: operatorMachine,
    logState: true,
    logContext: true,
  },
]);

new Vue({
  store,
  render: (h) => h(Construction),
}).$mount('#user-bricks');
