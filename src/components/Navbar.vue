<script setup>
    import { goto } from '/src/router.js'
    import { icons } from '/src/assets/icons/svg.js'
</script>

<template>
    <nav class="flex items-center px-6 py-2 shadow sticky top-0 bg-white">
        <div class="cursor-pointer">
            <span @click="goto('/')" class="flex gap-3 items-center">
                <img src="/src/assets/img/q4k-logo-circle.png" alt="" class="w-20">
                <span class="text-lg md:text-3xl">Quiz for Kids</span>
            </span>
        </div>
        <div class="ms-auto flex gap-3 items-center">
            <span class="cursor-pointer hidden md:block" @click="goto('/')">Home</span>
            <span class="cursor-pointer flex items-center gap-2" @click="goto('profile')">
                <span class="rounded-full border border-gray-200 text-gray-300" v-html="icons.user"></span>
                Guest
            </span>
        </div>
        
    </nav>
</template>
