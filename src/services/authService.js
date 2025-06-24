// src/services/authService.js
import api from './api';

export async function loginUsuario(userName, password) {
  try {
    const response = await api.post('/usuario/login', {
      userName: userName,
      contrasena: password,
    });

    // ⚠️ Validación básica por si el backend devuelve un token vacío
    if (!response.data || !response.data.token) {
      throw new Error('Token no recibido. Login fallido.');
    }

    return response.data;
  } catch (error) {
    // Manejo de errores del backend
    throw new Error(error.response?.data?.message || 'Credenciales inválidas');
  }
}
