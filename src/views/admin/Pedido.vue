<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-blueGray-700">
            Gestión de Pedidos
          </h3>
        </div>
        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <input
            type="text"
            v-model="searchTerm"
            @input="filterPedidosLocal"
            placeholder="Buscar por cliente o descripción..."
            class="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border border-blueGray-300 text-sm focus:outline-none focus:ring"
          />
          <button
            class="bg-emerald-500 text-white uppercase text-xs font-bold px-4 py-2 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none transition-all duration-150"
            @click="openAddModal"
          >
            Agregar Pedido
          </button>
        </div>
      </div>
    </div>

    <div class="block w-full overflow-x-auto">
      <div v-if="isLoading" class="text-center py-4 text-blueGray-600">Cargando pedidos...</div>
      <div v-if="error" class="text-center py-4 text-red-500">Error: {{ error }}</div>

      <table v-if="!isLoading && !error" class="w-full bg-transparent border-collapse">
        <thead class="thead-light">
          <tr>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">ID</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Cliente</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Teléfono</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Descripción</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Solicitud</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Entrega</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Dirección</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Estado</th>
            <th class="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedPedidos.length === 0 && !isLoading">
            <td colspan="9" class="text-center py-4 text-blueGray-500">No hay pedidos registrados</td>
          </tr>
          <tr v-for="pedido in paginatedPedidos" :key="pedido.id_Pedido">
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ pedido.id_Pedido }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ pedido.nombre_Cliente || 'N/A' }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ pedido.telefono || 'N/A' }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ pedido.descripcion || 'N/A' }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ formatDate(pedido.fecha_Solicitud) }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ formatDate(pedido.fecha_Entrega) }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ pedido.enviarseA || 'N/A' }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">
              <span :class="getEstadoClass(pedido.estado)">{{ pedido.estado || 'pendiente' }}</span>
            </td>
            <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                            <button
                class="bg-red-500 text-white px-3 py-1 text-xs ml-1 rounded hover:shadow-md"
                @click="confirmDelete(pedido.id_Pedido)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="rounded-b mt-0 px-4 py-3 border-0" v-if="!isLoading && !error && filteredPedidos.length > 0">
      <div class="flex flex-wrap items-center justify-between">
        <div class="text-xs text-blueGray-500">
          Mostrando {{ paginatedPedidos.length }} de {{ filteredPedidos.length }} registros
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

    <!-- Modal para agregar/editar -->
    <div v-if="showModal" class="fixed inset-0 bg-black opacity-25 z-40"></div>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="relative w-auto max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg">
          <div class="flex items-start justify-between p-5 border-b">
            <h3 class="text-3xl font-semibold">
              {{ isEditing ? 'Editar Pedido' : 'Nuevo Pedido' }}
            </h3>
            <button @click="closeModal" class="text-3xl leading-none">&times;</button>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitPedidoForm">
              <div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>

  <template v-if="!isEditing">
<select
  v-model.number="currentPedido.id_Cliente"
  required
  class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
>
  <option :value="''" disabled>Seleccione un cliente</option>
  <option
    v-for="cliente in clientes"
    :key="cliente.id_Cliente"
    :value="cliente.id_Cliente"
  >
    {{ cliente.Nombre_Cliente }} - {{ cliente.Telefono }}
  </option>
</select>


  </template>

  <template v-else>
    <div class="py-2 text-blueGray-700">
      <div><strong>Cliente:</strong> {{ clientes.find(c => c.id_Cliente === currentPedido.id_Cliente)?.Nombre_Cliente || 'N/A' }}</div>
      <div><strong>Teléfono:</strong> {{ clientes.find(c => c.id_Cliente === currentPedido.id_Cliente)?.Telefono || 'N/A' }}</div>
    </div>
  </template>
</div>



              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <textarea
                  v-model="currentPedido.descripcion"
                  placeholder="Descripción del pedido"
                  required
                  class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
                  rows="3"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Fecha Solicitud *</label>
                  <input
                    v-model="currentPedido.fecha_Solicitud"
                    type="date"
                    required
                    class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Fecha Entrega *</label>
                  <input
                    v-model="currentPedido.fecha_Entrega"
                    type="date"
                    required
                    class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
                  />
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Dirección de envío</label>
                <input
                  v-model="currentPedido.enviarseA"
                  placeholder="Dirección para entrega"
                  class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
                <select
                  v-model="currentPedido.estado"
                  required
                  class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
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
                  {{ isSaving ? 'Guardando...' : 'Guardar' }}
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
import { usePedidosStore } from '../../store/pedido.js';
import { useClientesStore } from '../../store/cliente.js';

const pedidosStore = usePedidosStore();
const clientesStore = useClientesStore();

const pedidos = computed(() => pedidosStore.pedidos);
const clientes = computed(() => clientesStore.clientes);
const isLoading = computed(() => pedidosStore.isLoading);
const isSaving = computed(() => pedidosStore.isSaving);
const error = computed(() => pedidosStore.error);

// Búsqueda y paginación
const searchTerm = ref('');
const filteredPedidos = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Modal
const showModal = ref(false);
const isEditing = ref(false);
const currentPedido = ref({
  id_Pedido: null,
  id_Cliente:  '',
  descripcion: '',
  fecha_Solicitud: '',
  fecha_Entrega: '',
  enviarseA: '',
  estado: 'pendiente'
});

// Cargar datos iniciales
onMounted(async () => {
  await pedidosStore.fetchAllPedidos();
  await clientesStore.fetchAllClientes();
  filterPedidosLocal();
});

// Filtrar pedidos
function filterPedidosLocal() {
  const term = searchTerm.value.toLowerCase();
  filteredPedidos.value = pedidos.value.filter(pedido => 
    (pedido.nombre_Cliente?.toLowerCase().includes(term) ||
    (pedido.descripcion?.toLowerCase().includes(term))
  ))
  currentPage.value = 1;
}

// Paginación
const totalPages = computed(() => Math.ceil(filteredPedidos.value.length / itemsPerPage.value));
const paginatedPedidos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredPedidos.value.slice(start, start + itemsPerPage.value);
});

function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++; }
function prevPage() { if (currentPage.value > 1) currentPage.value--; }

// Modal functions
function openAddModal() {
  isEditing.value = false;
  currentPedido.value = {
    id_Pedido: null,
    id_Cliente: null,
    descripcion: '',
    fecha_Solicitud: new Date().toISOString().split('T')[0],
    fecha_Entrega: '',
    enviarseA: '',
    estado: 'pendiente'
  };
  showModal.value = true;
}

function openEditModal(pedido) {
  isEditing.value = true;
  currentPedido.value = {
    id_Pedido: pedido.id_Pedido,
    id_Cliente: pedido.id_Cliente,
    descripcion: pedido.descripcion,
    fecha_Solicitud: pedido.fecha_Solicitud.split('T')[0],
    fecha_Entrega: pedido.fecha_Entrega.split('T')[0],
    enviarseA: pedido.enviarseA,
    estado: pedido.estado
  };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
function getClienteSeleccionado() {
  return clientes.value.find(c => c.id_Cliente === currentPedido.value.id_Cliente);
}


async function submitPedidoForm() {
  try {
    const cliente = getClienteSeleccionado();
    if (!cliente) {
      alert('Debe seleccionar un cliente válido');
      return;
    }

 const pedidoData = {
  id_Cliente: currentPedido.value.id_Cliente,
  nombre_Cliente: cliente.Nombre_Cliente,
  telefono: cliente.Telefono,
  descripcion: currentPedido.value.descripcion,
  fecha_Solicitud: currentPedido.value.fecha_Solicitud,
  fecha_Entrega: currentPedido.value.fecha_Entrega,
  enviarseA: currentPedido.value.enviarseA,
  estado: currentPedido.value.estado
};



    if (isEditing.value) {
      await pedidosStore.updatePedido(currentPedido.value.id_Pedido, pedidoData);
    } else {
      await pedidosStore.addPedido(pedidoData);
    }

    await pedidosStore.fetchAllPedidos();
    filterPedidosLocal();
    closeModal();
  } catch (err) {
    console.error('Error al guardar pedido:', err);
  }
}
// Helpers
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function getEstadoClass(estado) {
  const classes = {
    pendiente: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs',
    en_proceso: 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs',
    completado: 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs',
    cancelado: 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs'
  };
  return classes[estado] || classes.pendiente;
}

// Confirmar eliminación
function confirmDelete(id) {
  if (confirm('¿Seguro que deseas eliminar este pedido?')) {
    pedidosStore.deletePedido(id).then(() => {
      pedidosStore.fetchAllPedidos();
      filterPedidosLocal();
    });
  }
}

// Watch for changes
watch([pedidos, searchTerm], filterPedidosLocal);
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>