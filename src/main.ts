import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import PresetTheme from '@primeuix/themes/material'
import ConfirmationService from 'primevue/confirmationservice'
import { firebaseConfig } from './config/Config.js'

import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ConfirmationService)

app.use(PrimeVue, {
  theme: {
    preset: PresetTheme,
  },
})
app.component('UIButton', Button)

app.mount('#app')
