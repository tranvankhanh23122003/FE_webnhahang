import { ref, watch } from 'vue';
import axios from 'axios'; 
import api from '../services/api';
export const cartCount = ref(0);
export const cartItems = ref([]);

const fetchCart = async () => {
  try {
    const response = await api.get('/client/carts'); 

    console.log(response.data);
    // Lưu thông tin chi tiết vào giỏ hàng
    cartItems.value = response.data.map(item => ({
    id : item.id,

      id_food: item.id_food,
      quantity: item.quantity,
      name: item.name,  
      price: item.price, 
      image: item.image  
    }));
    cartCount.value = response.data.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error("Không thể lấy giỏ hàng", error);
  }
};

export async function addToCart(mon) {
  const newItem = {
    id_food: mon.id,
    id_table: 1, 
    quantity: 1,
    name: mon.name,   
    price: mon.price, 
    image: mon.image  
  };

  try {
    const existingItemIndex = cartItems.value.findIndex(item => item.id_food === mon.id);
    
    if (existingItemIndex !== -1) {
      cartItems.value[existingItemIndex].quantity++;
    } else {
      const response = await api.post('/client/carts/create', newItem);
      cartItems.value.push({
        ...newItem,
        id_food: response.data.id_food 
      });
    }
    cartCount.value++;
  } catch (error) {
    console.error("Không thể thêm vào giỏ hàng", error);
  }
}

watch(cartItems, async (newCart) => {
  try {
    // Gửi PUT cho từng món thay vì cả giỏ hàng
    for (let item of newCart) {
      await api.put(`/client/carts/${item.id}`, item); // Gửi PUT cho từng món
    }
  } catch (error) {
    console.error("Không thể cập nhật giỏ hàng", error);
  }
}, { deep: true });


fetchCart(); // Lấy giỏ hàng khi trang web được tải
