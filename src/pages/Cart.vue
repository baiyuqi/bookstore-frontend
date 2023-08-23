<template>

    <div>
      <div id="cart" v-cloak>
        <template v-if="itemlis.length">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>商品名称</th>
                <th>商品单价</th>
                <th>购买数量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in itemlis" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.productName }}</td>
                <td>{{ item.productPrice }}</td>
                <td>
                  <button
                    @click="handleReduce(index)"
                    :disabled="item.quantity === 1"
                  >
                    -
                  </button>
                  {{ item.quantity }}
                  <button @click="handleAdd(index)">+</button>
                </td>
                <td>
                  <button @click="handleRemove(index)">移除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="computePrice()">计算折后价</button>
          <div class="total">总价：¥{{ totalPrice }}</div>
          <div class="total">折后价：¥{{ computedPrice.totalPrice }} {{computedPrice.message}}</div>
          <button @click="order()">下单</button>
        </template>
        <div v-else>购物车为空</div>
      </div>
    </div>

</template>
<script>

import axios from "axios";
import {config} from "../config";
axios.defaults.withCredentials = true;
export default {
  components: {

  },
  data() {
    return {
      itemlis: [],
      computedPrice:{},
    };
  },
  computed: {
    //计算并获取总价
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.itemlis.length; i++) {
        let item = this.itemlis[i];
        total += item.productPrice * item.quantity;
      }

      return total.toString().replace(/\B(?=(\d{3})+$)/g, ",");
    },
  },
  methods: {
    computePrice() {
 
      axios
        .post(config.server + "/cart/compute-price", {
          items: this.itemlis,
        })
        .then((response) => {
          //  alert(response.status);
          let data = response.data;
          this.computedPrice = data;
        })
        .catch(function (error) {
          alert(error);
        });
    },

    //获取商品列表
    getGoodList() {
      axios
        .get(config.server + "/cart/view")
        .then((response) => {
          this.itemlis = response.data.items;
        })
        .catch(function (error) {
          alert.log(error);
        });
    },
    //减少商品数量
    handleReduce(index) {
      if (this.itemlis[index].count === 1) return;
      this.itemlis[index].quantity--;
    },
    //增加商品数量
    handleAdd(index) {
      this.itemlis[index].quantity++;
    },
    //从购物车中移除该商品
    handleRemove(index) {
      
      axios
        .post(
          config.server + "/cart/removeItem?itemId=" +
            this.itemlis[index].id,
          {}
        )
        .then(() => {
          //  alert(response.status);
          this.itemlis.splice(index, 1);
        })
        .catch(function (error) {
          alert.log(error);
        });
    },
    order() {
      axios
        .post(config.server + "/order/add", {
          items: this.itemlis,
          totalPrice: this.totalPrice,
        })
        .then((response) => {
          alert(response.status);
          this.$router.push("/orders")
         // window.location.href="/orders"
        })
        .catch(function (error) {
          alert.log(error);
        });
    },
  },
  mounted() {
    //获取商品
    this.getGoodList();
  },
};
</script>

<style scoped>
.total {
  text-align: left;
}
[v-cloak] {
  display: none;
}
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
}
th,
td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
th {
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
</style>
