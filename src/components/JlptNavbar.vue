<script setup>
    import { goto } from '/src/router.js'
    import { icons } from '/src/assets/icons/svg.js'
    const {setting} = defineProps(['setting'])
</script>

<template>
    <nav class="z-50 flex items-center p-3 shadow sticky top-0 bg-orange-400">
        <div class="cursor-pointer">
            <span @click="goto('/jlpt')" class="flex gap-1 items-baseline">
                <span class="text-3xl font-bold text-white">MoChi</span>
                <span class="text-2xl text-white">JLPT</span>
            </span>
        </div>
        <div v-if="setting !='false'" class="ms-auto flex gap-3 items-center">
            <ion-icon class="text-white cursor-pointer" name="settings-outline" size="large"></ion-icon>
        </div>
        
    </nav>
</template>
