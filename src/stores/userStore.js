// stores/userStore.js
import { reactive } from 'vue';

const user = reactive({
  FullName: '',
  birth: '',
  phoneNumber: '',
  mail: '',
  password: '',
  image: '',
  point: 0,
  id_rank: 1,
  isActive: false,
});

const setUser = (userData) => {
  user.FullName = userData.FullName;
  user.birth = userData.birth;
  user.phoneNumber = userData.phoneNumber;
  user.mail = userData.mail;
  user.password = userData.password;
  user.image = userData.image;
  user.point = userData.point;
  user.id_rank = userData.id_rank;
  user.isActive = userData.isActive;

  localStorage.setItem('users-login', JSON.stringify(userData)); // Lưu vào localStorage
};

const loadUserFromLocalStorage = () => {
  const data = localStorage.getItem('users-login');
  if (data) {
    const parsedData = JSON.parse(data);
    setUser(parsedData); // Load từ localStorage
  }
};

export { user, setUser, loadUserFromLocalStorage };
