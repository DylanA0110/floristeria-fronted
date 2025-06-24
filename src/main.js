import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import api from './services/api';  // Tu instancia axios con interceptores
import './assets/style.css';
import { Icon } from '@iconify/vue';
import { useAuthStore } from './store/auth'; // Ajusta la ruta si es necesaria


// styles
import "./assets/tailwind.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const authStore = useAuthStore();

// Función para validar token y usuario en backend
async function validateToken() {
  if (!authStore.token) return; // Sin token no hay nada que validar

  try {
    await api.get('/usuario/profile'); // Petición protegida para validar token y existencia usuario
    // Token válido y usuario existe, sigue normal
  } catch (error) {
    // Si falla, token inválido o usuario eliminado
    authStore.logout();
    router.push('/login');
  }
}

// Validamos token ANTES de montar la app y usar el router
validateToken().finally(() => {
  app.use(router);
  app.component('Icon', Icon);
  app.mount('#app');
});
