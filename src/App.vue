<script>
import UserBricks from './components/UserBricks.vue';

export default {
  name: 'App',
  components: {
    UserBricks,
  },
};
</script>

<template>
  <div id="app">
    <h1>Hello, user!</h1>
    <p>
      This website will be built on top of your requests.
      Each request is a brick and we can start a construction with them.
      So this is really under construction. Go bring a brick!
    </p>
    <h2>Where can I put my bricks?</h2>
    <p>
      Good question.
      Maybe we need some sort of stockpile when we have many bricks!
      Until then, you can send your brick via email:
      <a href="mailto:sendmybrick@gmail.com">sendmybrick@gmail.com</a>
    </p>
    <UserBricks/>
    <footer>
    <img src="./assets/under-construction.gif" alt="A pictogram worker is digging the ground." title="1st brick by @ozdevi" />
    <br/>
    <a href="https://github.com/ozdevi">ozdevi</a> and <a href="https://github.com/rabia-begum">rabia begum</a> are working on this...
    <br>
    <br>
    <a href="/" title="by @everyone">Latest</a> •
    History:
    <a href="./bricks/base.html" title="by @ozdevi">Base</a> •
    <a href="./bricks/1st.html" title="by @ozdevi">1st Brick</a> •
    <a href="./bricks/2nd.html" title="by @gulp">2nd Brick</a>
    <br/>
    <br/>
    <small>gif graciously taken from <a href="http://textfiles.com/underconstruction/">textfiles.com</a></small>
    </footer>
  </div>
</template>

<style lang="scss"></style>
