<script setup>
    import JlptNavbar from '/src/components/JlptNavbar.vue'
    import { onMounted, reactive } from 'vue';
    import { useRoute } from 'vue-router'
    import { api } from '/src/http-common.js'
    import { textToSpeech, ttsInfo } from '/src/functions.js'
import { goto } from '../router';
    const jlptInfo = {
        kotoba: "Essential Words Practise",
    }
    const route = useRoute()
    const roomInfo = reactive({
        level: route.params.level,
        room: route.params.room,
        original_list: [],
        list:[],
        current: 0,
        studiedWords: {
            n5:[],n4:[],n3:[],n2:[],n1:[],
        },
        multipleChoices:[],
        correctAns:[],
        wrongAns:[],
        selectedAns:''
    })
    const configureKanji = (vocab) => {
        if(vocab && vocab.kanji){
           return /^[a-zA-Z]+$/.test(vocab.kanji) ? vocab.kana : vocab.kanji
        }
        return vocab ? vocab.kana : ""
    }
    const configureMultipleChoices = () => {
        var result = []
        result.push(roomInfo.list[roomInfo.current])
        var preNo = roomInfo.list[roomInfo.current].no
        while (result.length < 4) {
            const rd = Math.floor(Math.random() * (roomInfo.original_list.length - 0) + 0)
            if(preNo != roomInfo.original_list[rd].no){
                result.push(roomInfo.original_list[rd])
                preNo = roomInfo.original_list[rd].no
            }
        }
        result.sort(() => Math.random() - 0.5);
        roomInfo.multipleChoices = result
    }
    const chooseAns = (mc) => {
        roomInfo.selectedAns = mc.no
        if(mc.no == roomInfo.list[roomInfo.current].no){
            roomInfo.correctAns.push(mc.no)
            // textToSpeech(mc.kana)
        }else{
            // textToSpeech('違う')
            roomInfo.wrongAns.push(mc.no)
        }
        setTimeout(()=>{
            roomInfo.selectedAns = ''
            roomInfo.current ++
            if(roomInfo.current < roomInfo.list.length){
                configureMultipleChoices()
            }else{
                alert("Finish Practice")
                goto(`/jlpt/${roomInfo.level}`)
            }
        },2000)
    }
    const btnStatus = (mc) => {
        if(roomInfo.correctAns.includes(mc.no)){
            return 'bg-blue-400'
        }
        if(roomInfo.wrongAns.includes(mc.no)){
            return 'bg-red-400'
        }
        return 'bg-orange-400'
    }
    onMounted(async () => {
        let retString = localStorage.getItem("studiedWords")
        let tmpJson = retString ? JSON.parse(retString) : {n5:[],n4:[],n3:[],n2:[],n1:[]}
        roomInfo.studiedWords[roomInfo.level] = tmpJson[roomInfo.level]
        const retData = await api.get(`jlpt/${roomInfo.room}/${roomInfo.level}.json`)
        roomInfo.original_list = retData.data.sort(() => 0.5 - Math.random())
        roomInfo.list = roomInfo.original_list.filter(org => roomInfo.studiedWords[roomInfo.level].includes(org.no))
        configureMultipleChoices()

    })

</script>
<template>
    <JlptNavbar :level="roomInfo.level"/>
    <div class="container mx-auto p-5 md:py-10">
        <div class="flex flex-col gap-3">
            <div class="flex gap-5 align-center pb-2 mb-3 border-b-2 border-b-orange-500">
                <div class="flex items-center gap-3">
                    <span class="cursor-pointer" @click="goto(`/jlpt/${roomInfo.level}`)">
                        <ion-icon name="home" size="large"></ion-icon>
                    </span>
                    <span class="text-lg">{{ roomInfo.level.toUpperCase() }} {{ jlptInfo[roomInfo.room]  }}</span>
                </div>
                <div class="ms-auto flex gap-3 items-center">
                    
                </div>
            </div>
            <div>
                <span> You studied {{ roomInfo.studiedWords[roomInfo.level].length }} words.</span>
            </div>
            <div v-if="roomInfo.list.length > 0" class="relative h-40">
                <div class="flex flex-col gap-3 p-3 md:p-5 rounded w-full items-center bg-blue-400 h-full" >
                    <div class="flex h-full items-center">
                        <span class="text-white text-4xl">{{ configureKanji(roomInfo.list[roomInfo.current]) }}</span>
                    </div>
                </div>
            </div>
            <div v-if="roomInfo.list.length > 0" class="h-5 flex items-center justify-center">
                <span v-if="roomInfo.correctAns.includes(roomInfo.list[roomInfo.current].no)" class="flex gap-3 items-center">
                    <ion-icon class="text-blue-700" name="checkmark-outline"></ion-icon>
                    <span>{{ roomInfo.list[roomInfo.current].kana }}</span> 
                </span>
                <span v-if="roomInfo.wrongAns.includes(roomInfo.selectedAns)" class="text-red-700">
                    <ion-icon name="close-outline" size="large"></ion-icon>
                </span>
            </div>
            <!-- <div v-if="roomInfo.multipleChoices.length > 0">
                <div class="flex flex-col md:flex-row gap-2 justify-center">
                    <template v-for="(mc, index) in roomInfo.multipleChoices" :key="index">
                        <span 
                            class="flex items-center justify-center p-3 rounded w-full md:w-40 text-center text-white cursor-pointer"
                            :class="btnStatus(mc)"
                            @click="chooseAns(mc)"
                        >
                                {{ mc.kana }}
                        </span>
                    </template>
                </div>
            </div> -->
            <div v-if="roomInfo.multipleChoices.length > 0">
                <div class="flex flex-col md:flex-row gap-2 justify-center">
                    <template v-for="(mc, index) in roomInfo.multipleChoices" :key="index">
                        <span 
                            class="flex items-center justify-center p-3 rounded w-full md:w-40 text-center text-white cursor-pointer"
                            :class="btnStatus(mc)"
                            @click="chooseAns(mc)"
                        >
                                {{ mc.meaning_mm }}
                        </span>
                    </template>
                </div>
            </div>
            
        </div>
        
    </div>
</template>