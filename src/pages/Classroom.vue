<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRoute } from 'vue-router'
    import { api } from '/src/http-common.js'
    import { textToSpeech, ttsInfo } from '/src/functions.js'
    const jlptInfo = {
        kotoba: "語彙",
    }
    const route = useRoute()
    const roomInfo = reactive({
        level: route.params.level,
        room: route.params.room,
        original_list: [],
        list:[],
        current: 0,
        random: false
    })
    const configureKanji = (vocab) => {
        if(vocab.kanji){
           return /^[a-zA-Z]+$/.test(vocab.kanji) ? vocab.kana : vocab.kanji
        }
        return vocab.kana
    }
    const configureKana = (vocab) => {
        if(vocab.kanji){
           return /^[a-zA-Z]+$/.test(vocab.kanji) ? '' : vocab.kana
        }
        return ''
    }
    const click = (btn) => {
        if(btn == "next"){
            roomInfo.current++
        }
        if(btn == 'prev'){
            roomInfo.current--
        }
        if(ttsInfo.volume == 1){
            textToSpeech(roomInfo.list[roomInfo.current].kana)
        }
    }
    const volumeToggle = () => {
        ttsInfo.volume = -(ttsInfo.volume)
    }
    const checkRandom = () => {
        roomInfo.current = 0
        const tmpList = [...roomInfo.original_list]
        roomInfo.list = roomInfo.random ? tmpList.sort(() => 0.5 - Math.random()) : roomInfo.original_list
    }
    onMounted(async () => {
        const retData = await api.get(`jlpt/${roomInfo.room}/${roomInfo.level}.json`)
        roomInfo.original_list = retData.data
        const tmpList = [...roomInfo.original_list]
        roomInfo.list = roomInfo.random ? tmpList.sort(() => 0.5 - Math.random()) : roomInfo.original_list
        textToSpeech(roomInfo.list[roomInfo.current].kana)
    })

</script>
<template>
    <div class="container mx-auto p-5 md:py-10 h-screen">
        <div class="flex gap-5 align-center">
            <div class="flex items-center gap-5">
                <span class="text-xl">{{ roomInfo.level.toUpperCase() }} {{ jlptInfo[roomInfo.room]  }}</span>
            </div>
            <div class="ms-auto flex gap-2 items-center">
                <div class="flex-gap-2">
                    <input type="checkbox" id="random" v-model="roomInfo.random" @change="checkRandom()"/>
                    <label for="random">Random Words{{ roomInfo.random }}</label>
                </div>
                <span class="flex items-center" @click="volumeToggle()">
                    <ion-icon class="text-3xl" :name="ttsInfo.volume == 1 ? 'volume-high-outline' : 'volume-mute-outline'"></ion-icon>
                </span>
            </div>
        </div>
        <div v-if="roomInfo.list.length > 0" class="relative h-1/6">
            <div class="flex flex-col gap-3 p-3 md:p-5 rounded w-full items-center bg-blue-400 h-full" >
                <div class="flex h-full items-center">
                    <span class="text-white text-4xl">{{ configureKanji(roomInfo.list[roomInfo.current]) }}</span>
                </div>
                <span 
                    v-if="roomInfo.current > 0"
                    class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    @click="click('prev')"
                >
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-400 dark:bg-gray-800/30 group-hover:bg-orange-500 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
                        <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </span>
                <span 
                    v-if="roomInfo.current < roomInfo.list.length-1 "
                    class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    @click="click('next')"
                >
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-400 dark:bg-gray-800/30 group-hover:bg-orange-500 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
                        <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        <span class="sr-only">Next</span>
                    </span>
                </span>
            </div>
        </div>
        <div v-if="roomInfo.list.length > 0" class="flex flex-col gap-2 md:w-50 mx-auto p-3 md:p-5">
            <div class="flex flex-col gap-2">
                <div class="flex flex-col items-center gap-2">
                    <span 
                        v-if="ttsInfo.volume == 1"
                        class="cursor-pointer flex mb-3 items-center shadow-lg p-3 hover:shadow-sm"
                        @click="click('play')"
                    >
                        <ion-icon class="text-3xl" name="play-circle"></ion-icon>
                    </span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <span>{{ configureKana(roomInfo.list[roomInfo.current]) }}</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <span>{{ roomInfo.list[roomInfo.current].meaning_mm }}</span>
                </div>
            </div>
        </div>
    </div>
</template>