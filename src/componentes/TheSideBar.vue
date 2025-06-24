<template>
  <div
    :class="{ '-translate-x-full': !isSidebarOpen && !isDesktop, 'w-16': !isSidebarOpen && isDesktop, 'w-64': isSidebarOpen || !isDesktop }"
    class="fixed left-0 top-0 h-full bg-sidebarBgLight p-4 z-50 sidebar-menu transition-all dark:bg-darkBackground dark:text-white"
  >
    <a href="#" class="flex items-center pb-4 border-b border-b-gray-800 dark:border-b-gray-700" @click.prevent="emitToggleSidebar">
      <img src="../assets/images/logoTransparente.png" alt="Logo" class="w-8 h-8 rounded object-cover" />
      <span class="text-lg font-bold text-sidebarTextLight ml-3 dark:text-white" :class="{ 'hidden': !isSidebarOpen }">Floristería</span>
    </a>
    <ul class="mt-4">
      <li class="mb-1 group" :class="{ 'active': activeMenuItem === 'dashboard' }">
        <router-link to="/" class="flex items-center py-2 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.active]:bg-sidebarItemActiveBgLight group-[.active]:text-black dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.active]:bg-darkCard dark:group-[.active]:text-white">
          <i class="ri-home-2-line mr-3 text-lg"></i>
          <span class="text-sm" :class="{ 'hidden': !isSidebarOpen }">Cerrar Sesión</span>
        </router-link>
      </li>

      <li class="mb-1 group" :class="{ 'selected': isAuthDropdownOpen }">
        <a href="#" @click.prevent="toggleAuthDropdown" class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100">
          <i class="ri-instance-line mr-3 text-lg"></i>
          <span class="text-sm" :class="{ 'hidden': !isSidebarOpen }">Pedido</span>
          <i class="ri-arrow-right-s-line ml-auto" :class="{ 'rotate-90': isAuthDropdownOpen, 'hidden': !isSidebarOpen }"></i>
        </a>
        <ul class="pl-7 mt-2" :class="{ 'hidden': !isAuthDropdownOpen || !isSidebarOpen }">
          </ul>
      </li>

      <li class="mb-1 group" :class="{ 'selected': isServicesDropdownOpen }">
        <a href="#" @click.prevent="toggleServicesDropdown" class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100">
          <i class="ri-flashlight-line mr-3 text-lg"></i>
          <span class="text-sm" :class="{ 'hidden': !isSidebarOpen }">Factura</span>
          <i class="ri-arrow-right-s-line ml-auto" :class="{ 'rotate-90': isServicesDropdownOpen, 'hidden': !isSidebarOpen }"></i>
        </a>
        <ul class="pl-7 mt-2" :class="{ 'hidden': !isServicesDropdownOpen || !isSidebarOpen }">
          </ul>
      </li>
        <li class="mb-1 group" :class="{ 'selected': isServicesDropdownOpen }">
        <a href="#" @click.prevent="toggleServicesDropdown" class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100">
          <i class="ri-flashlight-line mr-3 text-lg"></i>
          <span class="text-sm" :class="{ 'hidden': !isSidebarOpen }">Empleado</span>
          <i class="ri-arrow-right-s-line ml-auto" :class="{ 'rotate-90': isServicesDropdownOpen, 'hidden': !isSidebarOpen }"></i>
        </a>
        <ul class="pl-7 mt-2" :class="{ 'hidden': !isServicesDropdownOpen || !isSidebarOpen }">
          </ul>
      </li>
        <li class="mb-1 group" :class="{ 'selected': isServicesDropdownOpen }">
        <a href="#" @click.prevent="toggleServicesDropdown" class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100">
          <i class="ri-flashlight-line mr-3 text-lg"></i>
          <span class="text-sm" :class="{ 'hidden': !isSidebarOpen }">Arreglos</span>
          <i class="ri-arrow-right-s-line ml-auto" :class="{ 'rotate-90': isServicesDropdownOpen, 'hidden': !isSidebarOpen }"></i>
        </a>
        <ul class="pl-7 mt-2" :class="{ 'hidden': !isServicesDropdownOpen || !isSidebarOpen }">
          </ul>
      </li>

    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue' // Added defineEmits

defineProps(['isSidebarOpen', 'activeMenuItem', 'isDesktop']) // Added isDesktop prop

const emit = defineEmits(['toggle-sidebar-collapse']) // Defined the custom event

const isAuthDropdownOpen = ref(false)
const isServicesDropdownOpen = ref(false)

const toggleAuthDropdown = () => {
  isAuthDropdownOpen.value = !isAuthDropdownOpen.value
}

const toggleServicesDropdown = () => {
  isServicesDropdownOpen.value = !isServicesDropdownOpen.value
}

// New method to emit the custom event when the logo is clicked
const emitToggleSidebar = () => {
  emit('toggle-sidebar-collapse')
}
</script>

<style scoped>
/* Ensure smooth transition for width and transform */
.sidebar-menu {
  transition: width 0.3s ease, transform 0.3s ease;
}
</style>