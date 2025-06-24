import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import './assets/style.css';
import { Icon } from '@iconify/vue';
import { createWebHistory, createRouter } from "vue-router";

// styles

import "./assets/tailwind.css";


const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);
app.component('Icon', Icon);
app.mount('#app');