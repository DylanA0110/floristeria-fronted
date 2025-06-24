import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    console.group('Auth Store Initialization');
    console.log('Init: Token en localStorage:', storedToken);
    console.log('Init: Username en localStorage:', storedUsername);
    console.groupEnd();

    return {
      token: storedToken,
      username: storedUsername,
    };
  },
  getters: {
    isAuthenticated: (state) => {
      // LOG PARA DEPURACIÓN EN GETTER
      console.log('Getter isAuthenticated: Token presente?', !!state.token);
      return !!state.token; 
    },
    getUserToken: (state) => state.token,
    getUsername: (state) => {
      // LOG PARA DEPURACIÓN EN GETTER DE USERNAME
      console.log('Getter getUsername: Valor actual:', state.username);
      return state.username;
    },
  },
  actions: {
    setUser(token, username) {
      console.group('Auth Store Action: setUser');
      console.log('setUser: Recibido Token:', token);
      console.log('setUser: Recibido Username:', username);

      this.token = token;
      this.username = username; // Asegurándonos de que 'this.username' se actualiza

      localStorage.setItem('token', token);
      localStorage.setItem('username', username); // Asegurándonos de que 'username' se guarda

      console.log('setUser: Token guardado en estado:', this.token);
      console.log('setUser: Username guardado en estado:', this.username);
      console.log('setUser: Token en localStorage (después de set):', localStorage.getItem('token'));
      console.log('setUser: Username en localStorage (después de set):', localStorage.getItem('username'));
      console.groupEnd();
    },
    
    async logout() {
      console.group('Auth Store Action: logout');
      console.log('logout: Iniciando...');

      this.token = null;
      this.username = null; // Asegurándonos de que el estado se limpia

      localStorage.removeItem('token');
      localStorage.removeItem('username'); // Asegurándonos de que localStorage se limpia

      console.log('logout: Token en estado:', this.token);
      console.log('logout: Username en estado:', this.username);
      console.log('logout: Token en localStorage (después de remove):', localStorage.getItem('token'));
      console.log('logout: Username en localStorage (después de remove):', localStorage.getItem('username'));
      console.log('logout: isAuthenticated ahora es:', this.isAuthenticated);
      console.groupEnd();
    },
  }
});