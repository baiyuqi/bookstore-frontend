<template>
  <div id="app" class="container">
    <div class="topnav">
      <router-link to="/">产品浏览</router-link>
      <router-link to="/cart">购物车</router-link>
      <router-link to="/order">订单</router-link>
      <Account />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Account from "./components/Account.vue";

export default {
  name: "app",

  data() {
    return {
      currentRoute: window.location.pathname,
    };
  },
  components: {
    Account,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
