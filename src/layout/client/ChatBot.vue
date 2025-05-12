<template>
    <div class="fixed right-10 bottom-32 h-16 w-16 bg-blue-500 rounded-full flex justify-center items-center">
        <!-- ICON mở chat -->
        <img @click="isOpen = true" class="rounded-full hover:cursor-pointer w-full h-full"
            src="/imageicon/bot icon.png" alt="bot icon">

        <!-- Hộp chat -->
        <div v-if="isOpen"
            class="fixed right-28 rounded-xl bottom-10 h-[500px] w-[400px] bg-white border flex flex-col">
            
            <!-- Header -->
            <div class="w-full border h-20 flex flex-row bg-blue-400 rounded-t-xl">
                <div class="flex-[5] flex flex-row items-center px-2 gap-2">
                    <div class="w-16 h-16 rounded-full bg-white overflow-hidden flex justify-center items-center">
                        <img class="w-full h-full" src="/imageicon/bot icon.png" alt="bot icon">
                    </div>
                    <p class="text-white font-semibold text-xl">Chat với AI</p>
                </div>
                <!-- ICON đóng chat -->
                <div class="flex flex-1 justify-center items-center">
                    <svg @click="isOpen = false" class="w-8 h-8 text-white hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                </div>
            </div>

            <!-- Nội dung chat -->
            <div class="flex-1 overflow-y-auto p-2 space-y-2">
                <div v-for="(msg, index) in messages" :key="index" :class="msg.sender === 'user' ? 'text-right' : 'text-left'">
                    <div
                        :class="msg.sender === 'user' ? 'bg-blue-200 text-black inline-block p-2 rounded-xl' : 'bg-gray-200 text-black inline-block p-2 rounded-xl'">
                        {{ msg.text }}
                    </div>
                </div>
            </div>

            <!-- Nhập tin nhắn -->
            <div class="h-auto w-full border-t rounded-b-xl flex flex-row justify-start items-center p-2 bg-white">
                <textarea v-model="message" ref="textareaRef" rows="1" placeholder="Nhập tin nhắn..."
                    class="resize-none overflow-hidden w-full ps-2 focus:outline-none" @input="autoResize"></textarea>
                <div @click="sendMessage"
                    class="h-[50px] w-[50px] flex justify-center items-center hover:cursor-pointer">
                    <svg class="w-6 h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            d="M14.502 7.046h-2.5v-.928a2.122 2.122 0 0 0-1.199-1.954 1.827 1.827 0 0 0-1.984.311L3.71 8.965a2.2 2.2 0 0 0 0 3.24L8.82 16.7a1.829 1.829 0 0 0 1.985.31 2.121 2.121 0 0 0 1.199-1.959v-.928h1a2.025 2.025 0 0 1 1.999 2.047V19a1 1 0 0 0 1.275.961 6.59 6.59 0 0 0 4.662-7.22 6.593 6.593 0 0 0-6.437-5.695Z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import api from '../../services/api'

const message = ref('')
const messages = ref([]) // Lưu lịch sử chat
const textareaRef = ref(null)
const isOpen = ref(false)

const autoResize = () => {
    const textarea = textareaRef.value
    if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight + 'px'
    }
}

const sendMessage = () => {
    console.log(message.value); 

    if (!message.value.trim()) return

    messages.value.push({ sender: 'user', text: message.value })

    api.post('/chat/send', { message: message.value })
        .then((res) => {
            const reply = res.data.reply || 'Không có phản hồi từ AI.'
            messages.value.push({ sender: 'bot', text: reply })
        })
        .catch(() => {
            messages.value.push({ sender: 'bot', text: 'Lỗi kết nối đến API.' })
        })

    message.value = ''
    autoResize()
}

onMounted(() => {
    autoResize()
})
</script>

