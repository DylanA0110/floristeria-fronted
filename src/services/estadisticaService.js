import api from './api';

export const getTotalPedidos = async () => {
  try {
    const response = await api.get('/Estadisticas/pedidos/total');
    return response.data.total;
  } catch (error) {
    console.error('Error fetching total orders:', error);
    throw error;
  }
};

export const getPedidosPendientes = async () => {
  try {
    const response = await api.get('/Estadisticas/pedidos/pendientes');
    return response.data.pendientes;
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    throw error;
  }
};

export const getTotalClientes = async () => {
  try {
    const response = await api.get('/Estadisticas/clientes/total');
    return response.data.total;
  } catch (error) {
    console.error('Error fetching total clients:', error);
    throw error;
  }
};

export const getTotalEmpleados = async () => {
  try {
    const response = await api.get('/Estadisticas/empleados/total');
    return response.data.total;
  } catch (error) {
    console.error('Error fetching total employees:', error);
    throw error;
  }
};

// Export as named exports or as an object
export default {
  getTotalPedidos,
  getPedidosPendientes,
  getTotalClientes,
  getTotalEmpleados
};