import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App)
import "bootstrap/dist/js/bootstrap.js";
import Api from "./api";
import {useAuthStore} from "@/stores/auth";
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

app.use(VueSweetalert2);
app.use(createPinia())
app.use(router)

const {user} = useAuthStore()

Api.init(import.meta.env.VITE_API_URL)
Api.setToken(user.token)

app.mount('#app')


