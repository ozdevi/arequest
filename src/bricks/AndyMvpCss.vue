<script>
// import '@/assets/mvp.css';

export default {
  name: 'andy-mvp-css',
  created() {
    const mvpStyleSheet = document.getElementById('mvp');
    if (!mvpStyleSheet) {
      const file = document.createElement('link');
      file.rel = 'stylesheet';
      file.href = 'mvp.css';
      file.id = 'mvp';
      document.head.appendChild(file);
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
