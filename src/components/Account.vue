<template>
  
    <a v-if="store.account.name!==undefined">当前用户：{{store.account.name}}</a>
    <div v-else>
      <a  class="btn-primary" v-on:click="signin">登录</a>
      <a  class="btn-primary"   v-on:click="signup">注册</a>
    </div>
   
 
</template>

<script>
import signup from "./sign-up.vue";
import signin from "./sign-in-fr.vue";
import { createModal } from "../ModalUtil";
import {store} from "../store";

export default {
data() {
    return {
      store
    }
  },
  methods: {
    signin() {
       this.ele1 = createModal(signin, {
      
      });
      this.ele1.show();
    },
    signup() {
       this.ele2 = createModal(signup, {
        
      });
      this.ele2.show();
    },
  }
  
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
