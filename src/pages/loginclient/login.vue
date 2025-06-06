<template>
  <div class="auth-container">
    <div class="back-to-home" @click="goHome">
      ← Quay lại màn hình chính
    </div>
    <div class="auth-box">
      <!-- Form đăng nhập -->
      <form @submit.prevent="login" class="form" novalidate>
        <h2>Đăng nhập vào tài khoản của bạn</h2>

        <label for="login-email" class="sr-only">Email</label>
        <input id="login-email" type="email" v-model="loginEmail" placeholder="Email" required
          autocomplete="username" />

        <label for="login-password" class="sr-only">Mật khẩu</label>
        <input id="login-password" type="password" v-model="loginPassword" placeholder="Mật khẩu" required
          autocomplete="current-password" minlength="6" />

        <div class="links-row">
          <a href="#" @click.prevent="forgotPassword" class="small-link">Quên mật khẩu?</a>
          <span> | </span>
          <router-link to="/register" class="small-link">Đăng ký</router-link>
        </div>

        <button type="submit" class="btn-submit">Đăng nhập</button>

      
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'
import Swal from 'sweetalert2'
const router = useRouter()
const loginEmail = ref('')
const loginPassword = ref('')

const goHome = () => {
  router.push({ name: 'users-home' })
}

function login() {
  api.post('/client/login', {
    email: loginEmail.value,
    password: loginPassword.value
  })
    .then((response) => {
      console.log('ID khách hàng:', response.data.id); //
      Swal.fire({
        title: 'Đăng nhập thành công!',
        icon: 'success',
        text: 'Chào mừng bạn đã quay lại!',
        confirmButtonText: 'Tiếp tục'
      }).then(() => {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('customer_email', loginEmail.value);
        const customer = response.data.customer;
        localStorage.setItem('customer_id', customer.id);
        localStorage.setItem('customer_phoneNumber', customer.phoneNumber);
        localStorage.setItem('customer_fullName', customer.FullName);
        localStorage.setItem('customer_birth', customer.birth);
        localStorage.setItem('customer_image', customer.image);
        localStorage.setItem('customer_point', customer.point);
        localStorage.setItem('customer_password', loginPassword.value);
        localStorage.setItem('customer_nameRank', customer.rank.nameRank);
        localStorage.setItem('customer_imageRank', customer.rank.image);
        localStorage.setItem('customer_isActive', customer.isActive);
        localStorage.setItem('customer_created_at', customer.created_at);
        localStorage.setItem('customer_updated_at', customer.updated_at);

        router.push({ name: 'users-home' });
      });
    })
    .catch((error) => {
      console.error('Lỗi đăng nhập:', error.response?.data || error.message);
      Swal.fire({
        title: 'Đăng nhập thất bại!',
        icon: 'error',
        text: 'Vui lòng kiểm tra lại thông tin đăng nhập của bạn!',
        confirmButtonText: 'Thử lại'
      });
    });
}

function forgotPassword() {
  if (!loginEmail.value) {
    Swal.fire('Vui lòng nhập email trước!', '', 'warning')
    return
  }

  api.post('/client/forgot-password', { email: loginEmail.value })
    .then((res) => {
      console.log('API response:', res)
      Swal.fire('Thành công!', res.data.message, 'success')
        .then(() => {
          router.push({ name: 'reset-password', query: { email: loginEmail.value } })
        })
    })
    .catch((err) => {
      console.error('Lỗi API:', err)
      Swal.fire('Lỗi!', err.response?.data?.message || 'Có lỗi xảy ra.', 'error')
    })
}


</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #143b36;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-box {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
  width: 100%;
  max-width: 400px;
  padding: 30px 40px;
  box-sizing: border-box;
  border: 1.5px solid #2e6d5a;
}

.form {
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 20px;
  color: #e6f0f0;
  text-align: center;
  font-weight: 700;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
}

input {
  padding: 12px 15px;
  margin-bottom: 18px;
  border: 1.5px solid #2e6d5a;
  border-radius: 6px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.15);
  color: #e6f0f0;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input::placeholder {
  color: #b9d5cf;
}

input:focus {
  outline: none;
  border-color: #d69c52;
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 8px rgba(214, 156, 82, 0.7);
  color: #fff;
}

.links-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #e6f0f0;
  user-select: none;
}

.links-row span {
  color: #e6f0f0;
}

.small-link {
  color: #d69c52;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.small-link:hover {
  color: #c58a3c;
  text-decoration: underline;
}

.btn-submit {
  background-color: #d69c52;
  color: #143b36;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
  box-shadow: 0 3px 6px #a37b44;
  margin-bottom: 25px;
}

.btn-submit:hover {
  background-color: #c58a3c;
  box-shadow: 0 5px 12px #a37b44;
}

.alt-login {
  text-align: center;
  color: #e6f0f0;
  user-select: none;
}

.alt-login p {
  margin-bottom: 10px;
  font-weight: 600;
}

.icon-row {
  display: flex;
  justify-content: center;
  gap: 25px;
}

.icon-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 450px) {
  .auth-box {
    padding: 25px 20px;
    max-width: 100%;
  }

  input {
    font-size: 14px;
  }

  .btn-submit {
    font-size: 16px;
  }

  .alt-login p {
    font-size: 0.9rem;
  }

  .links-row {
    font-size: 0.85rem;
  }
}

.back-to-home {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #d69c52;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: color 0.3s ease;
}

.back-to-home:hover {
  color: #c58a3c;
  text-decoration: underline;
}
</style>