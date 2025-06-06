<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2 gap-2">
            <Search v-model="searchQuery" />
            <AddButton @add="goAdd" />
        </div>
        <div class="w-full h-full border-t border-gray-400 px-2 pt-2">
            <table class="w-full h-fit table-auto font-semibold text-2xl ">
                <thead>
                    <tr class="border-2 border-gray-300">
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <SortButton @sort="direction => sortBy('name', direction)" />
                                <p class="text-start w-full">Tên loại</p>
                            </div>
                        </th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedItems" :key="index" class="border-2 border-gray-300">
                        <td>
                            <div class="h-full flex flex-row justify-start items-center">
                                <div class="flex flex-row justify-center items-center h-20">
                                    <div class="ps-5 flex flex-col gap-1">
                                        <p class="hover:cursor-pointer">{{ item.name }}</p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <SwitchButton :model-value="item.status"
                                                @toggle="() => toggleStatus(item)" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">
                            <div class="flex justify-center items-center h-full">
                                <div igheden
                                    class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                            d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                    </svg>
                                    <div
                                        class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetail(item)">
                                            Chi tiết</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goEdit(item)">
                                            Chỉnh sửa
                                        </p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDelete(item)">
                                            Xoá</p>
                                        <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete"
                                            @cancel="cancelDelete" />
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
import { ref, onMounted, computed, watch, reactive } from "vue";
import axios from 'axios'
import { useRouter } from 'vue-router'
import Search from '../../../components/Admin/Search.vue'
import AddButton from '../../../components/Admin/AddButton.vue'
import SortButton from '../../../components/Admin/SortButton.vue'
import Pagination from '../../../components/Admin/Pagination.vue'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'
import SwitchButton from '../../../components/Admin/SwitchButton.vue'
import AccessDenied from '../../../components/Admin/AccessDenied.vue'

const router = useRouter()
const searchQuery = ref('')
const sortKey = ref('')
const sortDirection = ref('')
const showConfirm = ref(false)
const allItems = ref([])
const itemToDelete = ref(null)
const itemsPerPage = 5
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.value.slice(start, end)
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
    await fetchCategory();
    fetchUserProfile();
});

watch(() => user.value.role, (newRole) => {
    if (newRole !== 'admin' && newRole !== 'manager') {
        showToast.value = true;
    }
});

const fetchCategory = async () => {
    try {
        const response = await axios.get("http:// 192.168.1.53:8888/api/admin/categories");
        allItems.value = response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}

function goDelete(item) {
    itemToDelete.value = item
    showConfirm.value = true
}

async function toggleStatus(item) {
    const newStatus = item.status === 1 ? 0 : 1
    try {
        await axios.put(`http:// 192.168.1.53:8888/api/admin/categories/${item.id}`, {
            ...item,
            status: newStatus
        })
        item.status = newStatus
    } catch (error) {
        console.error("Không thể cập nhật trạng thái:", error)
        alert("Cập nhật trạng thái thất bại.")
    }
}


async function confirmDelete() {
    if (!itemToDelete.value || !itemToDelete.value.id) {
        console.error('Không có item hoặc ID để xoá')
        showConfirm.value = false
        return
    }

    try {
        await axios.delete(`http:// 192.168.1.53:8888/api/admin/categories/${itemToDelete.value.id}`)
        alert('Đã xoá loại thành công!')
        allItems.value = allItems.value.filter(item => item.id !== itemToDelete.value.id)
        itemToDelete.value = null
        showConfirm.value = false
    } catch (error) {
        console.error('Lỗi khi xoá loại:', error)
        alert('Không thể xoá loại.')
        showConfirm.value = false
    }
}

function cancelDelete() {
    showConfirm.value = false
    itemToDelete.value = null
}

function sortBy(key, direction) {
    sortKey.value = key
    sortDirection.value = direction
}

const filteredItems = computed(() => {
    let result = [...allItems.value]

    if (searchQuery.value) {
        result = result.filter(item =>
            item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    }

    if (sortKey.value && sortDirection.value) {
        result.sort((a, b) => {
            if (sortDirection.value === 'asc') {
                return a[sortKey.value] > b[sortKey.value] ? 1 : -1
            } else {
                return a[sortKey.value] < b[sortKey.value] ? 1 : -1
            }
        })
    }

    return result
})

function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

function goDetail(item) {
    router.push({
        name: 'admin-detail-categories',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    })
}

function goAdd() {
    router.push({ name: 'admin-add-categories' })
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-categories',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    })
}
</script>