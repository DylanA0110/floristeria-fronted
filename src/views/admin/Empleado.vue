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
            placeholder="Buscar por nombre o correo..."
            class="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border border-blueGray-300 text-sm focus:outline-none focus:ring"
          />
          <button
            class="bg-emerald-500 text-white uppercase text-xs font-bold px-4 py-2 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none transition-all duration-150"
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

      <table v-if="!isLoading && !error" class="w-full bg-transparent border-collapse">
  <thead class="thead-light">
    <tr>
      <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">ID Empleado</th>
      <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">ID Usuario</th>
      <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">Nombre Completo</th>
      <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">Sexo</th>
      <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">Correo</th>
      <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">Teléfono</th>
      <th class="px-6 py-3 text-xs uppercase font-semibold text-left" :class="[color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-emerald-800 text-emerald-300 border-emerald-700']">Fecha de Nacimiento</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-if="paginatedEmployees.length === 0 && !isLoading">
      <td colspan="9" class="text-center py-4 text-blueGray-500">No hay empleados que coincidan con la búsqueda.</td>
    </tr>
    <tr v-for="emp in paginatedEmployees" :key="emp.id_Empleado">
      <td class="px-6 py-4 text-sm whitespace-nowrap">{{ emp.id_Empleado }}</td>
      <td class="px-6 py-4 text-sm whitespace-nowrap">{{ emp.id_Usuario || 'N/A' }}</td>
      <td class="px-6 py-4 text-sm whitespace-nowrap">
        {{ emp.primerNombre }} {{ emp.segundoNombre || '' }} {{ emp.primerApellido }} {{ emp.segundoApellido || '' }}
      </td>
      <td class="px-6 py-4 text-sm whitespace-nowrap">
        {{ emp.sexo === 'M' ? 'Masculino' : emp.sexo === 'F' ? 'Femenino' : 'No definido' }}
      </td>
      <td class="px-6 py-4 text-sm whitespace-nowrap">{{ emp.correo || 'No definido' }}</td>
      <td class="px-6 py-4 text-sm whitespace-nowrap">{{ emp.telefono || 'No definido' }}</td>
      <td class="px-6 py-4 text-sm whitespace-nowrap">
        {{ emp.fechaDeNac ? new Date(emp.fechaDeNac).toLocaleDateString() : 'No definido' }}
      </td>
      
      <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
        <button
          class="bg-blueGray-500 text-white px-3 py-1 text-xs rounded hover:shadow-md"
          @click="openEditModal(emp)"
        >
          Editar
        </button>
        <button
          class="bg-red-500 text-white px-3 py-1 text-xs ml-1 rounded hover:shadow-md"
          @click="confirmDelete(emp.id_Empleado)"
        >
          Eliminar
        </button>
      </td>
    </tr>
  </tbody>
</table>

    </div>

    <div class="rounded-b mt-0 px-4 py-3 border-0" v-if="!isLoading && !error && filteredEmployees.length > 0">
        <div class="flex flex-wrap items-center justify-between">
            <div class="text-xs text-blueGray-500">
                Mostrando {{ paginatedEmployees.length }} de {{ filteredEmployees.length }} registros. Página {{ currentPage }} de {{ totalPages }}
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
    <div v-if="showModal" class="fixed inset-0 bg-black opacity-25 z-40"></div>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="relative w-auto max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg">
          <div class="flex items-start justify-between p-5 border-b">
            <h3 class="text-3xl font-semibold">
              {{ isEditing ? 'Editar Empleado' : 'Agregar Nuevo Empleado' }}
            </h3>
            <button @click="closeModal" class="text-3xl leading-none">&times;</button>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitEmployeeForm">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <input
      v-model="currentEmployee.primerNombre"
      placeholder="Primer Nombre *"
      required
      class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
    />
    <input
      v-model="currentEmployee.segundoNombre"
      placeholder="Segundo Nombre"
      class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <input
      v-model="currentEmployee.primerApellido"
      placeholder="Primer Apellido *"
      required
      class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
    />
    <input
      v-model="currentEmployee.segundoApellido"
      placeholder="Segundo Apellido"
      class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <select
      v-model="currentEmployee.sexo"
      class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
    >
      <option value="">Sexo</option>
      <option value="M">Masculino</option>
      <option value="F">Femenino</option>
    </select>
    <input
      v-model="currentEmployee.correo"
      type="email"
      placeholder="Correo *"
      required
      class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
    />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <input
      v-model="currentEmployee.telefono"
      type="tel"
      placeholder="Teléfono"
      class="shadow border rounded w-full px-3 py-2 text-blueGray-700"
    />
    <input
      v-model="currentEmployee.fechaDeNac"
      type="date"
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
import { useEmpleadosStore } from '../../store/empleado.js';

const props = defineProps({
  color: { type: String, default: 'light' }
});

const store = useEmpleadosStore();

const employees = computed(() => store.employees);
const isLoading = computed(() => store.isLoading);
const isSaving = computed(() => store.isSaving);
const error = computed(() => store.error);

const searchTerm = ref('');
const filteredEmployees = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(8);

const showModal = ref(false);
const isEditing = ref(false);

// Objeto de empleado inicial, con todos sus campos
const getInitialEmployee = () => ({
  id_Empleado: null,
  id_Usuario: null,
  primerNombre: '',
  segundoNombre: '',
  primerApellido: '',
  segundoApellido: '',
  sexo: '',
  correo: '',
  userName: '',
  contrasena: '',
  telefono: '',
  fechaDeNac: '',
  rol: ''
});

const currentEmployee = ref(getInitialEmployee());

onMounted(async () => {
  await store.fetchAllEmpleados();
  filterEmployeesLocal();
});

watch([employees, searchTerm], () => {
  filterEmployeesLocal();
});

const totalPages = computed(() => {
  if (filteredEmployees.value.length === 0) return 1;
  return Math.ceil(filteredEmployees.value.length / itemsPerPage.value);
});

const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredEmployees.value.slice(start, end);
});

function filterEmployeesLocal() {
  const term = searchTerm.value.toLowerCase();
  if (!term) {
    filteredEmployees.value = [...employees.value];
  } else {
    filteredEmployees.value = employees.value.filter(emp =>
      (emp.primerNombre?.toLowerCase().includes(term)) ||
      (emp.primerApellido?.toLowerCase().includes(term)) ||
      (emp.correo?.toLowerCase().includes(term))
    );
  }
  currentPage.value = 1;
}

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

function openAddModal() {
  isEditing.value = false;
  currentEmployee.value = getInitialEmployee(); // Usamos la función para resetear
  showModal.value = true;
}

// CORRECCIÓN AQUÍ: Asegúrate de copiar TODOS los campos necesarios
function openEditModal(emp) {
  isEditing.value = true;
  currentEmployee.value = {
    id_Empleado: emp.id_Empleado,
    id_Usuario: emp.id_Usuario, // Campo que faltaba
    primerNombre: emp.primerNombre || '',
    segundoNombre: emp.segundoNombre || '',
    primerApellido: emp.primerApellido || '',
    segundoApellido: emp.segundoApellido || '',
    sexo: emp.sexo || '',
    correo: emp.correo || '',
    userName: emp.userName || '', // Campo que faltaba
    contrasena: '', // La contraseña se deja en blanco a propósito
    telefono: emp.telefono || '',
    fechaDeNac: emp.fechaDeNac ? emp.fechaDeNac.split('T')[0] : '',
    rol: emp.rol || '' // Campo que faltaba
  };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

async function submitEmployeeForm() {
    // No necesitamos id_Usuario aquí, ya que el backend debería manejar la lógica
    // de crear/actualizar el usuario asociado al empleado.
    // Solo enviamos los datos que el usuario puede cambiar.
    const dataToSend = {
        primerNombre: currentEmployee.value.primerNombre,
        segundoNombre: currentEmployee.value.segundoNombre || null,
        primerApellido: currentEmployee.value.primerApellido,
        segundoApellido: currentEmployee.value.segundoApellido || null,
        sexo: currentEmployee.value.sexo || null,
        correo: currentEmployee.value.correo,
        userName: currentEmployee.value.userName,
        telefono: currentEmployee.value.telefono || null,
        fechaDeNac: currentEmployee.value.fechaDeNac ? new Date(currentEmployee.value.fechaDeNac).toISOString() : null,
        rol: currentEmployee.value.rol,
    };

    // Solo añade la contraseña al payload si no estamos editando O si se escribió una nueva
    if (!isEditing.value || (isEditing.value && currentEmployee.value.contrasena)) {
        dataToSend.contrasena = currentEmployee.value.contrasena;
    }

    try {
        let ok;
        if (isEditing.value) {
            // CORRECCIÓN PRINCIPAL: Pasa el ID como primer argumento
            ok = await store.updateEmpleado(currentEmployee.value.id_Empleado, dataToSend);
        } else {
            // Para agregar, pasamos el objeto completo
            ok = await store.addEmpleado(dataToSend);
        }

        if (ok) {
            await store.fetchAllEmpleados();
            filterEmployeesLocal();
            closeModal();
        }
    } catch (err) {
        console.error("Error al enviar formulario de empleado:", err);
    }
}

function confirmDelete(id) {
  if (confirm('¿Seguro que deseas eliminar este empleado?')) {
    store.deleteEmpleado(id).then(async () => {
      await store.fetchAllEmpleados();
      filterEmployeesLocal();
    });
  }
}
</script>
<style scoped>
/* Ajustes si quieres */
</style>