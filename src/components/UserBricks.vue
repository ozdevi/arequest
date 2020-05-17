<script>
export default {
  name: 'UserBricks',
  props: {
    msg: String,
  },
};
</script>

<template>
  <div>
    <h3>Bricks (To-do list):</h3>
    <ul>
      <li>
        <input type="checkbox" id="1st" checked aria-checked="true" title="2nd brick by @gulp">
        <label>Add under construction gif &mdash; me</label>
      </li>
      <li>
        <input type="checkbox" id="1st" checked aria-checked="true" title="2nd brick by @gulp">
        <label>"Here is my brick! Turn those goddamn bullets into checkboxes." &mdash; <a href="https://news.ycombinator.com/user?id=gulp">@gulp</a></label>
      </li>
      <li>
        <input type="checkbox" id="1st" disabled title="2nd brick by @gulp">
        <label>
          <span>Seriously need a stockpile (form/database) to save the bricks! &mdash; me</span>
          <span>"Maybe you can start it building a small brick offers collection form instead of emails?" &mdash;
            <a href="https://www.producthunt.com/@ozhanatali">@ozhanatali</a>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
    list-style: none;
}

li input{
  vertical-align: top;
}

ul li input:not(:disabled):checked + label {
    text-decoration: line-through;
    color: #BBB; /* Brick Brick Brick */
}

label {
  display: inline-block;
}

label span {
  display: block;
}
</style>
