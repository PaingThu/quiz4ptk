<script setup>
    import { goto } from '/src/router.js'
    import { icons } from '/src/assets/icons/svg.js'
</script>

<template>
    <nav class="flex items-center p-6 shadow sticky top-0 bg-white">
        <div class="cursor-pointer">
            <span @click="goto('/')">
                Quiz4Kids
            </span>
        </div>
        <div class="ms-auto flex gap-3 items-center">
            <span class="cursor-pointer" @click="goto('/')">Home</span>
            <span class="cursor-pointer flex items-center gap-2" @click="goto('profile')">
                <span class="rounded-full border border-gray-200 text-gray-300" v-html="icons.user"></span>
                Guest
            </span>
        </div>
        
    </nav>
</template>
