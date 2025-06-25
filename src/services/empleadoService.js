// src/services/empleadoService.js
import api from './api';

const BASE_URL = '/Empleado';

export const empleadoService = {

  async getAllEmpleados() {
    try {
      const response = await api.get(BASE_URL);
      return response.data || [];
    } catch (error) {
      const errorMsg = 'Error al obtener empleados';
      console.error(errorMsg, error);
      throw new Error(`${errorMsg}: ${error.message}`);
    }
  },

  /**
   * Obtiene un empleado por su ID.
   * @param {number} id - ID del empleado
   * @returns {Promise<Object>} Datos del empleado
   * @throws {Error} Si el ID no es válido o falla la petición
   */
  async getEmpleadoById(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID de empleado no válido');
    }

    try {
      const response = await api.get(`${BASE_URL}/${id}`);
      if (!response.data) {
        throw new Error('Empleado no encontrado');
      }
      return response.data;
    } catch (error) {
      const errorMsg = `Error al obtener empleado con ID ${id}`;
      console.error(errorMsg, error);
      throw new Error(`${errorMsg}: ${error.response?.data?.message || error.message}`);
    }
  },

  /**
   * Crea un nuevo empleado.
   * @param {Object} empleadoData - Datos del empleado
   * @returns {Promise<Object>} Empleado creado
   * @throws {Error} Si los datos son inválidos o falla la creación
   */
  async createEmpleado(empleadoData) {
    if (!empleadoData || typeof empleadoData !== 'object') {
      throw new Error('Datos de empleado no válidos');
    }

    try {
      const response = await api.post(BASE_URL, empleadoData);
      return response.data;
    } catch (error) {
      const errorMsg = 'Error al crear empleado';
      console.error(errorMsg, error);
      throw new Error(`${errorMsg}: ${error.response?.data?.message || error.message}`);
    }
  },

  /**
   * Actualiza un empleado existente.
   * @param {number} id - ID del empleado
   * @param {Object} empleadoData - Datos a actualizar
   * @returns {Promise<Object>} Datos actualizados
   * @throws {Error} Si el ID o datos son inválidos
   */
  async updateEmpleado(id, empleadoData) {
    if (!id || isNaN(id)) {
      throw new Error('ID de empleado no válido');
    }
    if (!empleadoData || typeof empleadoData !== 'object') {
      throw new Error('Datos de empleado no válidos');
    }

    try {
      const response = await api.put(`${BASE_URL}/${id}`, empleadoData);
      return response.data || { success: true }; // Manejo para endpoints que no devuelven data
    } catch (error) {
      const errorMsg = `Error al actualizar empleado con ID ${id}`;
      console.error(errorMsg, error);
      throw new Error(`${errorMsg}: ${error.response?.data?.message || error.message}`);
    }
  },

  /**
   * Elimina un empleado.
   * @param {number} id - ID del empleado
   * @returns {Promise<boolean>} True si fue eliminado
   * @throws {Error} Si el ID no es válido o falla la eliminación
   */
  async deleteEmpleado(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID de empleado no válido');
    }

    try {
      await api.delete(`${BASE_URL}/${id}`);
      return true;
    } catch (error) {
      const errorMsg = `Error al eliminar empleado con ID ${id}`;
      console.error(errorMsg, error);
      throw new Error(`${errorMsg}: ${error.response?.data?.message || error.message}`);
    }
  },
};