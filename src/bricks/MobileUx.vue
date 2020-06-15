<script>

export default {
  name: 'mobile-ux',
  created() {
    const muxStyleSheet = document.getElementById('mux');
    if (!muxStyleSheet) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'mux.css';
      link.id = 'mux';
      document.head.appendChild(link);
    }
  },
  destroyed() {
    const muxStyleSheet = document.getElementById('mux');
    if (muxStyleSheet) {
      muxStyleSheet.parentNode.removeChild(muxStyleSheet);
    }
  },
};
</script>

<template>
<span></span>
</template>
