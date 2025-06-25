import { defineStore } from 'pinia';
import { pedidoService } from '../services/pedidoService.js';

export const usePedidosStore = defineStore('pedidos', {
  state: () => ({
    pedidos: [],
    isLoading: false,
    isSaving: false,
    error: null,
  }),
  
  actions: {
    async fetchAllPedidos() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await pedidoService.getAll();
        this.pedidos = data;
      } catch (error) {
        this.error = error.message;
        console.error('Error en fetchAllPedidos:', error);
        this.pedidos = [];
      } finally {
        this.isLoading = false;
      }
    },

    async addPedido(pedidoData) {
      this.isSaving = true;
      this.error = null;
      try {
        const newPedido = await pedidoService.create(pedidoData);
        this.pedidos.push(newPedido);
        return newPedido;
      } catch (error) {
        this.error = error.message;
        console.error('Error en addPedido:', error);
        throw error;
      } finally {
        this.isSaving = false;
      }
    },

    async updatePedido(id, pedidoData) {
      this.isSaving = true;
      this.error = null;
      
      if (!id) {
        this.error = 'ID de pedido no proporcionado';
        this.isSaving = false;
        return false;
      }
      
      try {
        const updatedPedido = await pedidoService.update(id, pedidoData);
        
        const index = this.pedidos.findIndex(p => p.id_Pedido === id);
        if (index !== -1) {
          this.pedidos[index] = { 
            ...this.pedidos[index],
            ...updatedPedido
          };
        }
        
        return updatedPedido;
      } catch (error) {
        this.error = error.message;
        console.error('Error en updatePedido:', error);
        throw error;
      } finally {
        this.isSaving = false;
      }
    },

    async deletePedido(id) {
      this.isSaving = true;
      this.error = null;
      try {
        if (!id) {
          throw new Error('ID de pedido no proporcionado');
        }

        await pedidoService.delete(id);
        this.pedidos = this.pedidos.filter(p => p.id_Pedido !== id);
        return true;
      } catch (error) {
        this.error = error.message;
        console.error('Error en deletePedido:', error);
        throw error;
      } finally {
        this.isSaving = false;
      }
    }
  }
});