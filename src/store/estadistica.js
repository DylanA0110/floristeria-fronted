import { defineStore } from 'pinia';
import { 
  getTotalPedidos, 
  getPedidosPendientes, 
  getTotalClientes, 
  getTotalEmpleados 
} from '@/services/estadisticaService';

export const useEstadisticasStore = defineStore('estadisticas', {
  state: () => ({
    totalPedidos: 0,
    pedidosPendientes: 0,
    totalClientes: 0,
    totalEmpleados: 0,
    loading: false,
    error: null
  }),

  actions: {
    async fetchEstadisticas() {
      this.loading = true;
      this.error = null;
      
      try {
        const [
          totalPedidos, 
          pedidosPendientes, 
          totalClientes, 
          totalEmpleados
        ] = await Promise.all([
          getTotalPedidos(),
          getPedidosPendientes(),
          getTotalClientes(),
          getTotalEmpleados()
        ]);

        this.totalPedidos = totalPedidos;
        this.pedidosPendientes = pedidosPendientes;
        this.totalClientes = totalClientes;
        this.totalEmpleados = totalEmpleados;
      } catch (error) {
        console.error('Error loading statistics:', error);
        this.error = 'Failed to load statistics';
      } finally {
        this.loading = false;
      }
    }
  },

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error
  }
});