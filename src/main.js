import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from "./pages/Home.vue";
import Cart from "./pages/Cart.vue";
import Order from "./pages/Orders.vue";
const routes = [
  { path: "/cart", component: Cart },
  { path: "/order", component: Order },

  { path: "/", component: Home },
];
const router = new VueRouter({
  routes // short for `routes: routes`
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
