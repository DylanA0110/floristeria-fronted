import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Inicializa el token y username directamente desde localStorage
    // Si no existen en localStorage, serán null
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
  }),
  getters: {
    // Añadir un getter para verificar si el usuario está autenticado
    isAuthenticated: (state) => {
      return !!state.token; // Retorna true si hay un token, false si es null o vacío
    },
    // Opcional: getters para acceder a token y username fácilmente
    getUserToken: (state) => state.token,
    getUsername: (state) => state.username,
  },
  actions: {
    setUser(token, username) {
      this.token = token;
      this.username = username;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    logout() {
      this.token = null;
      this.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    // El método loadFromStorage ya no es estrictamente necesario si inicializas el state directamente,
    // pero podrías mantenerlo si tienes alguna razón específica para cargarlo manualmente después.
    // Si se mantiene, no debería ser necesario llamarlo explícitamente en el setup de la app.
    // loadFromStorage() {
    //   this.token = localStorage.getItem('token');
    //   this.username = localStorage.getItem('username');
    // },
  }
});