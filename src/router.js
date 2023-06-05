import { createRouter, createWebHistory } from 'vue-router'
import Home from './template/Home.vue'
import Quiz from './template/Quiz.vue'
import Profile from './template/Profile.vue'
import Phrase from './template/Phrase.vue'
import Jlpt from './template/Jlpt.vue'
import Learning from './pages/Learning.vue'
import JlptLevel from './pages/JlptLevel.vue'
import ClassRoom from './pages/ClassRoom.vue'
import PractiseRoom from './pages/PractiseRoom.vue'

export const goto = (path) => {
    router.push(path)
}

const routes = [
    { path:"", name:"", component: Home },
    { path:"/myanmar", name:"myanmar", meta: {type:"quiz"}, component: Quiz },
    { path:"/english", name:"english", meta: {type:"quiz"}, component: Quiz },
    { path:"/japanese", name:"japanese", meta: {type:"quiz"}, component: Quiz },
    { path:"/profile", name:"profile", component: Profile },
    { path:"/phrase", name:"phrase", component: Phrase },
    { path:"/phrase/:id", name:"learning", component: Learning },
    { path:"/jlpt", name:"jlpt", component: Jlpt },
    { path:"/jlpt/:level", name:"jlptclassroom", component: ClassRoom },
    { path:"/jlpt/:level/:room", name:"practiseroom", component: PractiseRoom },
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router