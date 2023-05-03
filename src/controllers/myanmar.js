import {reactive} from 'vue'
const alphabet = 4095
const total = 34
export const quizInfo = reactive({
    que: 1,
    randomCharList: [],
    wrongList: [],
    wrongTime: 0
})
export const mmController = {
    getAlphabet: (num) => {
        return `&#${alphabet+num}`
    },
    getRandomsCharacter: () => {
        var result = []
        result.push(quizInfo.que)
        while (result.length < 4) {
            result.push(Math.floor(Math.random() * (34 - 1) + 1))
            result = [...new Set(result)];
            result.sort(() => Math.random() - 0.5);
        }
        console.log("Result ", result)
        quizInfo.randomCharList = result
    },
    chooseAns: (ans) => {
        if(quizInfo.que == ans){
            quizInfo.wrongList = []
            if(quizInfo.que >= total){
                const wrongInfo = quizInfo.wrongTime ? ` But you choosed wrong answer ${quizInfo.wrongTime} times` : ""
                alert(`Congratulations!${wrongInfo}` )
            }else{
                quizInfo.que ++
                mmController.getRandomsCharacter()
            }
        }else{
            quizInfo.wrongList.push(ans)
            quizInfo.wrongTime ++
        }
    },
    restart: () => {
        quizInfo.que = 1,
        quizInfo.wrongList = []
        quizInfo.wrongTime = 0
        mmController.getRandomsCharacter()
    }

}