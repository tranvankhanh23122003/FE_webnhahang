<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chi tiết bàn
            </div>
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex items-center gap-4">
                                <label class="w-32">Tên bàn:</label>
                                <input type="number" id="number" v-model="form.number"
                                    class="flex-1 border rounded px-4 py-2 text-lg no-spinner" @input="validateTable"
                                    placeholder="Nhập số bàn..." />
                            </div>

                            <div class="flex items-center gap-4">
                                <label class="w-32">Trạng thái:</label>
                                <select v-model="form.status" class="border rounded px-4 py-2 w-[200px]" id="status">
                                    <option value="1">Đang trống</option>
                                    <option value="2">Đang sử dụng</option>
                                    <option value="3">Đã đặt</option>
                                    <option value="0">Bị khoá</option>
                                </select>
                            </div>
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex text-white justify-center items-center flex-1 hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goSave">
                                    Lưu
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
import AccessDenied from '../../../components/Admin/AccessDenied.vue'

const router = useRouter()
const route = useRoute()

function validateTable(e) {
    let val = parseInt(e.target.value)
    if (val < 0) val = 0
    form.value.number = val
}

const form = ref({
    number: '',
    status: 1
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
    fetchUserProfile();
});

watch(() => user.value.role, (newRole) => {
    if (newRole !== 'admin' && newRole !== 'manager') {
        showToast.value = true;

    }
});

async function goSave() {
    try {
        await axios.post('http:// 192.168.1.53:8888/api/admin/tables/create', form.value)
        alert('Đã thêm bàn mới thành công!')
        router.push({ name: 'admin-tables' })
    } catch (error) {
        console.error('Lỗi thêm bàn:', error)
        alert('Không thể thêm bàn.')
    }
}

function goBack() {
    router.push({ name: 'admin-tables' })
}

</script>

<style scoped>
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>