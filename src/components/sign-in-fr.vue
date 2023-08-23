<template>
<div class="box" v-if="is_open">
     <p class="close" @click="hide()">close</p>
  <div class="banner_high">
    <img src="../assets/logo.svg" alt="">
    <div class="language">
    <div class="flag" :class="{active:isActive}"  v-on:click="isActive = ! isActive"><img src="../assets/fr_flag.png" alt=""></div>
    <div class="flag" :class="{active:!isActive}"  v-on:click="isActive = ! isActive"><img src="../assets/uk_flag.png" alt=""></div>
  </div>
  </div>
 
  <h1>登录</h1>
 
  <div class="in">
      <label for="name">用户名或邮箱</label>
    
      <div>  <input type="text" v-model="username" placeholder="E-mail"
           /><img v-if="username.length >= 4" src="../assets/ok.svg" alt=""></div>

  <div class="button_action">
    <button v-on:click="username = ' @gmail.com' ">@gmail.com</button> <button v-on:click="username = '@yahoo.com' ">@yahoo.com</button>  <button v-on:click="username = '@outlook.com' ">@outlook.com</button>  <button v-on:click="username = '@aol.com' ">@aol.com</button>
  </div>
  </div>

  <div class="in">
  <label for="name">密码</label>
  <div>
      <input v-model="password" type="password" :name="string" placeholder="输入密码..." required/><img v-if="password.length >= 8" src="../assets/ok.svg" alt="">
  </div>

  </div>

 
 
  <div class="check_bar">
    <div> <input type="checkbox" name="" id="">
    <label for="">记住我？</label></div>
   
    <a href="">忘记密码 ? </a>

  </div>


  <button class="log" v-on:click="signin">
    登录
    </button>
   

<span>Pas encore de compte ? <a href="/signup">尚未注册？</a> </span> 
</div>

</template>


<script>
import axios from "axios";
import {store} from "../store";
import {config} from "../config";
axios.defaults.withCredentials = true
export default {

  data() {
    
    return {
       is_open: false,
      password:"",
      userLoggedIn: false,
      username:"",    
      isActive: false,
    };
    
  },toggle() {
this.isActive = ! this.enable ;
},
 methods: {
   signin() {
    debugger
      axios
        .post(config.server + "/user/login",{
          name:this.username,
          password:this.password
 
        })
        .then((response) => {
          console.log(response.data)
          debugger
          store.account = response.data
          this.is_open = false
        })
        .catch(function (error) {
          alert(error);
//this.$Message.error(error);
        });
       
    },
    show() {
      this.is_open = true;
    },
    hide() {
      this.is_open = false;
    },
  }
};

</script>
<style scoped src="../../static/style.css"/>
<style scoped>

.close {
  text-align: right;
}
/*# sourceMappingURL=style.css.map */
</style>
  