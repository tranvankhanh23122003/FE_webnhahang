<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="w-[calc(70vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2 text-lg ">
        <div class="w-full h-[50vh] border-t border-black">
            <div class="w-full flex justify-end gap-2 p-2">
                <Search v-model="searchQuery" />
                <AddButton @add="goAdd" />
            </div>
            <div class="w-full">
                <table class="w-full h-fit table-auto font-semibold text-2xl">
                    <thead>
                        <tr class="border-2 border-gray-300">
                            <th>
                                <div class="flex flex-row justify-center items-center gap-2">
                                    <SortButton @sort="(key) => sortBy('name', key)" />
                                    <p class="text-start w-full">Tên</p>
                                </div>
                            </th>
                            <th>
                                <div class="flex flex-row justify-center items-center gap-2">
                                    <SortButton @sort="(key) => sortBy('name', key)" />
                                    <p class="text-start w-full">Đơn vị</p>
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
                                            :src="item?.image" alt="Ảnh nhân viên" />
                                        <div class="ps-5 flex flex-col gap-5">
                                            <p class="hover:cursor-pointer">{{ item?.name_ingredient }}</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-center">
                                <div class="flex flex-row justify-center">
                                    <p>{{ item?.unit }}</p>
                                </div>
                            </td>
                            <td class="text-center">
                                <div class="flex justify-center items-center h-full">
                                    <div
                                        class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                                d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                        </svg>
                                        <div
                                            class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                            <p class="hover:bg-gray-500 text-start w-full h-full"
                                                @click="goDetail(item)">
                                                Chi tiết
                                            </p>
                                            <p class="hover:bg-gray-500 text-start w-full h-full" @click="goEdit(item)">
                                                Chỉnh sửa</p>
                                            <p class="hover:bg-gray-500 text-start w-full h-full"
                                                @click="goDelete(item)">Xoá
                                            </p>
                                            <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete"
                                                @cancel="cancelDelete" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
                <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="changePage" />
            </div>
        </div>
    </div>
    <AccessDenied v-if="showToast" />
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from "vue";
import { useRouter } from "vue-router";
import ConfirmDelete from "../../../../components/Admin/ConfirmDelete.vue";
import SortButton from "../../../../components/Admin/SortButton.vue";
import Search from "../../../../components/Admin/Search.vue";
import AddButton from "../../../../components/Admin/AddButton.vue";
import Pagination from "../../../../components/Admin/Pagination.vue";
import axios from "axios";
import AccessDenied from "../../../../components/Admin/AccessDenied.vue";

const router = useRouter();
const searchQuery = ref("");
const sortKey = ref(""); // 'name_ingredient' hoặc 'quantity'
const sortDirection = ref(""); // 'asc' | 'desc'
const itemsPerPage = 4;
const currentPage = ref(1);
const allItems = ref([]);
const showConfirm = ref(false)
const itemToDelete = ref(null)

const filteredItems = computed(() => {
    let result = [...allItems.value];

    if (searchQuery.value) {
        result = result.filter((item) =>
            item.name_ingredient.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    if (sortKey.value && sortDirection.value) {
        result.sort((a, b) => {
            const aValue = sortKey.value === 'name_ingredient' ? a.name_ingredient : a[sortKey.value];
            const bValue = sortKey.value === 'name_ingredient' ? b.name_ingredient : b[sortKey.value];

            if (sortDirection.value === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }

    return result;
});

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    console.log('paginatedItems', filteredItems.value.slice(start, end));
    return filteredItems.value.slice(start, end);
});

async function fetchWarehouse() {
    try {
        const response = await axios.get("http://192.168.1.53:8888/api/admin/ingredients");
        if (response.data.status === 1) {
            allItems.value = response.data.data; // đúng là response.data.data
        } else {
            console.error("Lỗi lấy dữ liệu: Trạng thái không hợp lệ");
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}

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
    await fetchWarehouse();
    fetchUserProfile();
});

watch(() => user.value.role, (newRole) => {
    if (newRole !== 'admin' && newRole !== 'manager') {
        showToast.value = true;
    }
});

function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

function sortBy(key, direction) {
    if (key === 'name') {
        sortKey.value = 'name_ingredient';
    } else {
        sortKey.value = key;
    }
    sortDirection.value = direction;
}

function goAdd() {
    router.push({ name: 'add-ingredient-warehouse-admin' });
}

function goDetail(item) {
    router.push({
        name: 'detail-ingredient-warehouse-admin',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    });
}

function goEdit(item) {
    router.push({
        name: 'edit-ingredient-warehouse-admin',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    });
}

function goDelete(item) {
    itemToDelete.value = item
    showConfirm.value = true
}

async function confirmDelete() {
    if (!itemToDelete.value || !itemToDelete.value.id) {
        console.error('Không có item hoặc ID để xoá')
        showConfirm.value = false
        return
    }

    try {
        await axios.delete(`http:// 192.168.1.53:8888/api/admin/ingredients/delete/${itemToDelete.value.id}`)
        alert('Đã xoá thành công!')
        allItems.value = allItems.value.filter(item => item.id !== itemToDelete.value.id)
        itemToDelete.value = null
        showConfirm.value = false
    } catch (error) {
        console.error('Lỗi khi xoá:', error)
        alert('Không thể xoá.')
        showConfirm.value = false
    }
}

function cancelDelete() {
    showConfirm.value = false
    itemToDelete.value = null
}

</script>
