import { createRouter, createWebHistory } from 'vue-router'
import Home from './template/Home.vue'
import Quiz from './template/Quiz.vue'
import Profile from './template/Profile.vue'
import Phrase from './template/Phrase.vue'
import Learning from './pages/Learning.vue'

export const goto = (path) => {
    console.log("Path ", path)
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
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router