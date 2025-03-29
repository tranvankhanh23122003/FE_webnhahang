<template>
    <div class="bg-blue-200 w-full h-screen flex flex-row justify-center items-center">
        <div class="w-[50vw] h-[50vh] bg-white rounded-[50px] flex flex-row">
            <div
                class="w-[50vw] h-full bg-blue-500 rounded-e-[500px] rounded-s-[50px] flex flex-col justify-center items-center gap-4 text-white">
                <h1 class="text-3xl font-bold ">Hello, Welcome!</h1>
                <p class="text-sm">Don't have an account?</p>
                <button class="rounded-xl bg-blue-500 h-12 w-32 border-2 border-white font-bold"
                    type="button">Register</button>
            </div>
            <div
                class="w-[50vw] h-full bg-white rounded-e-[50px] flex flex-col gap-4 justify-center items-center text-black">
                <h1 class="text-3xl font-bold">Login</h1>
                <div class="flex flex-col w-[15vw] h-[5vh]">
                    <div class="relative w-full h-full">
                        <input class="rounded-xl bg-gray-200 p-3 w-[15vw]" type="text" name="username" id="username"
                            placeholder="Phone Number">
                        <svg class="absolute top-3 right-2 w-6 h-6 text-gray-800" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div class="flex flex-col w-[15vw] h-[5vh]">
                    <div class="relative w-full h-full">
                        <input class="rounded-xl bg-gray-200 p-3 w-[15vw]" type="text" name="password" id="password"
                            placeholder="Password">
                        <svg class="absolute top-3 right-2 w-6 h-6 text-black" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <p class="text-sm">Forgot Password?</p>
                <button class="rounded-xl bg-blue-500 h-12 w-[15vw] text-white font-bold" type="button">Login</button>

            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
