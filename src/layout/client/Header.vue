<template>
  <nav class="navbar">
    <div class="header">
      <ul class="menu">
        <a href="" class="logo">
          <img src="/imageicon/phefood.png" alt="">
        </a>
        <li>
          <router-link class="router-home" :to="{ name: 'users-home' }"><strong>HOME</strong></router-link>
        </li>
        <li class="servicefood">
          <!-- cach 1 -->
          <!-- <router-link class="router-introduce" to="/introduce" >INTRODUCE</router-link>  -->
          <!-- cach 2 -->
          <router-link class="router-introduce" :to="{ name: 'users-introduce' }">INTRODUCE</router-link>


        </li>
     
        <li class="servicefood">
          <a href="">SERVICE FOOD</a>
          <ul class="name-menu">
            <li>
              <div class="menu-row">
                <div class="menu-list">
                  <div class="row-menu">
                 
                    <div class="col-6" @mouseover="currentImage = '/imageicon/lauthai.png'">
                      <router-link :to="{name:'users-category'}">
                      <p class="title-header">Khai vị </p>
                      <ul class="List">
                        <li><a href=""><i class="fa-solid fa-circle-dollar-to-slot"></i> Spot</a></li>
                        <li><a href=""><i class="fa-solid fa-jet-fighter"></i> Margin vị akjddâddâda</a></li>
                        <li><a href="P2P.html"><i class="fa-solid fa-credit-card"></i> P2P</a></li>
                      </ul></router-link>
                   
                    </div>
              

                    <div class="col-6" @mouseover="currentImage = '/imageicon/bunbo.png'">
                      <p class="title-header">Món chính</p>
                      <ul  class="List">
                        <li><a href="botGiaoDich.html"><i class="fa-solid fa-robot"></i> Bot giao dịch</a></li>
                        <li><a href="saochepgiaodich.html"><i class="fa-solid fa-copy"></i> Sao chép giao dịch</a></li>
                        <li><a href=""><i class="fa-solid fa-lock"></i> Cơm gà </a></li>
                      </ul>
                    </div>
                  </div>

                  <div class="row-menu">
                    <div class="col-6" @mouseover="currentImage = '/imageicon/comga.png'">
                      <router-link :to="{name: 'users-category'}"></router-link>
                      <p class="title-header">Đồ uống</p>
                      <ul  class="List">
                        <li><a href="#"><i class="fa-solid fa-mug-hot"></i> Cà phêdddddd</a></li>
                        <li><a href="#"><i class="fa-solid fa-wine-glass"></i> Nước ép cam </a></li>
                        <li><a href="#"><i class="fa-solid fa-glass-water"></i> Nước ép thơm</a></li>
                      </ul>
                    </div>

                    <div class="col-6" @mouseover="currentImage = '/imageicon/lautuxuyen.png'">
                      <p class="title-header">Món tráng miệng</p>
                      <ul  class="List">
                        <li><a href="#"><i class="fa-solid fa-ice-cream"></i> Kem</a></li>
                        <li><a href="#"><i class="fa-solid fa-cake-candles"></i> Bánh ngọt</a></li>
                        <li><a href="#"><i class="fa-solid fa-cookie-bite"></i> Cookie</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="menu-image">
                  <img style="width: 250px;" :src="currentImage" alt="Ảnh món ăn" />
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li class="servicefood">
          <router-link :to="{ name: 'users-news' }">NEWS</router-link>
        </li>
        <li class="servicefood">
          <router-link to="/booking"> BOOKING TABLE</router-link>
        </li>
        <li class="servicefood">
          <router-link to="/contact"> CONTACT</router-link>
        </li>
        <div class="flex-1 justify-end flex me-10 items-center">
          <li>
            <div class="search-container" @click="handleClickOutside">
  <div :class="isSearch ? 'w-[200px] search-box' : 'w-[40px] search-box'" @click="handleOpenSearch">
    <input
      type="text"
      v-model="tuKhoa"
      @blur="handleBlur"
      placeholder="Tìm Món ..."
    />
    <div>
      <i class="fas fa-solid fa-magnifying-glass"></i>
    </div>
  </div>

  <!-- Hiển thị kết quả tìm kiếm -->
  <ul v-if="tuKhoa && monTimDuoc.length" class="result-box">
    <li v-for="mon in monTimDuoc" :key="mon.id">
      {{ mon.ten }}
    </li>
  </ul>

  <p v-else-if="tuKhoa">Không tìm thấy món nào.</p>
</div>


          </li>
          <li>
  <div class="cart-shopping">
    <router-link :to="{ name: 'users-shoppingCart' }">
      <i class="fa-solid fa-cart-shopping"></i>
      <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
    </router-link>
    
  </div>



</li>
<li>
    <div class="cart-user">
  <i v-if="!userEmail" class="fa-solid fa-user"></i>
  <span v-else class="user-email">{{ userEmail }}</span>

  <div class="user-info">
    <router-link v-if="!userEmail" :to="{ name: 'users-login' }">Đăng nhập</router-link>
    <button v-else @click="logout">Đăng xuất</button>
  </div>
</div>
</li>

          <li>
            <input type="checkbox" id="menu-toggle" hidden>

<label for="menu-toggle" class="menu-toggle">
  <i class="fa-solid fa-bars"></i>
</label>

<div class="user-menu">
  <div class="menu-header">
    <!-- Gói icon trong label để click vào sẽ đóng menu -->
    <label for="menu-toggle">
      <i class="fa-solid fa-bars"></i>
    </label>
    <h2>Menu</h2>
  </div>

  <router-link :to="{ name: 'users-home' }">
    <div class="menu-item">
      <i class="fa-solid fa-house"></i>
      <h2>Home</h2>
    </div>
  </router-link>

  <div class="menu-item">
    <i class="fa-solid fa-user"></i>
    <router-link :to="{ name: 'users-personalinformation' }">
      Account
    </router-link>
  </div>
  <div class="menu-item">
    <i class="fa-solid fa-ranking-star"></i>
    <router-link :to="{ name: 'users-rank' }">
      rank
    </router-link>
  </div>
<router-link :to="{name :'users-evaluation'}">
  <div class="menu-item">
    <i class="fa-solid fa-gear"></i>
    <h2>Rates</h2>
  </div>
</router-link>

  <router-link :to="{name:'History'}" class="menu-item">
  <i class="fa-solid fa-wrench"></i>
  <h2>History</h2>
</router-link>
<router-link :to="{name:'users-login'}" class="menu-item">
  <i class="fa-solid fa-right-to-bracket"></i>

  <h2>login</h2>
</router-link>
  <div class="menu-item" @click="handleLogout">
  <i class="fa-solid fa-right-from-bracket"></i>
  <h2>Log Out</h2>
</div>

</div>

          </li>
        </div>


      </ul>


    </div>
  </nav>
</template>
<script setup>
import { ref, watch } from 'vue';
import Swal from 'sweetalert2';
import '../../assets/css/Header.css'
import { cartCount } from '../../stores/cartStore';
import api from '../../services/api';
import { useRouter} from 'vue-router';
const currentImage = ref('/imageicon/food icon.png')
const isSearch = ref(false);
const tuKhoa = ref('');
const monTimDuoc = ref([]);
const router =useRouter();

// Mở ô tìm kiếm
const handleOpenSearch = () => {
  isSearch.value = true;
};

// Thu gọn ô tìm kiếm khi click ra ngoài
const handleClickOutside = (event) => {
  if (!event.target.closest('.search-box')) {
    isSearch.value = false;
  }
};

// Thu gọn khi mất focus
const handleBlur = () => {
  if (isSearch.value) {
    isSearch.value = false;
  }
};

// Theo dõi từ khóa và gọi API tìm kiếm
watch(tuKhoa, (newVal) => {
  if (!newVal.trim()) {
    monTimDuoc.value = [];
    return;
  }

  api.get(`/tim-mon?ten=${encodeURIComponent(newVal)}`)
    .then(response => {
      monTimDuoc.value = response.data.mons; // tuỳ theo cấu trúc dữ liệu trả về
    })
    .catch(error => {
      console.error('Lỗi tìm kiếm món:', error);
      monTimDuoc.value = [];
    });
});

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn muốn đăng xuất không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy'
  });

  if (result.isConfirmed) {
    try {
      const response = await api.post('/client/logout'); 

      if (response.data.message === 'Đăng xuất thành công') {
        Swal.fire({
          title: 'Đăng xuất thành công!',
          text: 'Bạn đã đăng xuất khỏi tài khoản.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        localStorage.removeItem('users-login');
        sessionStorage.removeItem('users-login'); 

        router.push('/login');
      }
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      Swal.fire({
        title: 'Chưa đăng nhập mà đòi đăng xuất má ?!',
        text: 'Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
};





</script>
<style scoped>
.List li:hover a {
  transform: scale(1.1); 
  transition: transform 0.2s ease; /* độ mượt */
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 30px;
  padding: 6px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  padding-left: 20px;
}

.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #333;
  transition: color 0.3s ease;
}

.search-box:hover i {
  color: #007bff;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px;
  transition: all 0.1s;
  cursor: pointer;
  color: #333;
  gap: 20px;
}

.menu-item:hover {
  background: #eee;
}

.menu-item i {
  text-align: center;
  width: 20px;
  font-size: 22px;
}

.menu-item span {
  font-weight: 500;
  margin-right: 20px;
}

.user-menu {
  position: fixed;
  top: 0;
  right: 0px;
  height: 100%;
  width: 260px;
  padding: 20px;
  background: white;
  display: flex;
  z-index: 1;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.3s;
  transform: translateX(100%);
}

.menu-header {
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccc;
  color: #333;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 15px;
  font-weight: bold;
}

#menu-toggle:checked ~ .user-menu {
  transform: translateX(0);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.cart-user {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.cart-user i,
.cart-user .user-email {
  font-size: 18px;
  color: #333;
  padding: 5px 10px;
}

/* Menu đăng nhập / đăng xuất */
.user-info {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: none;
  z-index: 999;
  white-space: nowrap;
}

/* Hiện menu khi hover vào .cart-user */
.cart-user:hover .user-info {
  display: block;
}

.user-info a,
.user-info button {
  display: block;
  color: #333;
  text-decoration: none;
  background: none;
  border: none;
  padding: 6px 0;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.user-info a:hover,
.user-info button:hover {
  color: #d69c52;
}

.servicefood > a {
  position: relative;
  display: inline-block;
  text-decoration: none;
}

.servicefood > a::after {
  content: "";
  position: absolute;
  bottom: -6px; 
  left: 50%;
  width: 0;
  height: 3px;   
  background-color: yellow;
  transition: width 0.3s ease, left 0.3s ease;
  transform: translateX(-50%);
  
}

.servicefood > a:hover::after {
  width: 100%;
  left: 50%;
}

</style>