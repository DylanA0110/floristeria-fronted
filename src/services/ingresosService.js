// src/services/ingresosService.js
import api from './api';

export const getIngresoMensualActual = async () => {
  try {
    const response = await api.get('/Ingresos/Ingresos/Mensuales');
    return response.data;
  } catch (error) {
    console.error('Error fetching monthly income:', error);
    throw error;
  }
};

export const getIngresosPorMes = async (año) => {
  try {
    const response = await api.get(`/Ingresos/Ingresos/Anuales?año=${año}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching yearly income:', error);
    throw error;
  }
};