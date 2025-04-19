import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import { router } from './router';
import './style.css'
import App from './App.vue'

const PINIA = createPinia();
const APP = createApp(App);

PINIA.use(piniaPluginPersistedState);
APP.use(PINIA);
APP.use(router);
APP.mount('#app');
