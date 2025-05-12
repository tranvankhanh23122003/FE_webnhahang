<template>
  <div class="shopping-cart">
    <div class="container-shoppingCart">
      <div class="col-left">
        <div class="order-cart">
          <h3 style="font-size: 30px;" class="order-title"><strong>Giỏ Hàng Của Bạn</strong></h3>
          <div v-if="cartItems.length === 0">
            Chưa có mặt hàng nào
          </div>
          <div v-else>
            <div>
              <ul class="header-cart">
                <li>Thông tin sản phẩm</li>
                <li>Đơn giá</li>
                <li>Số lượng</li>
                <li>Thành tiền</li>
              </ul>
            </div>
            <ul>
              <li class="order-item" v-for="(item, index) in cartItems" :key="item.id || index">
                <div class="item-col info">
                  <img :src="item.image" />
                  <span>{{ item.name }}</span>
                </div>
                <div style="margin-left: 20px;" class="item-col price">
                  {{ item.price }}₫
                </div>
                <div class="item-col quantity">
                  {{ item.quantity }}
                </div>
                <div class="item-col total">
                  {{ item.price * item.quantity }}₫
                  <button class="btn-delete" @click="xoaHang(item.id)">Xóa</button>
                </div>
              </li>
            </ul>
            <div class="order-btn-wrapper">
              <p>Tổng tiền </p>
              <router-link :to="{ name: 'users-pay' }">
                <button class="btn-orderItem">Đặt Món</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-right"></div>
    </div>
  </div>
</template>

<script setup>
import { cartItems } from '../../stores/cartStore';
import axios from 'axios';
import api from '../../services/api';
// Xóa món khỏi giỏ hàng
async function xoaHang(id) {
  try {
    await api.delete(`/client/carts/${id}`); // Gửi yêu cầu xóa món từ giỏ hàng
    const index = cartItems.value.findIndex(item => item.id === id);// id chứ k phải id_food
    if (index !== -1) {
      cartItems.value.splice(index, 1); // Xóa món khỏi giỏ
    }
  } catch (error) {
    console.error("Không thể xóa mzón khỏi giỏ hàng", error);
  }
}
</script>

<style scoped>
.shopping-cart {
  background-color: #143b36;
  height: auto;
  padding: 20px;
}

.container-shoppingCart {
  margin: 0 auto;
  width: 1300px;
  display: flex;
  overflow: hidden;
}

.col-left {
  width: 70%;
  color: white;
}

.col-right {
  width: 30%;
  color: white;
}

.order-cart {
  margin-top: 20px;
  border: 1px solid white;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
}

.header-cart {
  display: flex;
  color: white;
  font-weight: bold;
  border-bottom: 2px solid white;
  padding-bottom: 10px;
}

.header-cart li {
  flex: 1;
  list-style: none;
  text-align: center;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}

.item-col {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.item-col img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-left: 10px;
  border-radius: 5px;
}

.btn-delete {
  margin-left: 10px;
  color: red;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.btn-delete:hover {
  color: darkred;
}

.order-btn-wrapper {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: flex-end;
}

.btn-orderItem {
  color: #fff;
  background-color: #d69c52;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 3px 6px #a37b44;
  height: 40px;
  width: 200px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}

.btn-orderItem:hover {
  background-color: #c58a3c;
  box-shadow: 0 5px 10px #a37b44;
}
</style>