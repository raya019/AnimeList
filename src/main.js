import { createApp } from 'vue'
import App from './App.vue'
import router from './util/router'
import './style.css'
import 'swiper/css/bundle'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
