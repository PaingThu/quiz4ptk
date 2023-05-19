<script setup>
    import { goto } from '/src/router.js'
</script>

<template>
    <!-- <Navbar /> -->
    <div class="flex flex-col gap-3 h-screen bg-blue-400">
        <div class="flex flex-col items-center py-11 gap-4 bg-white">
            <img src="/src/assets/img/q4k-logo-circle.png" alt="" class="w-1/2 md:w-80 animate-pulse">
            <div class="flex flex-col">
                <span class="md:text-4xl text-gray-500">Play is our brain's favourite way of learning.</span>
                <small class="ms-auto font-mono text-gray-400">- Diane Ackerman -</small>
            </div>
        </div>
        <div class="container mx-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-11 py-11 px-5 md:px-20">
            <div class="p-2 md:p-4 place-items-center grid gap-2 bg-white cursor-pointer shadow-lg hover:shadow" @click="goto('myanmar')">
                <img src="/src/assets/icons/flags/mm.svg" alt="" class="w-full border border-slate-200">
                <span class="text-md md:text-3xl hover:animate-bounce text-yellow-500">က ခ ဂ ဃ င</span>
            </div>
            <div class="p-2 md:p-4 place-items-center grid gap-2 bg-white cursor-pointer shadow-lg hover:shadow" @click="goto('english')">
                <img src="/src/assets/icons/flags/gb.svg" alt="" class="w-full border border-slate-200">
                <span class="text-md md:text-3xl hover:animate-bounce text-blue-500">A B C D E</span>
            </div>
            <div class="p-2 md:p-4 place-items-center grid gap-2 bg-white cursor-pointer shadow-lg hover:shadow" @click="goto('japanese')">
                <img src="/src/assets/icons/flags/jp.svg" alt="" class="w-full border border-slate-200">
                <span class="text-md md:text-3xl hover:animate-bounce text-red-500">あ い う え お</span>
            </div>
        </div>
    </div>
</template>