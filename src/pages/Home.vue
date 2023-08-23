<template>

    <div class="hello">
      <div>
        <input name="name" v-model="selected.name" placeholder="名称" />
        <input name="price" v-model="selected.price" placeholder="价格" />
      </div>
      <div>
        <div style="margin: 10px">
          <input name="vitalInformation" v-model="keyword" />
          <a href="#" v-on:click="search">搜索商品</a>
        </div>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap">
          <div
            v-bind:key="product.id"
            v-for="product in products"
            style="border: 2px; border-style: ridge; margin: 10px"
          >
            <div>
              <img
                style="height: 200px; width: 150px"
                :src="product.imageUrl"
                v-on:click="edit(product.index)"
              />
              <div>
                <label>品名: {{ product.name }}</label>
                <p />
                <label>价格: {{ product.price }} ￥</label>
                <p />
                <label alt="product.desc"
                  >描述: {{ product.desc.substring(0, 5) + "..." }}
                </label>
                <p />
                <button @click="addCart(product.id)">加入购物车</button>
                <p />
                <button>直接购买</button>
                <p />

                <button @click="openModal(product.id)">编辑</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>

import axios from "axios";
import {config} from "../config";

import Modal from "../components/ProductEditor.vue";
import { createModal } from "../ModalUtil";
axios.defaults.withCredentials = true;
export default {
  components: {
 

  },

  data() {
    return {
      selected: {
        id: "",
        name: "",
        price: 0,
      },
      keyword: "",
      products: [],
    };
  },
  props: {
    msg: String,
  },
  mounted() {
    axios
      .get(config.server + "/product/list")
      .then((response) => {
        this.products = response.data;
        for (var i = 0; i < this.products.length; i++) {
          this.products[i].imageUrl =
            config.server + "/product/view?documentId=" +
            this.products[i].documentId;
          this.products[i].index = i;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  methods: {
    openModal(id) {
      this.ele = createModal(Modal, {
        title: "弹出框",
        content: "内容",
        id: id,
      });
      this.ele.show();
    },
    addCart(id) {
      axios
        .post(config.server + "/cart/addItem", {
          productId: id,
        })
        .then(() => {
          this.$router.push("/cart")
          //window.location.href = "/cart";
        })
        .catch(function (error) {
          alert.log(error);
        });
    },
    edit(id) {
      this.selected.name = this.products[id].name;
      this.selected.price = this.products[id].price;
    },
    search() {
      axios
        .get(config.server + "/product/search?name=" + this.keyword)
        .then((response) => {
          this.products = response.data;
          for (var i = 0; i < this.products.length; i++) {
            this.products[i].imageUrl =
             config.server + "/product/view?documentId=" +
              this.products[i].documentId;
            this.products[i].index = i;
          }
        })
        .catch(function (error) {
          alert.log(error);
        });
    },
    hoverTestLeave() {
      this.hoverTestText = "broke";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
