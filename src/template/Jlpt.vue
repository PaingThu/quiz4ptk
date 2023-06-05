<script setup>
    import { onMounted, reactive, ref } from 'vue'
    import { goto } from '/src/router.js'
    import { api } from '/src/http-common.js'
    const jlptLevelLabel = {
        n5: "Basic Level",
        n4: "Elementary Level",
        n3: "Intermediate Level",
        n2: "Pre-Advenced Level",
        n1: "Advenced Level",
    }
    const levelInfo = reactive({
        n5:{
            title:'N5' ,
            classrooms:{
                kotoba: {
                    name: "Essential Words",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                kanji: {
                    name: "Kanji",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                grammar: {
                    name: "Grammar Patterns",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
            }
        },
        n4:{
            title:'N4' ,
            classrooms:{
                kotoba: {
                    name: "Essential Words",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                kanji: {
                    name: "Kanji",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                grammar: {
                    name: "Grammar Patterns",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
            }
        },
        n3:{
            title:'N3' ,
            classrooms:{
                kotoba: {
                    name: "Essential Words",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                kanji: {
                    name: "Kanji",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                grammar: {
                    name: "Grammar Patterns",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
            }
        },
        n2:{
            title:'N2' ,
            classrooms:{
                kotoba: {
                    name: "Essential Words",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                kanji: {
                    name: "Kanji",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                grammar: {
                    name: "Grammar Patterns",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
            }
        },
        n1:{
            title:'N1' ,
            classrooms:{
                kotoba: {
                    name: "Essential Words",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                kanji: {
                    name: "Kanji",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
                grammar: {
                    name: "Grammar Patterns",
                    totalWords: 0,
                    studiedWords: 0,
                    practisedWords: 0,
                },
            }
        },
    })
    const currentLevel = ref('n5')
   
    onMounted(async () => {
        for (const level in levelInfo) {
            const retData = await api.get(`jlpt/kotoba/${level}.json`)
            levelInfo[level].classrooms.kotoba.totalWords = retData.data.length
            levelInfo[level].classrooms.kotoba.studiedWords = localStorage.getItem('studiedWords') ? localStorage.getItem('studiedWords') : 0
            levelInfo[level].classrooms.kotoba.practisedWords = localStorage.getItem('practisedWords') ? localStorage.getItem('practisedWords') : 0
        }
    })
</script>
<template>
    <div class="container flex flex-col gap-3 mx-auto py-5 px-3 md:px-5">
        <div>
            <h1 class="text-3xl text-orange-400">Japanese Language Proficiency Test</h1>
        </div>
        <div class="grid grid-cols-5">
            <template v-for="(item, level) in levelInfo" :key="level">
                <div 
                    class="grid place-items-center cursor-pointer p-3 border-b hover:drop-shadow"
                    :class="currentLevel == level ? 'drop-shadow border-b-2 border-orange-400':''"
                    @click="currentLevel = level"
                >
                    <span 
                        class="text-xl text-center"
                        :class="currentLevel == level ? 'text-orange-400':''"
                    > 
                        {{ item.title }} 
                    </span>
                </div>
            </template>
        </div>
        <div class="text-center">
            <span>{{ jlptLevelLabel[currentLevel] }}</span>
        </div>
        <div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <template v-for="(room, roomId) in levelInfo[currentLevel].classrooms" :key="roomId">
                    <div class="flex p-3 border border-orange-400 rounded">
                        <div class="flex flex-col gap-3">
                            <div class="flex">
                                <h3 class="text-xl">{{ room.name }}</h3>
                                <!-- <span class="ms-auto">Go  Class Room</span> -->
                            </div>
                            <div class="flex flex-col gap-2">
                                <span>Total Words : {{ levelInfo[currentLevel].classrooms[roomId].totalWords }}</span>
                                <span>Studied Words : {{ levelInfo[currentLevel].classrooms[roomId].studiedWords }}</span>
                                <span>Practised Words : {{ levelInfo[currentLevel].classrooms[roomId].practisedWords }}</span>
                            </div>
                        </div>
                        <div class="ms-auto flex flex-col gap-2 justify-end">
                            <span 
                                class="rounded bg-blue-400 px-3 py-2 text-center text-white hover:bg-blue-500 cursor-pointer shadow"
                                @click="goto(`/jlpt/${currentLevel}-${roomId}`)"
                            >
                                Class Room
                            </span>
                            <span 
                                class="rounded bg-blue-400 px-3 py-2 text-center text-white hover:bg-blue-500 cursor-pointer shadow"
                                @click="goto(`/jlpt/${currentLevel}-${roomId}/practise`)"
                            >
                                Practise Room
                            </span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>