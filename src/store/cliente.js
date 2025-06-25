import { defineStore } from 'pinia';
import { clienteService } from '../services/clienteService.js';

export const useClientesStore = defineStore('clientes', {
  state: () => ({
    clientes: [],
    isLoading: false,
    isSaving: false,
    error: null,
  }),
  
  actions: {
    /**
     * Carga todos los clientes con manejo mejorado de errores
     */
    async fetchAllClientes() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await clienteService.getAllClientes();
        this.clientes = data;
      } catch (error) {
        this.error = error.message;
        console.error('Error en fetchAllClientes:', error);
        this.clientes = []; // Resetear a array vacío en caso de error
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Agrega un nuevo cliente con manejo de errores mejorado
     */
    async addCliente(clienteData) {
      this.isSaving = true;
      this.error = null;
      try {
        const newCliente = await clienteService.createCliente(clienteData);
        this.clientes.push(newCliente);
        return newCliente;
      } catch (error) {
        this.error = error.message;
        console.error('Error en addCliente:', error);
        throw error; // Re-lanzar para manejo en el componente
      } finally {
        this.isSaving = false;
      }
    },

    /**
     * Actualiza un cliente existente
     */
    async updateCliente(id, clienteData) {
  this.isSaving = true;
  this.error = null;

  if (!id) {
    this.error = 'ID de cliente no proporcionado';
    this.isSaving = false;
    return false;
  }
  
  try {

    await clienteService.updateCliente(id,clienteData)
    
    // Actualizar en el estado local
    const index = this.clientes.findIndex(c => c.id_cliente === id);
    if (index !== -1) {
      this.clientes[index] = { 
        ...this.clientes[index],
        ...clienteData,
        id_Cliente: id
      };
    }
    
    return true; // Return the updated data
  } catch (error) {
    this.error = error.message;
    console.error('Error en updateCliente:', error);
    throw error;
  } finally {
    this.isSaving = false;
  }
},

    /**
     * Elimina un cliente con manejo de errores mejorado
     */
    async deleteCliente(id) {
      this.isSaving = true;
      this.error = null;
      try {
        if (!id) {
          throw new Error('ID de cliente no proporcionado');
        }

        await clienteService.deleteCliente(id);
        this.clientes = this.clientes.filter(c => c.id_cliente !== id);
        return true;
      } catch (error) {
        this.error = error.message;
        console.error('Error en deleteCliente:', error);
        throw error;
      } finally {
        this.isSaving = false;
      }
    }
  }
});