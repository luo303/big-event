import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import store from './stores'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
