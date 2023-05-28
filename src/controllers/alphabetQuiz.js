
import {reactive} from 'vue'
import correct from '/src/assets/sounds/correct.mp3'
import wrong from '/src/assets/sounds/wrong.mp3'

var correctSound = new Audio(correct);
var wrongSound = new Audio(wrong);


const htmlCode = {
    myanmar: { start:4096, total: 34 },
    english: { start:65, total: 26 },
    japanese: { start:12353, total: 86 },
}
const jplan = {
    tiny: [0,2,4,6,8,34,66,68,70,77,84,85],
    dandan: [11,13,15,17,19,21,23,25,27,29,31,33,36,38,40,47,50,53,56,59,83],
    tantan: [48,51,54,57,60],
    advance: [79,80]
}
export const quizInfo = reactive({
    start: 4096,
    total: 34,
    alphabetList: [],
    que: 0,
    randomCharList: [],
    wrongList: [],
    wrongTime: 0,
    correctTime: 0,
    correctWord: "",
    correct: false
})
export const quizController = {
    configureAlphabetList: (lan) => {
        quizInfo.alphabetList = []
        var index = 0
        Array(htmlCode[lan].total).fill(1).forEach(n => {
            if(lan == 'japanese'){
                console.log(jplan.tiny.includes(index))
                if(jplan.tiny.includes(index) || jplan.dandan.includes(index) || jplan.tantan.includes(index) || jplan.advance.includes(index)){
                    index += n
                }else{
                    quizInfo.alphabetList.push(String.fromCharCode(htmlCode[lan].start+index))
                    index += n
                }
            }else{
                quizInfo.alphabetList.push(String.fromCharCode(htmlCode[lan].start+index))
                index += n
            }
            
        })
        console.log("Alphabet List ", quizInfo.alphabetList)
    },
    getAlphabetHtmlCode: (num) => {
        return `&#${quizInfo.start+num}`
    },
    getRandomsCharacter: () => {
        var result = []
        result.push(quizInfo.que)
        while (result.length < 4) {
            result.push(Math.floor(Math.random() * (quizInfo.alphabetList.length - 0) + 0))
            result = [...new Set(result)];
            result.sort(() => Math.random() - 0.5);
        }
        quizInfo.randomCharList = result
    },
    chooseAns: (ans) => {
        if(!quizInfo.correct){
            if(quizInfo.que == ans){
                quizInfo.correctWord = ans
                quizInfo.correct = true
                correctSound.play()
                setTimeout(function(){
                    quizInfo.correct = false
                    quizInfo.wrongList = []
                    if(quizInfo.que >= quizInfo.alphabetList.length - 1){
                        const wrongInfo = quizInfo.wrongTime ? ` But you choosed wrong answer ${quizInfo.wrongTime} times` : ""
                        alert(`Congratulations!${wrongInfo}` )
                    }else{
                        quizInfo.que ++
                        quizController.getRandomsCharacter()
                        quizInfo.correctWord = ""
                    }
                }, 2000);
    
            }else{
                wrongSound.play()
                quizInfo.wrongList.push(ans)
                quizInfo.wrongTime ++
            }
        }

    },
    restart: () => {
        quizInfo.que = 0,
        quizInfo.wrongList = []
        quizInfo.correctTime = 0
        quizInfo.wrongTime = 0
        quizController.getRandomsCharacter()
    }

}