import Vue from 'vue';
import Fragment from 'vue-fragment';
import { VueStateMachine } from 'vue-xstate-plugin';
import operatorMachine from '@/fsm/operatorMachine';
import Construction from './Construction.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Fragment.Plugin);
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
