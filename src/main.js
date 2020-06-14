import Vue from 'vue';
import { VueStateMachine } from 'vue-xstate-plugin';
import Loading from 'vue-loading-overlay';
import smoothscroll from 'smoothscroll-polyfill';
import operatorMachine from './fsm/operatorMachine';
import workerMachine from './fsm/workerMachine';
import Construction from './Construction.vue';
import store from './store';
import 'vue-loading-overlay/dist/vue-loading.css';

smoothscroll.polyfill();
Vue.config.productionTip = false;

Vue.use(Loading, {
  width: 32,
  height: 32,
  opacity: 1,
  backgroundColor: '#FFF',
  loader: 'dots',
});
Vue.use(VueStateMachine, [
  {
    config: operatorMachine,
    logState: true,
    logContext: true,
  },
  {
    config: workerMachine,
    logState: true,
    logContext: true,
  },
]);

new Vue({
  store,
  render: (h) => h(Construction),
}).$mount('#user-bricks');
