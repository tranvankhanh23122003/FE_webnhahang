<template>
  <div v-if="user.role === 'admin' || user.role === 'manager'"
    class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
    <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2 gap-2">
      <Search v-model="searchQuery" />
      <AddButton @add="goAdd" />
    </div>
    <div class="w-full h-full border-t border-gray-400 px-2 pt-2">
      <table class="w-full h-fit table-auto font-semibold text-2xl">
        <thead>
          <tr class="border-2 border-gray-300">
            <th>
              <div class="flex flex-row justify-center items-center gap-2">
                <Sort @sort="(key) => sortBy('name', key)" />
                <p class="text-start w-full">Tên món</p>
              </div>
            </th>
            <th>
              <div class="flex flex-row justify-center items-center gap-2">
                <Sort @sort="(direction) => sortBy('price', direction)" />
                <p>Giá</p>
              </div>
            </th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedItems" :key="index" class="border-2 border-gray-300">
            <td>
              <div class="h-full flex flex-row justify-start items-center">
                <div class="overflow-hidden flex flex-row justify-center items-center">
                  <img class="hover:cursor-pointer overflow-auto object-cover h-32 w-24 rounded-lg shadow-md border"
                    :src="item.image" alt="Ảnh món ăn" />
                  <div class="ps-5 flex flex-col gap-5">
                    <p class="hover:cursor-pointer">{{ item.name }}</p>
                    <div class="flex flex-row gap-2 items-center">
                      <SwitchButton :model-value="item.status" @toggle="() => toggleStatus(item)" />
                      <BestSellerSwitch :model-value="item.bestSeller" @toggle="() => toggleBestSeller(item)" />
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td class="text-center">{{ item.cost.toLocaleString() }} VNĐ</td>
            <td class="text-center">
              <div class="flex justify-center items-center h-full">
                <div class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                      d="M6 12h.01m6 0h.01m5.99 0h.01" />
                  </svg>
                  <div
                    class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                    <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetailFoods(item)">
                      Chi tiết
                    </p>
                    <p class="hover:bg-gray-500 text-start w-full h-full" @click="goEdit(item)">Chỉnh sửa</p>
                    <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDelete">Xoá</p>
                    <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="changePage" />
    </div>
  </div>
  <AccessDenied v-if="showToast" />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from "vue-router";
import Sort from "../../../components/Admin/SortButton.vue";
import Search from "../../../components/Admin/Search.vue";
import AddButton from "../../../components/Admin/AddButton.vue";
import Pagination from "../../../components/Admin/Pagination.vue";
import SwitchButton from "../../../components/Admin/SwitchButton.vue";
import ConfirmDelete from "../../../components/Admin/ConfirmDelete.vue";
import AccessDenied from '../../../components/Admin/AccessDenied.vue';
import axios from 'axios';
import BestSellerSwitch from '../../../components/Admin/BestSellerSwitch.vue';
import api from '../../../services/api';

const showConfirm = ref(false);
const router = useRouter();
const searchQuery = ref("");
const sortKey = ref(""); // 'name' hoặc 'qty'
const sortDirection = ref(""); // 'asc' | 'desc'
const itemsPerPage = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));
const allItems = ref([]);
const showToast = ref(false);

const user = ref({
  role: 'N/A',
});

onMounted(() => {
  fetchUserProfile();
  fetchFoods();
});

async function fetchUserProfile() {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.get('/admin/users/profile');
    user.value.role = response.data.data.role; // Only store the role
  } catch (error) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      router.push({ name: 'admin-login' });
    }
  }
}

const filteredItems = computed(() => {
  let result = [...allItems.value];

  if (searchQuery.value) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (sortKey.value && sortDirection.value) {
    result.sort((a, b) => {
      if (sortDirection.value === "asc") {
        return a[sortKey.value] > b[sortKey.value] ? 1 : -1;
      } else {
        return a[sortKey.value] < b[sortKey.value] ? 1 : -1;
      }
    });
  }

  return result;
});

const fetchFoods = async () => {
  try {
    const response = await axios.get("http:// 192.168.1.53:8888/api/admin/foods");

    if (Array.isArray(response.data)) {
      allItems.value = response.data;
    } else if (response.data && Array.isArray(response.data)) {
      allItems.value = response.data.data;
    } else {
      allItems.value = [];
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
};

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

async function toggleStatus(item) {
  if (user.value.role !== 'admin' && user.value.role !== 'manager') {
    alert("Bạn không có quyền thực hiện thao tác này.");
    return;
  }
  const newStatus = item.status === 1 ? 0 : 1;
  try {
    await axios.put(`http:// 192.168.1.53:8888/api/admin/foods/${item.id}`, {
      status: newStatus
    });
    item.status = newStatus;
  } catch (error) {
    console.error("Không thể cập nhật trạng thái:", error);
    alert("Cập nhật trạng thái thất bại.");
  }
}


async function toggleBestSeller(item) {
  if (user.value.role !== 'admin' && user.value.role !== 'manager') {
    alert("Bạn không có quyền thực hiện thao tác này.");
    return;
  }
  const newBestSeller = item.bestSeller === 1 ? 0 : 1;
  try {
    await axios.put(`http:// 192.168.1.53:8888/api/admin/foods/${item.id}`, {
      bestSeller: newBestSeller
    });
    item.bestSeller = newBestSeller;
  } catch (error) {
    console.error("Không thể cập nhật trạng thái best seller:", error);
    alert("Cập nhật trạng thái thất bại.");
  }
}


function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function sortBy(key, direction) {
  sortKey.value = key;
  sortDirection.value = direction;
}

function goAdd() {
  if (user.value.role !== 'admin' && user.value.role !== 'manager') {
    alert("Bạn không có quyền thực hiện thao tác này.");
    return;
  }
  router.push({ name: 'admin-add-foods' });
}

function goDetailFoods(item) {
  router.push({
    name: 'admin-detail-foods',
    params: {
      id: item.id,
    },
    query: {
      data: JSON.stringify(item)
    }
  });
}

function goEdit(item) {
  if (user.value.role !== 'admin' && user.value.role !== 'manager') {
    alert("Bạn không có quyền thực hiện thao tác này.");
    return;
  }
  router.push({
    name: 'admin-edit-foods',
    params: {
      id: item.id,
    },
  });
}

function goDelete() {
  if (user.value.role !== 'admin' && user.value.role !== 'manager') {
    alert("Bạn không có quyền thực hiện thao tác này.");
    return;
  }
  showConfirm.value = true;
}

function confirmDelete() {
  showConfirm.value = false;
  console.log('Đã xác nhận xoá món ăn');
  router.push({ name: 'admin-foods' });
}

function cancelDelete() {
  showConfirm.value = false;
}

watch(() => user.value.role, (newRole) => {
  if (newRole !== 'admin' && newRole !== 'manager') {
    showToast.value = true;

  }
});
</script>