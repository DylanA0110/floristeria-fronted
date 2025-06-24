<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Gestión de Empleados
          </h3>
        </div>
        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <input
            type="text"
            v-model="searchTerm"
            @input="filterEmployeesLocal"
            placeholder="Buscar por nombre, correo o usuario..."
            class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full md:w-auto pr-10"
          />
          <button
            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-2"
            type="button"
            @click="openAddModal"
          >
            Agregar Empleado
          </button>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <div v-if="isLoading" class="text-center py-4 text-blueGray-600">Cargando empleados...</div>
      <div v-if="error" class="text-center py-4 text-red-500">Error: {{ error }}</div>

      <table v-if="!isLoading && !error" class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              ID
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Nombre Completo
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Usuario
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Email
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Teléfono
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              F. Nacimiento
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Rol
            </th>
             <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Aprobado
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredEmployees.length === 0 && !isLoading">
            <td :colspan="9" class="text-center py-4 text-blueGray-500">
              No hay empleados que coincidan con la búsqueda.
            </td>
          </tr>
          <tr v-for="employee in filteredEmployees" :key="employee.Id_Empleado">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
              {{ employee.Id_Empleado }}
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ employee.PrimerNombre }} {{ employee.SegundoNombre || '' }}
              {{ employee.PrimerApellido }} {{ employee.SegundoApellido || '' }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ employee.UserName }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ employee.Correo }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ employee.Telefono || 'N/A' }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ employee.FechaDeNac ? formatDate(employee.FechaDeNac) : 'N/A' }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ getRoleName(employee.RolId) }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ employee.EsAprobado ? 'Sí' : 'No' }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
              <button
                class="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                @click="openEditModal(employee)"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-1"
                type="button"
                @click="confirmDelete(employee.Id_Empleado)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
    >
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
          >
            <h3 class="text-3xl font-semibold">
              {{ isEditing ? 'Editar Empleado' : 'Agregar Nuevo Empleado' }}
            </h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-blueGray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              @click="closeModal"
            >
              <span class="text-blueGray-600 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div class="relative p-6 flex-auto">
            <form @submit.prevent="submitEmployeeForm">
              <div class="grid grid-cols-2 gap-4">
                <div class="mb-4">
                  <label class="block text-blueGray-600 text-sm font-bold mb-2" for="primerNombre">
                    Primer Nombre
                  </label>
                  <input
                    type="text"
                    id="primerNombre"
                    v-model="currentEmployee.PrimerNombre"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-blueGray-600 text-sm font-bold mb-2" for="segundoNombre">
                    Segundo Nombre
                  </label>
                  <input
                    type="text"
                    id="segundoNombre"
                    v-model="currentEmployee.SegundoNombre"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="mb-4">
                  <label class="block text-blueGray-600 text-sm font-bold mb-2" for="primerApellido">
                    Primer Apellido
                  </label>
                  <input
                    type="text"
                    id="primerApellido"
                    v-model="currentEmployee.PrimerApellido"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-blueGray-600 text-sm font-bold mb-2" for="segundoApellido">
                    Segundo Apellido
                  </label>
                  <input
                    type="text"
                    id="segundoApellido"
                    v-model="currentEmployee.SegundoApellido"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-blueGray-600 text-sm font-bold mb-2" for="sexo">
                  Sexo
                </label>
                <select
                  id="sexo"
                  v-model="currentEmployee.Sexo"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Seleccionar</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-blueGray-600 text-sm font-bold mb-2" for="correo">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="correo"
                  v-model="currentEmployee.Correo"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="block text-blueGray-600 text-sm font-bold mb-2" for="userName">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="userName"
                  v-model="currentEmployee.UserName"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="block text-blueGray-600 text-sm font-bold mb-2" for="contrasena">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contrasena"
                  v-model="currentEmployee.Contrasena"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                  :required="!isEditing"
                />
                 <p v-if="isEditing" class="text-xs text-blueGray-500 mt-1">Dejar en blanco para no cambiar la contraseña.</p>
              </div>
              <div class="mb-4">
                <label class="block text-blueGray-600 text-sm font-bold mb-2" for="telefono">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  v-model="currentEmployee.Telefono"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div class="mb-4">
                <label class="block text-blueGray-600 text-sm font-bold mb-2" for="fechaDeNac">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="fechaDeNac"
                  v-model="currentEmployee.FechaDeNac"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div class="mb-4">
                <label class="block text-blueGray-600 text-sm font-bold mb-2" for="rolId">
                  Rol
                </label>
                <select
                  id="rolId"
                  v-model="currentEmployee.RolId"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Seleccionar Rol</option>
                  <option v-for="rol in roles" :key="rol.Id_Rol" :value="rol.Id_Rol">
                    {{ rol.Nombre }}
                  </option>
                </select>
              </div>
              <div class="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="esAprobado"
                  v-model="currentEmployee.EsAprobado"
                  class="form-checkbox h-5 w-5 text-emerald-600"
                />
                <label class="ml-2 text-blueGray-600 text-sm font-bold" for="esAprobado">
                  Aprobado
                </label>
              </div>

              <div
                class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
              >
                <button
                  class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  @click="closeModal"
                >
                  Cancelar
                </button>
                <button
                  class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  :disabled="isSaving"
                >
                  {{ isSaving ? 'Procesando...' : (isEditing ? 'Guardar Cambios' : 'Agregar') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      default: "light",
      type: String,
    },
    // Datos que se pasarán desde el componente padre
    employees: {
      type: Array,
      default: () => [],
      required: true, // Se espera que el padre pase la lista de empleados
    },
    roles: {
      type: Array,
      default: () => [],
      required: true, // Se espera que el padre pase la lista de roles
    },
    isLoading: { // Para indicar si los datos se están cargando (desde el padre)
      type: Boolean,
      default: false,
    },
    isSaving: { // Para indicar si una operación de guardar/eliminar está en curso (desde el padre)
      type: Boolean,
      default: false,
    },
    error: { // Para mostrar errores (desde el padre)
      type: String,
      default: null,
    },
  },
  data() {
    return {
      searchTerm: '',
      filteredEmployees: [], // Se calculará a partir de 'employees' prop y 'searchTerm'
      showModal: false,
      isEditing: false,
      currentEmployee: { // Modelo para el formulario de agregar/editar
        Id_Empleado: null,
        PrimerNombre: '',
        SegundoNombre: null,
        PrimerApellido: '',
        SegundoApellido: null,
        Sexo: null,
        Correo: '',
        UserName: '',
        Contrasena: '', // La contraseña se manejará cuidadosamente, no se cargará al editar
        Telefono: null,
        FechaDeNac: null,
        EsAprobado: false,
        RolId: null,
      },
    };
  },
  watch: {
    // Observa cambios en la prop 'employees' para recalcular el filtro
    employees: {
      handler() {
        this.filterEmployeesLocal();
      },
      immediate: true, // Ejecutar la primera vez al montar el componente
    },
    // Observa cambios en el término de búsqueda para actualizar la tabla
    searchTerm: {
        handler() {
            this.filterEmployeesLocal();
        },
        immediate: true,
    }
  },
  methods: {
    getRoleName(roleId) {
      const role = this.roles.find(r => r.Id_Rol === roleId);
      return role ? role.Nombre : 'Desconocido';
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        // Asegúrate de que la fecha tenga el formato ISO si viene de la BD
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Formato local
      } catch (e) {
        console.error("Error al formatear fecha:", dateString, e);
        return dateString; // Devuelve la cadena original si hay error
      }
    },
    // --- Métodos para Abrir/Cerrar Modal y Preparar Datos ---
    openAddModal() {
      this.isEditing = false;
      // Reinicia el formulario para un nuevo empleado
      this.currentEmployee = {
        Id_Empleado: null,
        PrimerNombre: '',
        SegundoNombre: null,
        PrimerApellido: '',
        SegundoApellido: null,
        Sexo: null,
        Correo: '',
        UserName: '',
        Contrasena: '',
        Telefono: null,
        FechaDeNac: null,
        EsAprobado: false,
        RolId: null,
      };
      this.showModal = true;
    },
    openEditModal(employee) {
      this.isEditing = true;
      // Clona el empleado y formatea la fecha para el input type="date"
      this.currentEmployee = {
        ...employee,
        SegundoNombre: employee.SegundoNombre || '', // Asegura string vacío para input
        SegundoApellido: employee.SegundoApellido || '', // Asegura string vacío para input
        Sexo: employee.Sexo || '', // Asegura string vacío para select
        Telefono: employee.Telefono || '', // Asegura string vacío para input
        // Formatear FechaDeNac a "YYYY-MM-DD" si existe, de lo contrario vacío
        FechaDeNac: employee.FechaDeNac ? new Date(employee.FechaDeNac).toISOString().split('T')[0] : '',
      };
      this.currentEmployee.Contrasena = ''; // Siempre limpiar contraseña al editar
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    // --- Métodos de Emisión de Eventos CRUD ---
    submitEmployeeForm() {
      // Prepara el objeto empleado para enviarlo al componente padre
      const employeeData = { ...this.currentEmployee };

      // Limpia campos vacíos para que sean null o se eliminen si la API lo requiere
      if (employeeData.SegundoNombre === '') employeeData.SegundoNombre = null;
      if (employeeData.SegundoApellido === '') employeeData.SegundoApellido = null;
      if (employeeData.Sexo === '') employeeData.Sexo = null;
      if (employeeData.Telefono === '') employeeData.Telefono = null;
      if (employeeData.FechaDeNac === '') employeeData.FechaDeNac = null;

      // Si es edición y la contraseña está vacía, no enviarla al padre para que la API no la cambie
      if (this.isEditing && employeeData.Contrasena === '') {
        delete employeeData.Contrasena;
      }

      if (this.isEditing) {
        this.$emit('edit-employee', employeeData);
      } else {
        this.$emit('add-employee', employeeData);
      }
      // El modal se cerrará cuando el padre reciba el evento y la operación sea exitosa
      // o podrías cerrarlo aquí si prefieres, dependiendo del feedback.
      // this.closeModal(); // Considerar cerrar aquí si la validación del formulario es solo frontal
    },
    confirmDelete(id) {
      if (confirm('¿Estás seguro de que quieres eliminar este empleado? Esta acción no se puede deshacer.')) {
        this.$emit('delete-employee', id);
      }
    },
    filterEmployeesLocal() {
      if (!this.searchTerm) {
        this.filteredEmployees = [...this.employees];
      } else {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        this.filteredEmployees = this.employees.filter(employee =>
          employee.PrimerNombre.toLowerCase().includes(lowerCaseSearchTerm) ||
          (employee.SegundoNombre && employee.SegundoNombre.toLowerCase().includes(lowerCaseSearchTerm)) ||
          employee.PrimerApellido.toLowerCase().includes(lowerCaseSearchTerm) ||
          (employee.SegundoApellido && employee.SegundoApellido.toLowerCase().includes(lowerCaseSearchTerm)) ||
          employee.Correo.toLowerCase().includes(lowerCaseSearchTerm) ||
          employee.UserName.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
    },
  },
};
</script>