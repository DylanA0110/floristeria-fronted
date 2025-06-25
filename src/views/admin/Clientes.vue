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
            @input="filterClientesLocal"
            placeholder="Buscar por nombre o teléfono..."
            class="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border border-blueGray-300 text-sm focus:outline-none focus:ring"
          />
          <button
            class="bg-emerald-500 text-white uppercase text-xs font-bold px-4 py-2 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none transition-all duration-150"
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

      <table v-if="!isLoading && !error" class="w-full bg-transparent border-collapse">
        <thead class="thead-light">
          <tr>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">ID Cliente</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">Nombre del Cliente</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">Teléfono</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedClientes.length === 0 && !isLoading">
            <td colspan="4" class="text-center py-4 text-blueGray-500">No hay clientes que coincidan con la búsqueda.</td>
          </tr>
          <tr v-for="cli in paginatedClientes" :key="cli.id_cliente">
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ cli.id_cliente }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ cli.Nombre_Cliente || 'N/A' }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ cli.Telefono || 'N/A' }}</td>
            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
              <button
                class="bg-blueGray-500 text-white px-3 py-1 text-xs rounded hover:shadow-md"
                @click="openEditModal(cli)"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 text-xs ml-1 rounded hover:shadow-md"
                @click="confirmDelete(cli.id_cliente)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="rounded-b mt-0 px-4 py-3 border-0" v-if="!isLoading && !error && filteredClientes.length > 0">
      <div class="flex flex-wrap items-center justify-between">
        <div class="text-xs text-blueGray-500">
          Mostrando {{ paginatedClientes.length }} de {{ filteredClientes.length }} registros. Página {{ currentPage }} de {{ totalPages }}
        </div>
        <div class="flex">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="bg-blueGray-200 text-blueGray-700 px-3 py-1 text-xs rounded-l hover:bg-blueGray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="bg-blueGray-200 text-blueGray-700 px-3 py-1 text-xs rounded-r border-l border-blueGray-300 hover:bg-blueGray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar cliente -->
    <div v-if="showModal" class="fixed inset-0 bg-black opacity-25 z-40"></div>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="relative w-auto max-w-md mx-auto">
        <div class="bg-white rounded-lg shadow-lg">
          <div class="flex items-start justify-between p-5 border-b">
            <h3 class="text-3xl font-semibold">
              {{ isEditing ? 'Editar Cliente' : 'Agregar Nuevo Cliente' }}
            </h3>
            <button @click="closeModal" class="text-3xl leading-none">&times;</button>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitClienteForm">
              <div class="mb-4">
                <input
                  v-model="currentCliente.Nombre_Cliente"
                  placeholder="Nombre del Cliente *"
                  required
                  class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
                />
              </div>
              <div class="mb-4">
                <input
                  v-model="currentCliente.Telefono"
                  type="tel"
                  placeholder="Teléfono"
                  class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
                />
              </div>
            
              
              <div class="flex justify-end pt-4 border-t">
                <button
                  type="button"
                  @click="closeModal"
                  class="mr-2 text-red-500 uppercase font-bold text-sm px-6 py-3 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  :disabled="isSaving"
                  class="bg-emerald-500 text-white px-6 py-3 rounded uppercase font-bold text-sm"
                >
                  {{ isSaving ? 'Procesando...' : (isEditing ? 'Guardar Cambios' : 'Agregar') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useClientesStore } from '../../store/cliente.js';

const props = defineProps({
  color: { type: String, default: 'light' }
});

const store = useClientesStore();

const clientes = computed(() => store.clientes);
const isLoading = computed(() => store.isLoading);
const isSaving = computed(() => store.isSaving);
const error = computed(() => store.error);

const searchTerm = ref('');
const filteredClientes = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(8);

const showModal = ref(false);
const isEditing = ref(false);
const currentCliente = ref({
  id_cliente: null,
  Nombre_Cliente: '',
  Telefono: ''
});

// Cargar datos iniciales
onMounted(async () => {
  await store.fetchAllClientes();
  filterClientesLocal();
});

// Observar cambios en clientes y término de búsqueda
watch([clientes, searchTerm], () => {
  filterClientesLocal();
});

// Calcular total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredClientes.value.length / itemsPerPage.value) || 1;
});

// Obtener clientes paginados
const paginatedClientes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredClientes.value.slice(start, end);
});

// Filtrar clientes localmente
function filterClientesLocal() {
  const term = searchTerm.value.toLowerCase().trim();
  if (!term) {
    filteredClientes.value = [...(clientes.value || [])];
  } else {
    filteredClientes.value = (clientes.value || []).filter(cli =>
      (cli.Nombre_Cliente?.toLowerCase().includes(term)) ||
      (cli.Telefono?.includes(term))
    );
  }
  currentPage.value = 1; // Resetear a primera página al filtrar
}

// Navegación de páginas
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// Manejo del modal
function openAddModal() {
  isEditing.value = false;
  currentCliente.value = {
    id_cliente: null,
    Nombre_Cliente: '',
    Telefono: ''
  };
  showModal.value = true;
}

function openEditModal(cli) {
  isEditing.value = true;
  currentCliente.value = {
    id_cliente: cli.id_cliente,
    Nombre_Cliente: cli.Nombre_Cliente || '',
    Telefono: cli.Telefono || ''
  };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

// Enviar formulario
async function submitClienteForm() 
{
   // Validación básica para modo edición
    if (isEditing.value && !currentCliente.value.id_cliente) {
        console.error('ID del cliente no definido para actualización');
        return;
    }

    const clienteToSent = {
      id_Cliente: currentCliente.value.id_cliente,
      Nombre_Cliente:currentCliente.value.Nombre_Cliente,
      Telefono:currentCliente.value.Telefono

    }

  try {
    console.log(currentCliente.value.id_cliente, clienteToSent);
    if (isEditing.value) {
      await store.updateCliente(currentCliente.value.id_cliente, clienteToSent);
    } else {
      await store.addCliente(clienteToSent);
    }
    await store.fetchAllClientes();
    filterClientesLocal();
    closeModal();
  } catch (error) {
    console.error("Error al guardar cliente:", error);
  }
}

// Confirmar eliminación
function confirmDelete(id) {
  if (confirm('¿Seguro que deseas eliminar este cliente?')) {
    store.deleteCliente(id).then(async () => {
      await store.fetchAllClientes();
      filterClientesLocal();
    });
  }
}
</script>
<style scoped>
/* Estilos personalizados si son necesarios */
</style>