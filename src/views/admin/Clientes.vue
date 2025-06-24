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
            Gestión de Clientes
          </h3>
        </div>
        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <input
            type="text"
            v-model="searchTerm"
            @input="filterClientsLocal"
            placeholder="Buscar por teléfono o nombre..."
            class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full md:w-auto pr-10"
          />
          <button
            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-2"
            type="button"
            @click="openAddModal"
          >
            Agregar Cliente
          </button>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <div v-if="isLoading" class="text-center py-4 text-blueGray-600">Cargando clientes...</div>
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
              Nombre del Cliente
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
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredClients.length === 0 && !isLoading">
            <td :colspan="4" class="text-center py-4 text-blueGray-500">
              No hay clientes que coincidan con la búsqueda.
            </td>
          </tr>
          <tr v-for="client in filteredClients" :key="client.Id_cliente">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
              {{ client.Id_cliente }}
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ client.Nombre_Cliente }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ client.Telefono || 'N/A' }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
              <button
                class="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                @click="openEditModal(client)"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-1"
                type="button"
                @click="confirmDelete(client.Id_cliente)"
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
              {{ isEditing ? 'Editar Cliente' : 'Agregar Nuevo Cliente' }}
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
            <form @submit.prevent="submitClientForm">
              <div class="mb-4">
                <label class="block text-blueGray-600 text-sm font-bold mb-2" for="nombreCliente">
                  Nombre del Cliente
                </label>
                <input
                  type="text"
                  id="nombreCliente"
                  v-model="currentClient.Nombre_Cliente"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="block text-blueGray-600 text-sm font-bold mb-2" for="telefono">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  v-model="currentClient.Telefono"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-blueGray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
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
    clients: {
      type: Array,
      default: () => [],
      required: true, // Se espera que el padre pase la lista de clientes
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
      filteredClients: [], // Se calculará a partir de 'clients' prop y 'searchTerm'
      showModal: false,
      isEditing: false,
      currentClient: { // Modelo para el formulario de agregar/editar
        Id_cliente: null,
        Telefono: '',
        Nombre_Cliente: '',
      },
    };
  },
  watch: {
    // Observa cambios en la prop 'clients' para recalcular el filtro
    clients: {
      handler() {
        this.filterClientsLocal();
      },
      immediate: true, // Ejecutar la primera vez al montar el componente
    },
    // Observa cambios en el término de búsqueda para actualizar la tabla
    searchTerm: {
        handler() {
            this.filterClientsLocal();
        },
        immediate: true,
    }
  },
  methods: {
    // --- Métodos para Abrir/Cerrar Modal y Preparar Datos ---
    openAddModal() {
      this.isEditing = false;
      // Reinicia el formulario para un nuevo cliente
      this.currentClient = {
        Id_cliente: null,
        Telefono: '',
        Nombre_Cliente: '',
      };
      this.showModal = true;
    },
    openEditModal(client) {
      this.isEditing = true;
      // Clona el cliente
      this.currentClient = {
        ...client,
      };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    // --- Métodos de Emisión de Eventos CRUD ---
    submitClientForm() {
      // Prepara el objeto cliente para enviarlo al componente padre
      const clientData = { ...this.currentClient };

      if (this.isEditing) {
        this.$emit('edit-client', clientData);
      } else {
        this.$emit('add-client', clientData);
      }
      // El modal se cerrará cuando el padre reciba el evento y la operación sea exitosa
      // o podrías cerrarlo aquí si prefieres, dependiendo del feedback.
      // this.closeModal(); // Considerar cerrar aquí si la validación del formulario es solo frontal
    },
    confirmDelete(id) {
      if (confirm('¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer.')) {
        this.$emit('delete-client', id);
      }
    },
    filterClientsLocal() {
      if (!this.searchTerm) {
        this.filteredClients = [...this.clients];
      } else {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        this.filteredClients = this.clients.filter(client =>
          client.Nombre_Cliente.toLowerCase().includes(lowerCaseSearchTerm) ||
          client.Telefono.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
    },
  },
};
</script>