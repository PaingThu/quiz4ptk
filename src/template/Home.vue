<script setup>
    import Navbar from '/src/components/Navbar.vue'
    import { goto } from '/src/router.js'
</script>

<template>
    <Navbar />
    <div class="container mx-auto h-screen p-5">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="p-4 place-items-center grid gap-2 cursor-pointer shadow-lg hover:shadow" @click="goto('myanmar')">
                <img src="/src/assets/icons/flags/mm.svg" alt="" class="w-full border border-slate-200">
                <span class="text-3xl lg:text-6xl text-yellow-500">က ခ ဂ ဃ င</span>
            </div>
            <div class="p-4 place-items-center grid gap-2 cursor-pointer shadow-lg hover:shadow" @click="goto('english')">
                <img src="/src/assets/icons/flags/gb.svg" alt="" class="w-full border border-slate-200">
                <span class="text-3xl lg:text-6xl text-blue-500">A B C D E</span>
            </div>
            <div class="p-4 place-items-center grid gap-2 cursor-pointer shadow-lg hover:shadow" @click="goto('japanese')">
                <img src="/src/assets/icons/flags/jp.svg" alt="" class="w-full border border-slate-200">
                <span class="text-3xl lg:text-6xl text-red-500">あ い う え お</span>
            </div>
        </div>
    </div>
</template>