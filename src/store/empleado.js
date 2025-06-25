// src/store/empleados.js
import { defineStore } from 'pinia';
import { empleadoService } from '../services/empleadoService.js'; // Asegúrate de la ruta correcta

export const useEmpleadosStore = defineStore('empleados', {
  state: () => ({
    employees: [],
    isLoading: false,
    isSaving: false,
    error: null,
  }),
  actions: {
    /**
     * Carga todos los empleados desde la API.
     */
    async fetchAllEmpleados() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await empleadoService.getAllEmpleados();
        this.employees = data;
      } catch (error) {
        this.error = 'No se pudieron cargar los empleados. ' + (error.message || 'Error desconocido.');
        console.error('Error en fetchAllEmpleados:', error);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Agrega un nuevo empleado.
     * @param {Object} empleadoData Los datos del nuevo empleado.
     */
    async addEmpleado(empleadoData) {
      this.isSaving = true;
      this.error = null;
      try {
        const newEmployee = await empleadoService.createEmpleado(empleadoData);
        this.employees.push(newEmployee); // Agrega el nuevo empleado a la lista
        return true; // Indica éxito
      } catch (error) {
        this.error = 'No se pudo agregar el empleado. ' + (error.response?.data?.message || error.message || 'Error desconocido.');
        console.error('Error en addEmpleado:', error);
        return false; // Indica fallo
      } finally {
        this.isSaving = false;
      }
    },

    async updateEmpleado(id, empleadoData) {
      this.isSaving = true;
      this.error = null;
      
      if (!id) {
        this.error = 'ID de empleado no proporcionado';
        this.isSaving = false;
        return false;
      }

      try {
        await empleadoService.updateEmpleado(id, empleadoData);
        
        // Actualiza el empleado en el estado local
        const index = this.employees.findIndex(emp => emp.id_Empleado === id);
        if (index !== -1) {
          // Mantenemos el ID original y solo actualizamos los demás campos
          this.employees[index] = { 
            ...this.employees[index],
            ...empleadoData,
            id_Empleado: id // Aseguramos que el ID no se modifique
          };
        }
        
        return true;
      } catch (error) {
        this.error = 'No se pudo actualizar el empleado. ' + (error.response?.data?.message || error.message || 'Error desconocido.');
        console.error('Error en updateEmpleado:', error);
        return false;
      } finally {
        this.isSaving = false;
      }
    },

    /**
     * Elimina un empleado.
     * @param {number} id El ID del empleado a eliminar.
     */
    async deleteEmpleado(id) {
      this.isSaving = true; // Podrías usar un estado diferente para "isDeleting" si quieres
      this.error = null;
      try {
        await empleadoService.deleteEmpleado(id);
        this.employees = this.employees.filter(emp => emp.Id_Empleado !== id); // Elimina de la lista local
        return true; // Indica éxito
      } catch (error) {
        this.error = 'No se pudo eliminar el empleado. ' + (error.response?.data?.message || error.message || 'Error desconocido.');
        console.error('Error en deleteEmpleado:', error);
        return false; // Indica fallo
      } finally {
        this.isSaving = false;
      }
    },
  },
});