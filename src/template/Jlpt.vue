<script setup>
    import { goto } from '/src/router.js'
    const level = [
        { id:'n5', title:'N5' },
        { id:'n4', title:'N4' },
        { id:'n3', title:'N3' },
        { id:'n2', title:'N2' },
        { id:'n1', title:'N1' },
    ]
</script>
<template>
    <div class="container mx-auto py-5 px-3 md:px-5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <template v-for="(item, index) in level" :key="index">
                <div 
                    class="grid place-items-center cursor-pointer bg-blue-400 hover:bg-blue-500 rounded h-32 p-3"
                    @click="goto(`/jlpt/${item.id}`)"
                >
                    <span class="text-xl text-white text-center"> {{ item.title }} </span>
                </div>
            </template>
        </div>
    </div>
</template>