<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <router-link
        class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        to="/admin/dashboard"
      >
        Floristería Sacuanjoche
      </router-link>
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/"
              >
                Floristería Acuanjoche
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Buscar..."
              class="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            />
          </div>
        </form>

        <hr class="my-4 md:min-w-full" />
        <h6
          class="md:min-w-full text-floristeria-darkGreen text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Panel de Administración
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/admin/dashboard"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-floristeria-mediumGreen hover:text-floristeria-darkGreen'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-tv mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Dashboard
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/settings"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-floristeria-mediumGreen hover:text-floristeria-darkGreen'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-tools mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Configuración
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/Empleado"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-floristeria-mediumGreen hover:text-floristeria-darkGreen'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-table mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Empleado
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link to="/admin/Clientes" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-floristeria-mediumGreen hover:text-floristeria-darkGreen'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-map-marked mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Clientes
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link to="/admin/Pedido" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-floristeria-mediumGreen hover:text-floristeria-darkGreen'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-map-marked mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Pedido
              </a>
            </router-link>
          </li>
        </ul>

        <hr class="my-4 md:min-w-full" />
        <h6
          class="md:min-w-full text-floristeria-darkGreen text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Acceso de Usuario
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
         

          <li class="items-center">
            <a
              href="#"
              @click.prevent="handleLogout" class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
            >
              <i class="fas fa-sign-out-alt text-blueGray-300 mr-2 text-sm"></i> Cerrar Sesión
            </a>
          </li>
        </ul>

        <hr class="my-4 md:min-w-full" />
        
        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          
        </ul>
      </div>
      <div class="mt-auto px-4 py-3 border-t border-gray-300 text-center text-sm text-gray-600">
        <span v-if="username">Usuario: {{ username }}</span>
        <span v-else>No has iniciado sesión</span>
      </div>
    </div>
  </nav>
</template>
<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
import { useAuthStore } from '../../store/auth'; // ajusta ruta según tu estructura
import { useRouter } from 'vue-router'; // <--- IMPORTANTE: Importar useRouter
import { ref, computed } from 'vue'; // <--- Importar ref y computed para Composition API

export default {
  // Ya no necesitas 'components' aquí si los importas y usas directamente en template
  // o si los componentes de dropdown se usan dentro de UserDropdown/NotificationDropdown

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    // Estado local reactivo para el sidebar (equivalente a data())
    const collapseShow = ref("hidden");

    // Método para alternar la visibilidad del sidebar (equivalente a methods.toggleCollapseShow)
    const toggleCollapseShow = (classes) => {
      collapseShow.value = classes;
    };

    // En TheSidebar.vue (dentro de setup())
    const username = computed(() => {
      return authStore.username ? authStore.username : 'Invitado'; 
    });

    // Método para cerrar sesión (equivalente a methods.logout, pero con await y mejor manejado)
    const handleLogout = async () => {
      console.log('Intentando cerrar sesión...');
      await authStore.logout(); // *** Usa await aquí para esperar que el store se actualice ***
      
      console.log('Logout completado en el componente. Redirigiendo a /login...');
      router.push('/login'); // Redirige después de que el store se haya actualizado
    };

    return {
      collapseShow,
      toggleCollapseShow,
      username,
      handleLogout,
      // No necesitas retornar NotificationDropdown y UserDropdown si ya los importas
      // y los usas directamente en el template de este componente padre,
      // a menos que este sea el archivo del Layout donde se componen.
      NotificationDropdown, // Si estos son componentes que se usan en el template de ESTE archivo
      UserDropdown,         // entonces se deben retornar para que el template pueda acceder a ellos.
    };
  },
};
</script>