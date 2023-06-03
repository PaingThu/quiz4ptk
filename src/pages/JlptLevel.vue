<script setup>
    import { useRoute } from 'vue-router'
    import { goto } from '/src/router.js'
    const category = [
        { id:'kotoba', title:'Vocabulary' },
        { id:'kanji', title:'Kanji' },
        { id:'grammar', title:'Grammar' },
    ]
    const route = useRoute()
    const level = route.params.level
    console.log("route ", route.params.category)
</script>
<template>
    <div class="container mx-auto py-5 px-3 md:px-5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <template v-for="(item, index) in category" :key="index">
                <div 
                    class="grid place-items-center cursor-pointer bg-blue-400 hover:bg-blue-500 rounded h-32 p-3"
                    @click="goto(`/jlpt/${level}/${item.id}`)"
                >
                    <span class="text-xl text-white text-center"> {{ item.title }} </span>
                </div>
            </template>
        </div>
    </div>
</template>