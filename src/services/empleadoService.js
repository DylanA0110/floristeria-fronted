// src/services/empleadoService.js
import api from './api'; // Asegúrate de que la ruta a tu api.js sea correcta

const BASE_URL = '/Empleado'; // La ruta base de tu controlador C# es 'api/[controller]', por lo que es '/Empleado'

export const empleadoService = {
  /**
   * Obtiene todos los empleados.
   * @returns {Promise<Array>} Una promesa que resuelve con la lista de empleados.
   */
  async getAllEmpleados() {
    try {
      const response = await api.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener todos los empleados:', error);
      throw error; // Propaga el error para que el store lo maneje
    }
  },

  /**
   * Obtiene un empleado por su ID.
   * @param {number} id El ID del empleado.
   * @returns {Promise<Object>} Una promesa que resuelve con el empleado.
   */
  async getEmpleadoById(id) {
    try {
      const response = await api.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener empleado con ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crea un nuevo empleado.
   * @param {Object} empleadoData Los datos del nuevo empleado.
   * @returns {Promise<Object>} Una promesa que resuelve con el empleado creado.
   */
  async createEmpleado(empleadoData) {
    try {
      const response = await api.post(BASE_URL, empleadoData);
      return response.data;
    } catch (error) {
      console.error('Error al crear empleado:', error);
      throw error;
    }
  },

  /**
   * Actualiza un empleado existente.
   * @param {number} id El ID del empleado a actualizar.
   * @param {Object} empleadoData Los datos actualizados del empleado.
   * @returns {Promise<void>} Una promesa que resuelve cuando el empleado ha sido actualizado.
   */
  async updateEmpleado(id, empleadoData) {
    try {
      const response = await api.put(`${BASE_URL}/${id}`, empleadoData);
      return response.data; // La API devuelve NoContent (204) pero Axios aún devuelve response.data como vacío.
    } catch (error) {
      console.error(`Error al actualizar empleado con ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Elimina un empleado por su ID.
   * @param {number} id El ID del empleado a eliminar.
   * @returns {Promise<void>} Una promesa que resuelve cuando el empleado ha sido eliminado.
   */
  async deleteEmpleado(id) {
    try {
      await api.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error(`Error al eliminar empleado con ID ${id}:`, error);
      throw error;
    }
  },
};