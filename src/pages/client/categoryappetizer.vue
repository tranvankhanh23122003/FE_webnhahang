<template>
  <div class="container-cartegoryaooetizer">
    <h1>Danh Sách Menu</h1>

    <div class="categories">
      <button v-for="(category, index) in categories" :key="category.name" @click="selectCategory(index)"
        class="category-button" :class="{ active: selectedCategoryIndex === index }" type="button">
        {{ category.name }}
      </button>
    </div>

    <div class="food-items" v-if="selectedCategory && selectedCategory.dsMon.length > 0">
      <h2>{{ selectedCategory.name }}</h2>

      <div class="menu-grid">
        <div class="card-menu" v-for="(dish, dishIndex) in selectedCategory.dsMon" :key="dishIndex">
          <img :src="dish.image" alt="" />
          <div class="info-card">
            <div class="card-name"><strong>{{ dish.name }}</strong></div>
            <div class="card-cost"><strong>{{ dish.cost }}</strong></div>

            <div class="card-title">{{ dish.detail }}</div>
            <div class="card-price">
              <span class="old-price" v-if="dish.oldPrice">{{ dish.oldPrice.toLocaleString() }}đ</span>
              <span class="new-price" v-if="dish.newPrice">{{ dish.newPrice.toLocaleString() }}đ</span>
            </div>

            <div class="btn-wrapper">
              <button class="btn-order">Đặt Hàng</button>
              <button class="btn-add" @click="handleAddToCart(dish)">
                Thêm vào giỏ <i class="fas fa-shopping-cart"></i>
              </button>

              <div class="gio-hang-icon">
                <span class="so-luong" v-if="soLuong > 0">{{ soLuong }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="food-items" v-else>
      <p>Vui lòng chọn danh mục để xem món ăn.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'
import { useRouter } from 'vue-router'
import { cartItems, addToCart } from '../../stores/cartStore'

const router = useRouter()

const categories = ref([])

const selectedCategoryIndex = ref(null)


function selectCategory(index) {
  selectedCategoryIndex.value = index
  console.log("Danh mục đã chọn:", selectedCategory.value)
}

// Hàm lấy danh mục đã chọn
const selectedCategory = computed(() => {
  return selectedCategoryIndex.value !== null ? categories.value[selectedCategoryIndex.value] : null
})

// Tính tổng số lượng trong giỏ hàng
const soLuong = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.soLuong, 0)
})

// Tải danh mục và món ăn từ API khi component được mount
onMounted(async () => {
  fetchCategories()
  try {
    const response = await api.get('/client/foods')
    const foods = response.data
    console.log('ád', foods);


    const categorizedFoods = categorizeFoods(foods)
    categories.value = categorizedFoods
    console.log("Danh sách danh mục:", categories.value)
  } catch (error) {
    console.error('Error fetching food data:', error)
  }
})

const fetchCategories = () => {
  api.get('/client/categories').then((res) => {
    categories.value = res.data
  })
}

function categorizeFoods(foods) {
  // const categorized = [
  //   { name: 'Gà Rán', dsMon: [] },
  //   { name: 'Gà Nướng', dsMon: [] },
  //   { name: 'Giảm giá', dsMon: [] },
  //   { name: 'Mới', dsMon: [] },
  //   { name: 'Giá', dsMon: [] } 
  // ]
  const categorized = categories.value.map((item) => {
    return {
      name: item.name,
      gia: item.cost,
      dsMon: []
    }
  })

  foods.forEach(food => {
    food.categories.forEach(category => {
      console.log('ádâ', category);
      const categoryIndex = categorized.findIndex(c => c.name === category.name)
      if (categoryIndex !== -1) {
        categorized[categoryIndex].dsMon.push(food)
      }
    })
  })
  console.log('food', foods);
  return categorized
}

function handleAddToCart(dish) {
  addToCart(dish)
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: white;
}

.container-cartegoryaooetizer {
  background: white;
  width: 100%;
  padding: 1rem;
}

h1 {
  text-align: center;
  color: #4caf50;
  font-size: 50px;
  margin-bottom: 20px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.category-button {
  background-color: #e0f2f1;
  border: 2px solid #4caf50;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.category-button:hover,
.category-button.active {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.food-items {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  min-height: 290px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.card-menu {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 350px;
  transition: all 0.3s ease;
}

.card-menu img {
  width: 300px;
  height: 160px;
  object-fit: cover;
  /* Đảm bảo ảnh không bị méo và vẫn giữ tỷ lệ */
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.card-menu:hover img {
  transform: translateY(-6px);
}

.btn-wrapper {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.btn-order,
.btn-add {
  margin: 0.2rem;
  padding: 15px;
  border: none;
  border-radius: 4px;
  background: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 11px;
}

.gio-hang-icon {
  margin-top: 0.4rem;
}

.so-luong {
  background: red;
  color: white;
  padding: 0.1rem 0.4rem;
  border-radius: 50%;
}

.card-price {
  margin-top: 0.4rem;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 8px;
  font-size: 16px;
}

.new-price {
  color: red;
  font-weight: bold;
  font-size: 18px;
}
</style>
