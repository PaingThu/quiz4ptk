import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'

const app = createApp(App)
app.use(VueLazyload)
app.use(router)

app.mount('#app')