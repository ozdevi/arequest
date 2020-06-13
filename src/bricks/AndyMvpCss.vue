<script>

export default {
  name: 'andy-mvp-css',
  created() {
    const mvpStyleSheet = document.getElementById('mvp');
    if (!mvpStyleSheet) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'mvp.css';
      link.id = 'mvp';
      document.head.appendChild(link);
    }
  },
  destroyed() {
    const mvpStyleSheet = document.getElementById('mvp');
    if (mvpStyleSheet) {
      mvpStyleSheet.parentNode.removeChild(mvpStyleSheet);
    }
  },
};
</script>

<template>
<span></span>
</template>
