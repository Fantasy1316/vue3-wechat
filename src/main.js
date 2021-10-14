import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/index'
import screenShort from 'vue-web-screen-shot'

import './assets/styles/index.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(screenShort, { enableWebRtc: false })
app.mount('#app')
