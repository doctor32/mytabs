import { createApp } from 'vue'
import App from './App.vue'
import store from './store.js'
import '@/assets/scss/styles.scss'

createApp(App)
.use(store)
.mount('#app')
