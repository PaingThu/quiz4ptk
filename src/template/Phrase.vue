<script setup>
    import { onMounted, reactive } from 'vue'
    import { goto } from '/src/router.js'
    import { api } from '/src/http-common.js'
    const categoryInfo = reactive({})
    onMounted(async () => {
        const retData = await(api.get("phrase/jp/categories.json"))
        categoryInfo.list = retData.data
    })
</script>

<template>
    <div class="container mx-auto py-5 px-3 md:px-5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <template v-for="(item, category) in categoryInfo.list" :key="category">
                <div 
                    class="grid place-items-center cursor-pointer bg-blue-400 hover:bg-blue-500 rounded h-32 p-3"
                    @click="goto(`/phrase/${item.id}`)"
                >
                    <span class="text-xl text-white text-center"> {{ item.label }} </span>
                </div>
            </template>
        </div>
       
    </div>
</template>