<script setup>
    import {onMounted} from 'vue'
    import { quizInfo, quizController } from '/src/controllers/alphabetQuiz.js'
    import { icons } from '/src/assets/icons/svg.js'
    
    const {compInfo} = defineProps(["compInfo"])
    console.log("Name ", compInfo.name)
    const pageInfo = {
        myanmar: { title: "မြန်မာစာ သင်ပုန်းကြီး", start:4096, total: 34 },
        english: { title: "English Alphabets", start:65, total: 26 },
        japanese: { title: "ひらがな", start:12354, total: 100 },
    }
    quizInfo.start = pageInfo[compInfo.name].start
    quizInfo.total = pageInfo[compInfo.name].total
    

    onMounted(() => {
        quizController.configureAlphabetList(compInfo.name)
        quizController.getRandomsCharacter()
    })

</script>

<template>
        <div class="flex flex-col gap-4 items-center w-full xl:w-1/2">
            <!-- <span class="text-6xl w-full text-center border rounded py-10" v-html="quizController.getAlphabetHtmlCode(quizInfo.que)"></span> -->
            <span class="text-6xl w-full text-center border rounded py-10" v-html="quizInfo.alphabetList[quizInfo.que]"></span>
            <div class="grid w-full grid-cols-4 gap-3">
                <template v-for="(charNo, index) in quizInfo.randomCharList" :key="index">
                    <div class="flex flex-col items-center">
                        <span 
                            class="w-full py-5 md:py-10 text-center text-4xl rounded cursor-pointer hover:shadow-none" 
                            :class="quizInfo.wrongList.includes(charNo)?'bg-red-300 shadow-none':'bg-green-300 shadow-md'"
                            v-html="quizInfo.alphabetList[charNo]"
                            @click="quizController.chooseAns(charNo)"
                        >
                        </span>
                        <span class="h-5">
                            <span v-if="quizInfo.wrongList.includes(charNo)" class="text-red-300">x</span>
                        </span>
                    </div>
                </template>
            </div>
            <span 
                class="ms-auto bg-orange-300 px-5 py-3 rounded-full cursor-pointer shadow-md hover:shadow-none " 
                @click="quizController.restart()" 
                v-html="icons.restart"
            >
            </span>
        </div>
</template>