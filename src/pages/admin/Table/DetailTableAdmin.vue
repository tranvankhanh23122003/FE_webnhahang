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
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Tên bàn:</p>
                                <p class="text-2xl flex-1 text-end">{{ "Bàn " + tableData.number }} </p>
                            </div>

                            <div class="flex flex-row w-full items-center px-5">
                                <p class="flex-1">Trạng thái:</p>
                                <p v-if="tableData.status === 1" class="bg-green-500 text-white text-end px-2">
                                    Đang trống
                                </p>
                                <p v-else-if="tableData.status === 2" class="bg-yellow-500 text-white px-2 text-end">
                                    Đang sử dụng
                                </p>
                                <p v-else-if="tableData.status === 3" class="bg-red-500 text-white px-2 text-end">
                                    Đã được đặt
                                </p>
                                <p v-else class="bg-red-500 text-white px-2 text-end">
                                    Bị khoá
                                </p>
                            </div>
                            <div v-if="tableData.status === 1 || tableData.status === 2"
                                class="flex flex-col w-full h-fit items-start px-5 mt-5">
                                <p class="flex">Mã bàn:</p>
                                <div class="flex flex-1 justify-center w-full">
                                    <img
                                        :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`" />
                                </div>
                            </div>
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex text-white justify-center items-center flex-1 hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goEdit(tableData)">
                                    Chỉnh sửa
                                </div>
                                <div class="bg-red-500 rounded-lg p-2 flex text-white justify-center items-center flex-1 hover:text-black hover:cursor-pointer hover:bg-red-300"
                                    @click="goDelete">
                                    Xoá
                                </div>
                                <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />

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
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'
import AccessDenied from '../../../components/Admin/AccessDenied.vue'

const router = useRouter()
const route = useRoute()
const tableData = route.query.data ? JSON.parse(route.query.data) : null
const showConfirm = ref(false)


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
// Tạo URL QR
const tableId = tableData.id
const baseUrl = window.location.origin
const qrUrl = `http:// 192.168.1.53:3000/scan?id=${tableId}`
// const qrUrl = `${baseUrl}/scan?id=${tableId}`

function goBack() {
    router.push({ name: 'admin-tables' })
}

function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http:// 192.168.1.53:8888/api/admin/tables/${tableData.id}`)
        alert('Đã xoá bàn thành công!')
        router.push({ name: 'admin-tables' })
    } catch (error) {
        console.error('Lỗi khi xoá bàn:', error)
        alert('Không thể xoá bàn.')
    }
}

function cancelDelete() {
    showConfirm.value = false
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-tables',
        params: {
            id: item.id,
        },
        query: {
            data: JSON.stringify(item)
        }
    })
}
</script>
