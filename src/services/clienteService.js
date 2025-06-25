import api from './api';

const BASE_URL = '/Cliente'; // Asegúrate que la ruta sea correcta

export const clienteService = {
  /**
   * Obtiene todos los clientes con manejo mejorado de errores
   */
  async getAllClientes() {
    try {
      const response = await api.get(BASE_URL);
      
      // Verificar si la respuesta tiene datos y es un array
      if (!response.data || !Array.isArray(response.data)) {
        console.warn('La respuesta no contiene un array de clientes');
        return [];
      }
      
      // Mapear los datos para asegurar consistencia
      return response.data.map(cliente => ({
        id_cliente: cliente.id_Cliente ,
        Nombre_Cliente: cliente.nombre_Cliente,
        Telefono: cliente.telefono
      }));
      
    } catch (error) {
      let errorMsg = 'Error al obtener clientes';
      
      if (error.response) {
        errorMsg += ` (${error.response.status})`;
        if (error.response.data?.message) {
          errorMsg += `: ${error.response.data.message}`;
        }
      } else {
        errorMsg += `: ${error.message}`;
      }
      
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },

  /**
   * Crea un nuevo cliente con validación mejorada
   */
  async createCliente(clienteData) {
    try {
      // Validación estricta
      if (!clienteData || typeof clienteData !== 'object') {
        throw new Error('Datos de cliente no válidos');
      }
      
      if (!clienteData.Nombre_Cliente || typeof clienteData.Nombre_Cliente !== 'string') {
        throw new Error('El nombre del cliente es requerido y debe ser texto');
      }

      // Estructura de datos limpia
      const payload = {
        Nombre_Cliente: clienteData.Nombre_Cliente.trim(),
        Telefono: clienteData.Telefono?.trim() || null
      };

      const response = await api.post(BASE_URL, payload);
      
      // Verificar respuesta
      if (!response.data) {
        throw new Error('No se recibieron datos del cliente creado');
      }
      
      return {
        id_cliente: response.data.id_cliente || response.data.Id_Cliente,
        Nombre_Cliente: response.data.Nombre_Cliente,
        Telefono: response.data.Telefono
      };
      
    } catch (error) {
      let errorMsg = 'Error al crear cliente';
      
      if (error.response) {
        errorMsg += ` (${error.response.status})`;
        if (error.response.data?.errors) {
          // Mostrar errores de validación del servidor
          errorMsg += ': ' + Object.values(error.response.data.errors).join(', ');
        } else if (error.response.data?.message) {
          errorMsg += `: ${error.response.data.message}`;
        }
      } else {
        errorMsg += `: ${error.message}`;
      }
      
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },

  /**
   * Actualiza un cliente existente
   */
  async updateCliente(id, clienteData) {
    try {
      // Validación de ID
      if (!id || isNaN(id)) {
        throw new Error('ID de cliente no válido');
      }
      
      // Validación de datos
      if (!clienteData || typeof clienteData !== 'object') {
        throw new Error('Datos de cliente no válidos');
      }
      
      if (!clienteData.Nombre_Cliente) {
        throw new Error('El nombre del cliente es requerido');
      }

      

      try
      {
        const response = await api.put(`${BASE_URL}/${id}`, clienteData);
        return response.data || { success: true };
      }
      catch (error) {
      const errorMsg = `Error al actualizar Cliente con ID ${id}`;
      console.error(errorMsg, error);
      throw new Error(`${errorMsg}: ${error.response?.data?.message || error.message}`);
      }
      
    } catch (error) {
      let errorMsg = `Error al actualizar cliente con ID ${id}`;
      
      if (error.response) {
        errorMsg += ` (${error.response.status})`;
        if (error.response.data?.message) {
          errorMsg += `: ${error.response.data.message}`;
        }
      } else {
        errorMsg += `: ${error.message}`;
      }
      
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },

  /**
   * Elimina un cliente con manejo de errores mejorado
   */
  async deleteCliente(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('ID de cliente no válido');
      }

      await api.delete(`${BASE_URL}/${id}`);
      return true;
      
    } catch (error) {
      let errorMsg = `Error al eliminar cliente con ID ${id}`;
      
      if (error.response) {
        errorMsg += ` (${error.response.status})`;
        if (error.response.data?.message) {
          errorMsg += `: ${error.response.data.message}`;
        }
      } else {
        errorMsg += `: ${error.message}`;
      }
      
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  }
};