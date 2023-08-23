<template>
  <div class="box" v-if="is_open">
    <p class="close" @click="hide()">close</p>

    <div class="in">
      <label for="name">用户名</label>
      <div>
        <input type="text" v-model="username" placeholder="用户名" /><img
          v-if="username.length >= 5"
          src="../assets/ok.svg"
          alt=""
        />
      </div>

      <label for="name">邮箱</label>
      <div>
        <input
          type="text"
          v-model="mail"
          placeholder="Entrer votre adresse mail"
        /><img v-if="mail.length >= 6" src="../assets/ok.svg" alt="" />
      </div>

      <div class="button_action">
        <button v-on:click="mail = ' @gmail.com'">@gmail.com</button>
        <button v-on:click="mail = '@yahoo.com'">@yahoo.com</button>
        <button v-on:click="mail = '@outlook.com'">@outlook.com</button>
        <button v-on:click="mail = '@aol.com'">@aol.com</button>
      </div>

      <label for="name">确认邮箱</label>
      <div>
        <input
          type="text"
          v-model="mail_confirm"
          placeholder="Confirmer l'adresse mail ..."
        /><img
          v-if="!mail"
          style="display: none"
          src="../assets/ok.svg"
          alt=""
        /><img
          v-else-if="mail_confirm === mail"
          src="../assets/ok.svg"
          alt=""
        />
      </div>
    </div>

    <div class="in">
      <label for="name">密码</label>
      <div>
        <v-text-field type="password">
          <input
            v-model="password_confirmation"
            type="password"
            placeholder="最少8位"
            required
          /><img
            v-if="password_confirmation.length >= 8"
            src="../assets/ok.svg"
            alt=""
          />
        </v-text-field>
      </div>
      <div class="password_bar">
        <div
          :class="{ bar: true, green: password_confirmation.length > 1 }"
        ></div>
        <div
          :class="{ bar: true, green: password_confirmation.length > 3 }"
        ></div>
        <div
          :class="{ bar: true, green: password_confirmation.length > 5 }"
        ></div>
        <div
          :class="{ bar: true, green: password_confirmation.length > 7 }"
        ></div>
      </div>
      <label for="name">确认密码</label>
      <div>
        <v-text-field type="password">
          <input
            v-model="password"
            type="password"
            placeholder="确认 ..."
            required
          /><img
            v-if="!password_confirmation"
            style="display: none"
            src="../assets/ok.svg"
            alt=""
          /><img
            v-else-if="password === password_confirmation"
            src="../assets/ok.svg"
            alt=""
          />
        </v-text-field>
      </div>
    </div>

    <div class="check_bar">
      <div>
        <input type="checkbox" name="" id="" />
        <label for="">记住我</label>
      </div>

      <a href="">忘记密码 ? </a>
    </div>

    <button v-on:click="signup" class="log">申请</button>

    <span>已经注册 ? <a href="/">直接登录</a> </span>
  </div>
</template>
  
  
  <script>
import axios from "axios";
import {config} from "../config";
axios.defaults.withCredentials = true
export default {
  data() {
    return {
      is_open: false,
      password: "",
      userLoggedIn: false,
      username: "",
      mail: "",
      mail_confirm: "",
      password_confirmation: "",
      isActive: false,
    };
  },
  toggle() {
    this.isActive = !this.enable;
  },
  methods: {
    signup() {
      axios
        .post(config.server + "/user/signup",{
          name:this.username,
          password:this.password,
          email:this.mail
        })
        .then((response) => {
          console(response.data)
         
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    show() {
      this.is_open = true;
    },
    hide() {
      this.is_open = false;
    },
  },
};
</script>
<style scoped src="../../static/style.css"/>
<style scoped>

.close {
  text-align: right;
}
/*# sourceMappingURL=style.css.map */
</style>
  
  
  
  