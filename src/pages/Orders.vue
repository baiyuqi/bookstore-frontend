<template>

<div>
    <div  id="cart" v-cloak>
        <template v-if="orderlis.length">
          <table>
              <thead>
                  <tr>
                      <th>序号</th>
                      <th>订单号</th>
                      <th>下单日期</th>
                      <th>订单金额</th>
                     
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for=" (item,index) in orderlis" :key="index">
                    <td>{{index}}</td>
                    <td>{{item.id.substring(0,5) + "..."}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.price}}</td>
                    
                    <td>
                 
                        <button @click="detail(index)">详情</button>

                    </td>
                   
                  </tr>
              </tbody>
          </table>
          
        </template>
         <div v-else>订单为空</div>
    </div>
</div>

</template>
<script>

import axios from "axios";
import {config} from "../config";
axios.defaults.withCredentials = true
export default {
    components: {

  },
  data () {
    return {
      orderlis: []
    }
  },
  computed: {
//计算并获取总价
    totalPrice () {
      let total = 0
      for (let i = 0; i < this.orderlis.length; i++) {
        let item = this.orderlis[i]
        total += item.productPrice * item.quantity
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    }
  },
  methods: {

  //获取商品列表
    getGoodList () {

       axios
        .get(config.server + "/order/myorders")
        .then((response) => {
          this.orderlis = response.data
          
        })
        .catch(function (error) {
          console.log(error);
        });

     
    },
    //减少商品数量
    handleReduce (index) {
      if (this.orderlis[index].count === 1) return
      this.orderlis[index].quantity--
    },
     //增加商品数量
    handleAdd (index) {
      this.orderlis[index].quantity++
    },
    //从购物车中移除该商品
    handleRemove (index) {
      this.orderlis.splice(index, 1)
    },
    order(){
      axios
        .post(config.server + "/order/add", {
          items:this.orderlis,
          totalPrice:this.totalPrice
          
        })
        .then((response) => {
          alert(response.status);
        })
        .catch(function (error) {
          alert.log(error);
        });
    }
  },
  mounted () {
  //获取商品
    this.getGoodList()
  }
}
</script>

<style scoped>
.total{
    text-align: left ;
}
[v-cloak]{
    display: none;
}
table{
    border: 1px solid #e9e9e9;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
}
th,td{
    padding: 8px 16px;
    border:1px solid #e9e9e9;
    text-align: left }
th{
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
}
</style>
