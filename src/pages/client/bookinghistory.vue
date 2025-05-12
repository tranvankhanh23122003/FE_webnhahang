<template>
  <div class="container">
    <div class="history-table">
      <div class="col-left">
        <p class="title-history">
          <i class="fas fa-history"></i>
          Lịch Sử Đặt Món
          <i class="fas fa-history"></i>
        </p>

        <div class="booking-list">
          <table>
            <thead>
              <tr>
                <th>Thời Gian</th>
                <th>Món Ăn</th>
                <th>Số Lượng</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="4">Đang tải dữ liệu...</td>
              </tr>
              <tr v-else-if="orders.length === 0">
                <td colspan="4">Không có dữ liệu đặt món.</td>
              </tr>
              <tr v-else v-for="(item, index) in orders" :key="index">
                <td>{{ formatDateTime(item.timeBooking) }}</td>
                <td>{{ item.foodName }}</td>
                <td>{{ item.quantity }}</td>
                <td>
                  <button class="action-btn delete-btn" @click="deleteOrder(index)">Xoá</button>
                  <button class="action-btn update-btn" @click="updateOrder(item, index)">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-right">
        <img style="border-radius: 50%; margin-bottom: 50px;" src="/imageicon/phefood.png" alt="Hình ảnh" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const orders = ref([]);
const isLoading = ref(false);
const foods = ref([]);

const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const deleteOrder = (index) => {
  if (confirm('Bạn có chắc muốn xóa món này?')) {
    const currentData = JSON.parse(localStorage.getItem('bookings')) || [];
    currentData.splice(index, 1);
    localStorage.setItem('bookings', JSON.stringify(currentData));
    orders.value.splice(index, 1);
    alert('Xóa thành công!');
  }
};

const updateOrder = (item, index) => {
  // Gửi yêu cầu cập nhật từ frontend tới backend
  const updatedItem = { ...item, quantity: item.quantity + 1 };  // Ví dụ, tăng số lượng món ăn
  api.put(`/admin/bookings/${item.id}`, updatedItem)
    .then(response => {
      alert('Cập nhật thành công!');
      orders.value[index] = { ...response.data.booking };  // Cập nhật dữ liệu sau khi nhận phản hồi từ server
    })
    .catch(error => {
      console.error('Lỗi khi cập nhật:', error);
      alert('Cập nhật thất bại');
    });
};

const getFoods = async () => {
  try {
    const res = await api.get('/client/foods');
    foods.value = res.data;
  } catch (err) {
    console.error('Lỗi khi lấy danh sách món:', err);
  }
};

onMounted(async () => {
  await getFoods();
  const stored = JSON.parse(localStorage.getItem('bookings')) || [];

  orders.value = stored.map((item) => {
    const food = foods.value.find(f => f.id === item.booking_food.id_food);
    return {
      id: item.id,
      timeBooking: item.timeBooking,
      foodName: food ? food.name : 'Không tìm thấy',
      quantity: item.booking_food.quantity
    };
  });
});
</script>




  <style scoped>
  .container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: center;
  }
  
  .history-table {
    width: 100%;
    height: auto;
    background: #143b36;
    border-radius: 60px;
    display: flex;
    align-items: center;
    padding: 30px;
    gap: 40px;
  }
  
  .col-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .col-right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .col-right img {
    width: 100%;
    max-width: 400px;
    object-fit: contain;
    margin-top: 100px;
  }
  
  .title-history {
    font-family: "Dancing Script", cursive;
    text-align: center;
    color: white;
    margin-bottom: 20px;
    font-size: 2rem;
  }
  
  .booking-list {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    color: white;
  }
  
  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  
  th {
    font-weight: bold;
  }
  
  .action-btn {
    padding: 8px 12px;
    margin-right: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .edit-btn {
    background: #28a745;
    color: white;
  }
  
  .edit-btn:hover {
    background: #218838;
  }
  
  .delete-btn {
    background: #dc3545;
    color: white;
  }
  .update-btn {
    background: green;
    color: white;
  }
  
  .delete-btn:hover {
    background: #c82333;
  }
  
  .edit-form {
    margin-top: 20px;
  }
  
  .edit-title {
    font-family: "Dancing Script", cursive;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .input-text {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-row {
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  label {
    color: white;
    margin-bottom: 6px;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
  }
  
  input {
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .edit-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .oder-btn {
    background: white;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
  }
  
  .oder-btn:hover {
    background: yellow;
  }
  
  .cancel-btn {
    background: #dc3545;
    color: white;
  }
  
  .cancel-btn:hover {
    background: #c82333;
  }
  </style>