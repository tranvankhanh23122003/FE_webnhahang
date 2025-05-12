<template>
  <div class="bang-xep-hang">
    <h2 class="tieu-de">🏆 Bảng xếp hạng</h2>
    <div class="danh-sach-rank">
      <div
        v-for="(rank, index) in ranks"
        :key="rank.id"
        class="rank-card"
        :class="'hang-' + (index + 1)"
      >
        <img :src="`http://localhost:8000/images/ranks/${rank.image}`" :alt="rank.nameRank" />
        <div class="ten-rank">
          #{{ index + 1 }} - {{ rank.nameRank }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const ranks = ref([])

onMounted(async () => {
  try {
    const response = await api.get('client/ranks')
    ranks.value = response.data
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu rank:', error)
  }
})
</script>

<style scoped>
.bang-xep-hang {
  padding: 24px;
  background-color: #143b36; /* Màu nền xanh đậm */
  border-radius: 20px;
  max-width: 640px;
  margin: 24px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.tieu-de {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #f0f4f8; /* Màu chữ sáng để tương phản */
  margin-bottom: 24px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.danh-sach-rank {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.rank-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: #ffffff; /* Nền trắng cho thẻ */
  padding: 14px 18px;
  border-radius: 14px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.rank-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}

.rank-card img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 8px;
}

.ten-rank {
  font-size: 20px;
  font-weight: 600;
  color: #143b36; /* Màu chữ trùng màu nền chính cho đồng bộ */
}

/* Màu sắc riêng cho top 3 */
.hang-1 {
  border-left: 8px solid #ffd700; /* Vàng */
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.1), #ffffff);
}

.hang-2 {
  border-left: 8px solid #c0c0c0; /* Bạc */
  background: linear-gradient(90deg, rgba(192, 192, 192, 0.1), #ffffff);
}

.hang-3 {
  border-left: 8px solid #cd7f32; /* Đồng */
  background: linear-gradient(90deg, rgba(205, 127, 50, 0.1), #ffffff);
}
</style>