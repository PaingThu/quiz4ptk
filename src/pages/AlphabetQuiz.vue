<script setup>
    import {onMounted} from 'vue'
    import { quizInfo, quizController } from '/src/controllers/alphabetQuiz.js'

    const {compInfo} = defineProps(["compInfo"])
    console.log("Name ", compInfo.name)
    const pageInfo = {
        myanmar: { title: "မြန်မာစာ သင်ပုန်းကြီး", start:4096, total: 34, correct: 'အဖြေမှန်ပါတယ်' },
        english: { title: "English Alphabets", start:65, total: 26, correct: 'Correct' },
        japanese: { title: "ひらがな", start:12354, total: 100, correct: '正解' },
    }
    quizInfo.start = pageInfo[compInfo.name].start
    quizInfo.total = pageInfo[compInfo.name].total
    

    onMounted(() => {
        quizInfo.que = 0
        quizInfo.correctTime = 0
        quizController.configureAlphabetList(compInfo.name)
        quizController.getRandomsCharacter()
    })

</script>

<template>
    <div class="w-full">
        <div 
            class="text-xl py-5 flex flex-col gap-0"
        >
            <div
                class="hidden md:block"
                :style="`width: ${50 / (quizInfo.total/2)}%; margin-left: ${((100 / quizInfo.total) * quizInfo.correctTime)-((100 / quizInfo.total))}%`"
            >
                <img src="/src/assets/img/risu.png" alt="" 
                    class="w-10 md:w-20 animate-bounce transition-transform"
                >
            </div>
            <div
                class="md:hidden"
                :style="`width: ${100 / (quizInfo.total/2)}%; margin-left: ${((100 / quizInfo.total*2) * quizInfo.correctTime)-((100 / quizInfo.total*2))}%`"
            >
                <img src="/src/assets/img/risu.png" alt="" 
                    class="w-10 md:w-20 animate-bounce transition-transform"
                >
            </div>
            <div class="flex flex-col md:flex-row mb-8" style="margin-top: -2rem;">
                <div class="flex w-full">
                    <div class="" v-for="index in quizInfo.total/2" :key="index"
                        :style="`width: ${100 / (quizInfo.total/2)}%`"
                    >
                        <span
                            v-if="index > quizInfo.que"
                            class="w-5 h-5 mx-auto block broder rounded-full shadow"
                        >
                            <img src="/src/assets/img/nut.png" alt="">
                        </span>
                    </div>
                </div>
                <div class="flex w-full">
                    <div class="" v-for="index in quizInfo.total/2" :key="index"
                        :style="`width: ${100 / (quizInfo.total/2)}%`"
                    >
                        <span
                            v-if="index+quizInfo.total/2 > quizInfo.que"
                            class="w-5 h-5 mx-auto block broder rounded-full shadow"
                        >
                            <img src="/src/assets/img/nut.png" alt="">
                        </span>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="relative flex flex-col gap-4 mx-auto items-center w-full xl:w-1/2">
            <span class="text-6xl w-full text-center border rounded py-10 text-cyan-500" v-html="quizInfo.alphabetList[quizInfo.que]"></span>
            <div class="grid w-full grid-cols-4 gap-3">
                <template v-for="(charNo, index) in quizInfo.randomCharList" :key="index">
                    <div class="flex flex-col items-center">
                        <span 
                            class="w-full py-5 md:py-10 select-none text-center text-4xl md:text-6xl rounded cursor-pointer hover:shadow-none" 
                            :class="quizInfo.wrongList.includes(charNo)?'bg-red-300 shadow-none':'bg-cyan-300 shadow-md'"
                            v-html="quizInfo.alphabetList[charNo]"
                            @click="quizController.chooseAns(charNo)"
                        >
                        </span>
                        <span class="h-5">
                            <span v-if="quizInfo.wrongList.includes(charNo)" class="text-red-300">x</span>
                            <span v-if="quizInfo.correctWord === charNo" class="text-green-300">○</span>
                        </span>
                    </div>
                </template>
            </div>
            
            <!-- <span 
                class="ms-auto bg-orange-300 px-5 py-3 rounded-full cursor-pointer shadow-md hover:shadow-none " 
                @click="quizController.restart()" 
                v-html="icons.restart"
            >
            </span> -->
            <div v-if="quizInfo.correct" class="absolute right-0 flex flex-col gap-3 items-center w-1/2 md:w-1/3">
                <span class="flex w-10 h-10 border rounded-full text-lime-500 text-4xl">
                    <ion-icon name="checkmark-outline"></ion-icon>
                </span>
                <img src="/src/assets/img/anpanman.png" alt="" class="w-full">
            </div>
        </div>
    </div>
</template>