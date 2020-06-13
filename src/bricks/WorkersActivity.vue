<script>

export default {
  name: 'workers-activity',
  computed: {
    workers() {
      return this.$workerMachine.context.workers;
    },
    leaderLines() {
      return this.workers.reduce((acc, worker) => {
        const workerRef = this.$refs[`worker-ref-${worker.id}`];
        const brickBuilders = document.querySelectorAll(`.brick-builder-${worker.working.on}`);
        if (workerRef && workerRef.length > 0 && brickBuilders && brickBuilders.length > 0) {
          const leaderLine = new window.LeaderLine(
            workerRef[0],
            brickBuilders[0], {
              size: 2,
              endPlug: 'hand',
              hide: true,
              dash: { animation: true },
            },
          );
          leaderLine.setOptions({ startSocket: 'right', endSocket: 'right' });
          acc[worker.id] = leaderLine;
        }
        return acc;
      }, {});
    },
  },
  methods: {
    visualiseChanges(wid, action) {
      const leaderLine = this.leaderLines[wid];
      if (leaderLine) {
        leaderLine.position();
        leaderLine[action]('draw');
      }
    },
  },
};
</script>

<template>
  <div class="brick-builder-worker-activity">
    <small>Workers: </small>
    <small v-for="worker in workers" :key="worker.id">
        <a href="#">&nbsp;{{worker.id}}</a> is
        <span v-if="worker.working">working on
          <a href="#"
             :ref="`worker-ref-${worker.id}`"
             @mouseenter="visualiseChanges(worker.id,'show')"
             @mouseleave="visualiseChanges(worker.id,'hide')"
          >this&nbsp;</a>
        </span>
        <span v-else>idle.</span>
    </small>
  </div>
</template>
