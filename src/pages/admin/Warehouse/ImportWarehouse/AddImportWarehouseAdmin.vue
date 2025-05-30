<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex flex-row w-full items-center px-5">
                                <div class="flex w-full items-center gap-4">
                                    <p class="flex-1">Tên thành phần:</p>
                                    <select v-model="form.id_ingredient"
                                        class="flex-1 border rounded px-4 py-2 w-[200px]">
                                        <option v-for="ingredients in allItems" :key="ingredients.id"
                                            :value="ingredients.id">
                                            {{ ingredients.name_ingredient }}
                                        </option>
                                    </select>

                                </div>
                            </div>
                            <!-- Số lượng nhập -->
                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Số lượng nhập:</p>
                                <input v-model="form.quantity" type="number" min="0"
                                    class="border rounded px-4 py-2 w-[200px]" />
                            </div>

                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Giá tiền:</p>
                                <input v-model="form.price" type="number" min="0"
                                    class="border rounded px-4 py-2 w-[200px]" />
                            </div>

                            <!-- Ngày nhập -->
                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Ngày nhập:</p>
                                <input v-model="form.stock_in_date" type="date"
                                    class="border rounded px-4 py-2 w-[200px]" />
                            </div>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goSave" :class="{ 'opacity-50 cursor-not-allowed': isSaving }">
                                    <span v-if="isSaving">Đang lưu...</span>
                                    <span v-else>Lưu</span>
                                </div>

                                <div class=" rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                    @click="goBack">
                                    Trở lại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AccessDenied v-if="showToast" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch, reactive } from "vue";
import axios from 'axios'
import AccessDenied from '../../../../components/Admin/AccessDenied.vue'
const allItems = ref([])

const router = useRouter()
const route = useRoute()

function goBack() {
    router.push({ name: 'import-warehouse-admin' })
}

const form = ref({
    id_ingredient: '',
    quantity: '',
    price: '',
    stock_in_date: ''
})

const user = ref({
    role: 'N/A',
});

const showToast = ref(false);

async function fetchUserProfile() {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get('http:// 192.168.1.53:8888/api/admin/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

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

onMounted(async () => {
    await fetchIngredient();
    fetchUserProfile();
});

watch(() => user.value.role, (newRole) => {
    if (newRole !== 'admin' && newRole !== 'manager') {
        showToast.value = true;
    }
});

const isSaving = ref(false)

async function goSave() {
    if (!form.value.id_ingredient || !form.value.quantity || !form.value.stock_in_date) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    isSaving.value = true;
    try {
        const response = await axios.post('http:// 192.168.1.53:8888/api/admin/warehouse-invoices/create', form.value);
        if (response.data.status === 1) {
            alert('Đã thêm mới thành công!');
            router.push({ name: 'import-warehouse-admin' });
        } else {
            alert('Thêm thất bại: ' + (response.data.message || 'Lỗi không xác định.'));
        }
    } catch (error) {
        console.error('Lỗi khi thêm:', error);
        alert('Đã xảy ra lỗi khi thêm. Vui lòng kiểm tra lại hoặc thử lại sau.');
    } finally {
        isSaving.value = false;
    }
    console.log('Dữ liệu gửi:', form.value)
}

const fetchIngredient = async () => {
    try {
        const response = await axios.get("http:// 192.168.1.53:8888/api/admin/ingredients");
        allItems.value = response.data.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}
</script>
