import axios from 'axios';
import router from '@/router'; // Ajusta según la ruta real
import { useAuthStore } from '@/store/auth'; // Ajusta según la ruta real

const api = axios.create({
  baseURL: 'https://localhost:7284/api', // URL base backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token Bearer a las solicitudes salientes
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas con error 401/403
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error('Sesión inválida o no autorizada. Forzando logout y redirigiendo al login.');

      authStore.logout();

      // Evita redirigir si ya estamos en /login para no generar loops
      if (router.currentRoute.value.path !== '/login') {
        await router.push('/login');
      }

      return Promise.reject(new Error('Sesión expirada o no autorizada. Redirigiendo a login.'));
    }

    return Promise.reject(error);
  }
);

export default api;
