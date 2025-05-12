<template>
  <div class="reset-password-container">
    <div class="reset-password-box">
      <form @submit.prevent="submitReset" class="form">
        <h2>Đặt lại mật khẩu</h2>

        <input v-model="email" type="email" placeholder="Email" required />

        <input v-model="otp" type="text" placeholder="Mã xác nhận OTP" required />

        <input v-model="password" type="password" placeholder="Mật khẩu mới" required minlength="6" />

        <input v-model="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" required minlength="6" />

        <button type="submit" class="btn-submit">Đặt lại mật khẩu</button>
        <div class="links-row-register">
        <router-link to="/login" class="small-link-register">Quay lại đăng nhập</router-link>
      </div>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '../../services/api'
  import Swal from 'sweetalert2'
  
  const email = ref('')
  const otp = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  const router = useRouter()
  
  function submitReset() {
    if (password.value !== confirmPassword.value) {
      Swal.fire('Mật khẩu không khớp!', '', 'warning')
      return
    }
  
    api.post('/client/reset-password', {
      email: email.value,
      otp: otp.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    })
    .then(() => {
      Swal.fire('Thành công!', 'Mật khẩu đã được đặt lại.', 'success')
        .then(() => router.push({ name: 'users-login' }))
    })
    .catch(err => {
      Swal.fire('Thất bại', err.response?.data?.message || 'Có lỗi xảy ra', 'error')
    })
  }
  </script>
<style setup>
.reset-password-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #143b36;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.reset-password-box {
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

/* Responsive */
@media (max-width: 450px) {
    .reset-password-box {
        padding: 25px 20px;
        max-width: 100%;
    }

    input {
        font-size: 14px;
    }

    .btn-submit {
        font-size: 16px;
    }
}

.links-row-register {
    text-align: center;
  
  }
  .small-link-register {
    color: #d69c52;
    text-decoration: none;
    cursor: pointer;
    font-size: 0.95rem;
    user-select: none;
    transition: color 0.3s ease;
  }
  
  .small-link-register:hover {
    color: #c58a3c;
    text-decoration: underline;
  }
</style>