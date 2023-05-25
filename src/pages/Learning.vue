<script setup>
    import { reactive, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { goto } from '/src/router.js'
    import { api } from '/src/http-common.js'
    import { textToSpeech } from '/src/functions.js'

    

    const route = useRoute()
    const category = route.params.id
    const phrase = reactive({
        list: [],
        title: "",
        current: 0
    })

    onMounted(async () => {
        const retData = await(api.get(`phrase/jp/${category}.json`))
        phrase.list = retData.data.list
        phrase.title = retData.data.title
    })


</script>

<template>
    <div class="container mx-auto p-5 md:py-10">
        <div class="flex flex-col gap-5">
            <div class="flex items-center gap-5">
                <span class="cursor-pointer" @click="goto('/phrase')">
                    <ion-icon name="home" size="large"></ion-icon>
                </span>
                >
                <span class="text-xl">{{ phrase.title }}</span>
            </div>
            <div v-if="phrase.list.length > 0" class="relative">
                <div class="flex flex-col gap-3 p-3 md:p-5 rounded w-full items-center bg-blue-400" >
                    <div class="flex flex-col items-center gap-2">
                        <img src="/src/assets/icons/flags/mm.svg" alt="" class="w-10 border border-slate-200">
                        <span>{{ phrase.list[phrase.current].mm }}</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <img src="/src/assets/icons/flags/jp.svg" alt="" class="w-10 border border-slate-200">
                        <span>{{ phrase.list[phrase.current].jp }}</span>
                    </div>
                    <div 
                        class="flex flex-col items-center gap-2 bg-white w-1/2 min-w-fit mix-w-full shadow p-3 md:p-5 rounded"
                        @click="textToSpeech(phrase.list[phrase.current].jp)"
                    >
                        <span class="cursor-pointer flex mb-3 items-center shadow-lg p-3 hover:shadow-sm"><ion-icon class="text-3xl" name="volume-high-outline"></ion-icon></span>
                        <span class="text-xl text-orange-400">{{ phrase.list[phrase.current].mmji }}</span>
                        <span class="text-lg text-orange-400">{{ phrase.list[phrase.current].romaji }}</span>
                    </div>
                </div>
                <span 
                    v-if="phrase.current > 0"
                    class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    @click="phrase.current--"
                >
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-400 dark:bg-gray-800/30 group-hover:bg-orange-500 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
                        <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </span>
                <span 
                    v-if="phrase.current < phrase.list.length-1 "
                    class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    @click="phrase.current++"
                >
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-400 dark:bg-gray-800/30 group-hover:bg-orange-500 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
                        <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        <span class="sr-only">Next</span>
                    </span>
                </span>
            </div>
            <div v-if="phrase.list.length > 0" class="flex flex-col gap-2 md:w-50 mx-auto p-3 md:p-5">
                <template v-for="(rm, rmindex) in phrase.list[phrase.current].remark" :key="rmindex">
                    <div class="flex gap-2">
                        <span class="pt-1">
                            <ion-icon name="reader-outline"></ion-icon>
                        </span>
                        <span>{{rm}}</span>
                    </div>
                </template>
            </div>
        </div>
       
    </div>
</template>