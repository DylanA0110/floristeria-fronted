import api from './api';

const BASE_URL = '/Pedido';

export const pedidoService = {
  async getAll() {
    try {
      const response = await api.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener pedido con ID ${id}:`, error);
      throw error;
    }
  },

  async create(pedidoData) {
  try {
    const response = await api.post(BASE_URL, pedidoData);
    // Suponiendo que response.data trae más o menos esos campos, aquí los filtramos o formateamos:
    const data = response.data;
    return {
      id_Pedido: data.id_Pedido ?? 0,
      nombre_Cliente: data.nombre_Cliente ?? "",
      telefono: data.telefono ?? "",
      descripcion: data.descripcion ?? "",
      fecha_Solicitud: data.fecha_Solicitud ?? "2025-06-25",
      fecha_Entrega: data.fecha_Entrega ?? "2025-06-25",
      enviarseA: data.enviarseA ?? "",
      estado: data.estado ?? ""
    };
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
},

async update(id, pedidoData) {
  try {
    const response = await api.put(`${BASE_URL}/${id}`, pedidoData);
    const data = response.data;
    return {
      id_Pedido: data.id_Pedido ?? 0,
      id_Cliente: data.id_Cliente ?? 0,
      descripcion: data.descripcion ?? "",
      fecha_Solicitud: data.fecha_Solicitud ?? "2025-06-25",
      fecha_Entrega: data.fecha_Entrega ?? "2025-06-25",
      enviarseA: data.enviarseA ?? "",
      estado: data.estado ?? ""
    };
  } catch (error) {
    console.error(`Error al actualizar pedido con ID ${id}:`, error);
    throw error;
  }
},

  async delete(id) {
    try {
      await api.delete(`${BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar pedido con ID ${id}:`, error);
      throw error;
    }
  }
};