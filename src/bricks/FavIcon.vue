<script>

export default {
  name: 'fav-icon',
  created() {
    const favIconLink = document.getElementById('fav-icon');
    favIconLink.href = 'favicon.ico';
  },
  destroyed() {
    const favIconLink = document.getElementById('fav-icon');
    favIconLink.href = 'data:;base64,iVBORw0KGgo='; // empty icon
  },
};
</script>

<template>
  <span></span>
</template>
