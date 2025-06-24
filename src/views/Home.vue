<template>
  <div :class="{ 'dark': isDarkMode }" class="text-gray-800 font-inter">
    <div
      :class="{ '-translate-x-full': !isSidebarOpen }"
      class="fixed left-0 top-0 w-64 h-full bg-sidebarBgLight p-4 z-50 sidebar-menu transition-transform dark:bg-darkBackground dark:text-white"
    >
      <a href="#" class="flex items-center pb-4 border-b border-b-gray-800 dark:border-b-gray-700">
        <img src="../assets/images/logoTransparente.png" alt="Logo" class="w-8 h-8 rounded object-cover" />
        <span class="text-lg font-bold text-sidebarTextLight ml-3 dark:text-white">Floristería</span>
      </a>
      <ul class="mt-4">
        <li class="mb-1 group" :class="{ 'active': activeMenuItem === 'dashboard' }">
          <router-link to="/" class="flex items-center py-2 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.active]:bg-sidebarItemActiveBgLight group-[.active]:text-black dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.active]:bg-darkCard dark:group-[.active]:text-white">
            <i class="ri-home-2-line mr-3 text-lg"></i>
            <span class="text-sm">Cerrar Session</span>
          </router-link>
        </li>
        <li class="mb-1 group" :class="{ 'selected': isAuthDropdownOpen }">
          <a
            href="#"
            class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.active]:bg-sidebarItemActiveBgLight group-[.active]:text-black group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black sidebar-dropdown-toggle dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.active]:bg-darkCard dark:group-[.active]:text-white dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100"
          >
            <i class="ri-instance-line mr-3 text-lg"></i>
            <span class="text-sm">Pedido</span>
            <i class="ri-arrow-right-s-line ml-auto" :class="{ 'rotate-90': isAuthDropdownOpen }"></i>
          </a>
          <ul class="pl-7 mt-2" :class="{ 'hidden': !isAuthDropdownOpen, 'block': isAuthDropdownOpen }">
          </ul>
        </li>
        <li class="mb-1 group" :class="{ 'selected': isServicesDropdownOpen }">
          <a
            href="#"
            class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.active]:bg-sidebarItemActiveBgLight group-[.active]:text-black group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black sidebar-dropdown-toggle dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.active]:bg-darkCard dark:group-[.active]:text-white dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100"
            @click.prevent="toggleServicesDropdown"
          >
            <i class="ri-flashlight-line mr-3 text-lg"></i>
            <span class="text-sm">Factura</span>
          </a>
          <ul class="pl-7 mt-2" :class="{ 'hidden': !isServicesDropdownOpen, 'block': isServicesDropdownOpen }">
          </ul>
        </li>
        <li class="mb-1 group" :class="{ 'selected': isClientsDropdownOpen }">
          <a
            href="#"
            class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.active]:bg-sidebarItemActiveBgLight group-[.active]:text-black group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black sidebar-dropdown-toggle dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.active]:bg-darkCard dark:group-[.active]:text-white dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100"
            @click.prevent="toggleClientsDropdown"
          >
            <i class="ri-user-line mr-3 text-lg"></i>
            <span class="text-sm">Clientes</span>
          </a>
        </li>

        <li class="mb-1 group" :class="{ 'selected': isEmployeesDropdownOpen }">
          <a
            href="#"
            class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.active]:bg-sidebarItemActiveBgLight group-[.active]:text-black group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black sidebar-dropdown-toggle dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.active]:bg-darkCard dark:group-[.active]:text-white dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100"
            @click.prevent="toggleEmployeesDropdown"
          >
            <i class="ri-group-line mr-3 text-lg"></i>
            <span class="text-sm">Empleados</span>
            <i class="ri-arrow-right-s-line ml-auto" :class="{ 'rotate-90': isEmployeesDropdownOpen }"></i>
          </a>
          <ul class="pl-7 mt-2" :class="{ 'hidden': !isEmployeesDropdownOpen, 'block': isEmployeesDropdownOpen }">
            <li class="mb-4">
              <a href="#" class="text-sidebarTextLight text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-700 before:mr-3 dark:text-gray-300 dark:hover:text-gray-100 dark:before:bg-gray-600">Administrar Empleados</a>
            </li>
          </ul>
        </li>
        <li class="mb-1 group" :class="{ 'selected': isArrangementsDropdownOpen }">
          <a
            href="#"
            class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.active]:bg-sidebarItemActiveBgLight group-[.active]:text-black group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black sidebar-dropdown-toggle dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.active]:bg-darkCard dark:group-[.active]:text-white dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100"
            @click.prevent="toggleArrangementsDropdown"
          >
            <i class="ri-flower-line mr-3 text-lg"></i>
            <span class="text-sm">Arreglos</span>
            <i class="ri-arrow-right-s-line ml-auto" :class="{ 'rotate-90': isArrangementsDropdownOpen }"></i>
          </a>
          <ul class="pl-7 mt-2" :class="{ 'hidden': !isArrangementsDropdownOpen, 'block': isArrangementsDropdownOpen }">
            <li class="mb-4">
              <a href="#" class="text-sidebarTextLight text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-700 before:mr-3 dark:text-gray-300 dark:hover:text-gray-100 dark:before:bg-gray-600">Administrar Arreglos</a>
            </li>
          </ul>
        </li>
        <li class="mb-1 group" :class="{ 'selected': isSuppliersDropdownOpen }">
          <a
            href="#"
            class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.active]:bg-sidebarItemActiveBgLight group-[.active]:text-black group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black sidebar-dropdown-toggle dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.active]:bg-darkCard dark:group-[.active]:text-white dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100"
            @click.prevent="toggleSuppliersDropdown"
          >
            <i class="ri-truck-line mr-3 text-lg"></i>
            <span class="text-sm">Proveedores</span>
            <i class="ri-arrow-right-s-line ml-auto" :class="{ 'rotate-90': isSuppliersDropdownOpen }"></i>
          </a>
          <ul class="pl-7 mt-2" :class="{ 'hidden': !isSuppliersDropdownOpen, 'block': isSuppliersDropdownOpen }">
            <li class="mb-4">
              <a href="#" class="text-sidebarTextLight text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-700 before:mr-3 dark:text-gray-300 dark:hover:text-gray-100 dark:before:bg-gray-600">Administrar Proveedores</a>
            </li>
          </ul>
        </li>

        <li class="mb-1 group">
          <a href="#" class="flex items-center py-5 px-4 text-sidebarTextLight hover:bg-sidebarItemActiveBgLight hover:text-black rounded-md group-[.active]:bg-sidebarItemActiveBgLight group-[.active]:text-black group-[.selected]:bg-sidebarItemActiveBgLight group-[.selected]:text-black dark:text-gray-300 dark:hover:bg-darkCard dark:hover:text-gray-100 dark:group-[.active]:bg-darkCard dark:group-[.active]:text-white dark:group-[.selected]:bg-darkCard dark:group-[.selected]:text-gray-100">
            <i class="ri-settings-2-line mr-3 text-lg"></i>
            <span class="text-sm">Configuración</span>
          </a>
        </li>
      </ul>
    </div>

    <div
      class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
      :class="{ 'hidden': !isSidebarOpen }"
      @click="toggleSidebar"
    ></div>

    <main
      class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main dark:bg-darkBackground dark:text-white"
      :class="{ 'md:w-full md:ml-0': !isSidebarOpen }"
    >
      <div class="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30 dark:bg-darkBackground dark:text-white">
        <button type="button" class="text-lg text-gray-600 sidebar-toggle dark:text-gray-300" @click="toggleSidebar">
          <i class="ri-menu-line"></i>
        </button>
        <ul class="flex items-center text-sm ml-4">
          <li class="mr-2">
            <a href="#" class="text-gray-400 hover:text-gray-600 font-medium dark:text-gray-300 dark:hover:text-gray-100">Dashboard</a>
          </li>
          <li class="text-gray-600 mr-2 font-medium dark:text-gray-300">/</li>
          <li class="text-gray-600 mr-2 font-medium dark:text-gray-300">Analíticas</li>
        </ul>
        <ul class="ml-auto flex items-center">
          <button
            id="toggleDarkMode"
            class="px-2 py-4 font-semibold hover:text-green-500 transition duration-300 dark:text-white"
            @click="toggleDarkMode"
          >
            {{ isDarkMode ? '🌙 Modo Oscuro' : '☀️ Modo Claro' }}
          </button>
          <li class="mr-1 dropdown">
            <button type="button" class="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-darkCard dark:text-gray-300 dark:hover:text-gray-100" @click="toggleSearchDropdown">
              <i class="ri-search-line"></i>
            </button>
            <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isSearchDropdownOpen }">
              <form action="" class="p-4 border-b border-b-gray-100 dark:border-b-gray-700">
                <div class="relative w-full">
                  <input type="text" class="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500 dark:bg-darkBackground dark:border-gray-700 dark:text-white" placeholder="Buscar...">
                  <i class="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 dark:text-gray-300"></i>
                </div>
              </form>
              <div class="mt-3 mb-2">
                <div class="text-[13px] font-medium text-gray-400 ml-4 mb-2 dark:text-gray-300">Reciente</div>
                <ul class="max-h-64 overflow-y-auto">
                  <li>
                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group dark:hover:bg-darkBackground">
                      <img src="../assets//images/user.png" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                      <div class="ml-2">
                        <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500 dark:text-gray-300 dark:group-hover:text-blue-400">Crear página de aterrizaje</div>
                        <div class="text-[11px] text-gray-400 dark:text-gray-500">$345</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group dark:hover:bg-darkBackground">
                      <img src="../assets//images/user.png" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                      <div class="ml-2">
                        <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500 dark:text-gray-300 dark:group-hover:text-blue-400">Administrar el sitio web</div>
                        <div class="text-[11px] text-gray-400 dark:text-gray-500">$345</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group dark:hover:bg-darkBackground">
                      <img src="../assets//images/user.png" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                      <div class="ml-2">
                        <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500 dark:text-gray-300 dark:group-hover:text-blue-400">Configurar servidor de correo</div>
                        <div class="text-[11px] text-gray-400 dark:text-gray-500">$345</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group dark:hover:bg-darkBackground">
                      <img src="../assets//images/user.png" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                      <div class="ml-2">
                        <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500 dark:text-gray-300 dark:group-hover:text-blue-400">Configurar servidores DNS</div>
                        <div class="text-[11px] text-gray-400 dark:text-gray-500">$345</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="dropdown">
            <button type="button" class="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-darkCard dark:text-gray-300 dark:hover:text-gray-100" @click="toggleNotificationDropdown">
              <i class="ri-notification-3-line"></i>
            </button>
            <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isNotificationDropdownOpen }">
              <div class="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab dark:border-b-gray-700">
                <button type="button" data-tab="notification" class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent active dark:text-gray-300 dark:hover:text-gray-100">Notificaciones</button>
                <button type="button" data-tab="messages" class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent ml-4 dark:text-gray-300 dark:hover:text-gray-100">Mensajes</button>
              </div>
              <div class="w-full max-h-64 overflow-y-auto">
                <div class="p-4 border-b border-b-gray-100 dark:border-b-gray-700">
                  <div class="text-gray-400 mb-1 text-[12px] dark:text-gray-300">NOTIFICACIONES</div>
                  <div class="flex items-center mb-4">
                    <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 dark:bg-darkBackground">
                      <i class="ri-notification-3-line text-lg text-gray-600 dark:text-gray-300"></i>
                    </div>
                    <div class="flex-grow">
                      <div class="text-[13px] text-gray-600 font-medium dark:text-gray-300">Se han enviado 10 pedidos</div>
                      <div class="text-[11px] text-gray-400 dark:text-gray-500">Hace 2 minutos</div>
                    </div>
                  </div>
                  <div class="flex items-center mb-4">
                    <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 dark:bg-darkBackground">
                      <i class="ri-notification-3-line text-lg text-gray-600 dark:text-gray-300"></i>
                    </div>
                    <div class="flex-grow">
                      <div class="text-[13px] text-gray-600 font-medium dark:text-gray-300">Se ha enviado 1 nuevo mensaje</div>
                      <div class="text-[11px] text-gray-400 dark:text-gray-500">Hace 2 minutos</div>
                    </div>
                  </div>
                  <div class="flex items-center mb-4">
                    <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 dark:bg-darkBackground">
                      <i class="ri-notification-3-line text-lg text-gray-600 dark:text-gray-300"></i>
                    </div>
                    <div class="flex-grow">
                      <div class="text-[13px] text-gray-600 font-medium dark:text-gray-300">Un pedido ha sido cancelado</div>
                      <div class="text-[11px] text-gray-400 dark:text-gray-500">Hace 2 minutos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="dropdown ml-3">
            <button type="button" class="dropdown-toggle flex items-center" @click="toggleProfileDropdown">
              <img src="../assets//images/user.png" alt="" class="w-8 h-8 rounded-full block object-cover align-middle">
            </button>
            <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px] dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isProfileDropdownOpen }">
              <h6 class="px-4 py-2 text-gray-400 text-sm dark:text-gray-300">John Doe</h6>
              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Cerrar sesión</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 dark:bg-darkCard dark:border-gray-700">
            <div class="flex justify-between mb-4">
              <div>
                <div class="text-2xl font-semibold mb-1 dark:text-white">10</div>
                <div class="text-sm font-medium text-gray-400 dark:text-gray-300">Pedidos activos</div>
              </div>
              <div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="text-sm text-gray-400 dark:text-gray-300">
                <span class="text-green-500 text-sm font-semibold">+3%</span>
                que el último mes
              </div>
            </div>
          </div>
          <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 dark:bg-darkCard dark:border-gray-700">
            <div class="flex justify-between mb-4">
              <div>
                <div class="text-2xl font-semibold mb-1 dark:text-white">$3.560</div>
                <div class="text-sm font-medium text-gray-400 dark:text-gray-300">Ventas mensuales</div>
              </div>
              <div>
                
              </div>
            </div>
            <div class="flex items-center">
              <div class="text-sm text-gray-400 dark:text-gray-300">
                <span class="text-red-500 text-sm font-semibold">-12%</span>
                que el último mes
              </div>
            </div>
          </div>
          <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 dark:bg-darkCard dark:border-gray-700">
            <div class="flex justify-between mb-4">
              <div>
                <div class="text-2xl font-semibold mb-1 dark:text-white">12</div>
                <div class="text-sm font-medium text-gray-400 dark:text-gray-300">Pedidos pendientes</div>
              </div>
              <div>
                
              </div>
            </div>
            <div class="flex items-center">
              <div class="text-sm text-gray-400 dark:text-gray-300">
                <span class="text-green-500 text-sm font-semibold">+7%</span>
                que el último mes
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 dark:bg-darkCard dark:border-gray-700">
            <div class="flex justify-between mb-4">
              <div>
                <div class="text-xl font-semibold mb-1 dark:text-white">Ventas diarias</div>
                <div class="text-sm font-medium text-gray-400 dark:text-gray-300">
                  <span class="text-green-500">+12%</span>
                  que ayer
                </div>
              </div>
              <div>
                <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleCardDropdown1">
                  <i class="ri-more-fill"></i>
                </button>
                <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isCardDropdownOpen1 }">
                  <ul class="py-1.5">
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="h-[300px]">
              <canvas id="sales-chart"></canvas>
            </div>
          </div>
          <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 dark:bg-darkCard dark:border-gray-700">
            <div class="flex justify-between mb-4">
              <div>
                <div class="text-xl font-semibold mb-1 dark:text-white">Tendencias de pedidos</div>
                <div class="text-sm font-medium text-gray-400 dark:text-gray-300">
                  <span class="text-red-500">-5%</span>
                  que la semana pasada
                </div>
              </div>
              <div>
                <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleCardDropdown2">
                  <i class="ri-more-fill"></i>
                </button>
                <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isCardDropdownOpen2 }">
                  <ul class="py-1.5">
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="h-[300px]">
              <canvas id="order-chart"></canvas>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 lg:col-span-2 dark:bg-darkCard dark:border-gray-700">
            <div class="flex justify-between mb-4">
              <div>
                <div class="text-xl font-semibold mb-1 dark:text-white">Nuevos pedidos</div>
                <div class="text-sm font-medium text-gray-400 dark:text-gray-300">
                  <span class="text-green-500">+10%</span>
                  que el último mes
                </div>
              </div>
              <div>
                <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleCardDropdown3">
                  <i class="ri-more-fill"></i>
                </button>
                <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isCardDropdownOpen3 }">
                  <ul class="py-1.5">
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[540px]" data-tab-for="order" data-filter=".active">
                <thead>
                  <tr>
                    <th class="text-[12px] uppercase text-gray-400 pb-2 px-4 font-semibold text-left dark:text-gray-300">Logo</th>
                    <th class="text-[12px] uppercase text-gray-400 pb-2 px-4 font-semibold text-left dark:text-gray-300">Nombre de la tienda</th>
                    <th class="text-[12px] uppercase text-gray-400 pb-2 px-4 font-semibold text-left dark:text-gray-300">Estado</th>
                    <th class="text-[12px] uppercase text-gray-400 pb-2 px-4 font-semibold text-left dark:text-gray-300">Pago</th>
                    <th class="text-[12px] uppercase text-gray-400 pb-2 px-4 font-semibold text-left dark:text-gray-300">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover">
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Google</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Pendiente</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Pagado</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <div class="dropdown">
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown1">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen1 }">
                          <ul class="py-1.5">
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover">
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Microsoft</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Pendiente</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Pendiente</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <div class="dropdown">
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown2">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen2 }">
                          <ul class="py-1.5">
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover">
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Apple</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Completado</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Pagado</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <div class="dropdown">
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown3">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen3 }">
                          <ul class="py-1.5">
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover">
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Samsung</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Pendiente</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Pendiente</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <div class="dropdown">
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown4">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen4 }">
                          <ul class="py-1.5">
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover">
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Dell</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Completado</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Pagado</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <div class="dropdown">
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown5">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen5 }">
                          <ul class="py-1.5">
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 dark:bg-darkCard dark:border-gray-700">
            <div class="flex justify-between mb-4">
              <div>
                <div class="text-xl font-semibold mb-1 dark:text-white">Actividad del cliente</div>
                <div class="text-sm font-medium text-gray-400 dark:text-gray-300">
                  <span class="text-green-500">+12%</span>
                  que el último mes
                </div>
              </div>
              <div>
                <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleCardDropdown4">
                  <i class="ri-more-fill"></i>
                </button>
                <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isCardDropdownOpen4 }">
                  <ul class="py-1.5">
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[540px]">
                <thead>
                  <tr>
                    <th class="text-[12px] uppercase text-gray-400 pb-2 px-4 font-semibold text-left dark:text-gray-300">Foto</th>
                    <th class="text-[12px] uppercase text-gray-400 pb-2 px-4 font-semibold text-left dark:text-gray-300">Nombre</th>
                    <th class="text-[12px] uppercase text-gray-400 pb-2 px-4 font-semibold text-left dark:text-gray-300">Estado</th>
                    <th class="text-[12px] uppercase text-gray-400 pb-2 px-4 font-semibold text-left dark:text-gray-300">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded-full object-cover">
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">John Doe</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Activo</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <div class="dropdown">
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown6">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen6 }">
                          <ul class="py-1.5">
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded-full object-cover">
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">John Doe</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Activo</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <div class="dropdown">
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown7">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen7 }">
                          <ul class="py-1.5">
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded-full object-cover">
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">John Doe</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Activo</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <div class="dropdown">
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown8">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen8 }">
                          <ul class="py-1.5">
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded-full object-cover">
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">John Doe</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Activo</span>
                    </td>
                    <td class="py-2 px-4 border-b border-b-gray-50 dark:border-b-gray-700">
                      <div class="dropdown">
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown9">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen9 }">
                          <ul class="py-1.5">
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Perfil</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Ajustes</a>
                            </li>
                            <li>
                              <a href="#" class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-darkBackground">Actividad</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: window.innerWidth >= 768, // Sidebar abierto por defecto en pantallas grandes
      isDarkMode: false, // Estado inicial del modo oscuro
      activeMenuItem: 'dashboard', // Para mantener el elemento activo del sidebar
      isSearchDropdownOpen: false,
      isNotificationDropdownOpen: false,
      isProfileDropdownOpen: false,
      isAuthDropdownOpen: false,
      isServicesDropdownOpen: false,
      isClientsDropdownOpen: false,
      isEmployeesDropdownOpen: false,
      isArrangementsDropdownOpen: false,
      isSuppliersDropdownOpen: false,

      // Dropdowns para las tarjetas
      isCardDropdownOpen1: false,
      isCardDropdownOpen2: false,
      isCardDropdownOpen3: false,
      isCardDropdownOpen4: false,

      // Dropdowns para las tablas
      isTableDropdownOpen1: false,
      isTableDropdownOpen2: false,
      isTableDropdownOpen3: false,
      isTableDropdownOpen4: false,
      isTableDropdownOpen5: false,
      isTableDropdownOpen6: false,
      isTableDropdownOpen7: false,
      isTableDropdownOpen8: false,
      isTableDropdownOpen9: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      // Puedes guardar la preferencia del usuario en localStorage aquí si quieres que persista
      localStorage.setItem('darkMode', this.isDarkMode);
    },
    toggleSearchDropdown() {
      this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
    },
    toggleNotificationDropdown() {
      this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
    },
    toggleProfileDropdown() {
      this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    },
    toggleAuthDropdown() {
      this.isAuthDropdownOpen = !this.isAuthDropdownOpen;
      // Cierra otros dropdowns al abrir este
      this.isServicesDropdownOpen = false;
      this.isClientsDropdownOpen = false;
      this.isEmployeesDropdownOpen = false;
      this.isArrangementsDropdownOpen = false;
      this.isSuppliersDropdownOpen = false;
    },
    toggleServicesDropdown() {
      this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
      // Cierra otros dropdowns al abrir este
      this.isAuthDropdownOpen = false;
      this.isClientsDropdownOpen = false;
      this.isEmployeesDropdownOpen = false;
      this.isArrangementsDropdownOpen = false;
      this.isSuppliersDropdownOpen = false;
    },
    toggleClientsDropdown() {
      this.isClientsDropdownOpen = !this.isClientsDropdownOpen;
      // Cierra otros dropdowns al abrir este
      this.isAuthDropdownOpen = false;
      this.isServicesDropdownOpen = false;
      this.isEmployeesDropdownOpen = false;
      this.isArrangementsDropdownOpen = false;
      this.isSuppliersDropdownOpen = false;
    },
    toggleEmployeesDropdown() {
      this.isEmployeesDropdownOpen = !this.isEmployeesDropdownOpen;
      // Cierra otros dropdowns al abrir este
      this.isAuthDropdownOpen = false;
      this.isServicesDropdownOpen = false;
      this.isClientsDropdownOpen = false;
      this.isArrangementsDropdownOpen = false;
      this.isSuppliersDropdownOpen = false;
    },
    toggleArrangementsDropdown() {
      this.isArrangementsDropdownOpen = !this.isArrangementsDropdownOpen;
      // Cierra otros dropdowns al abrir este
      this.isAuthDropdownOpen = false;
      this.isServicesDropdownOpen = false;
      this.isClientsDropdownOpen = false;
      this.isEmployeesDropdownOpen = false;
      this.isSuppliersDropdownOpen = false;
    },
    toggleSuppliersDropdown() {
      this.isSuppliersDropdownOpen = !this.isSuppliersDropdownOpen;
      // Cierra otros dropdowns al abrir este
      this.isAuthDropdownOpen = false;
      this.isServicesDropdownOpen = false;
      this.isClientsDropdownOpen = false;
      this.isEmployeesDropdownOpen = false;
      this.isArrangementsDropdownOpen = false;
    },

    // Métodos para los dropdowns de las tarjetas
    toggleCardDropdown1() {
      this.isCardDropdownOpen1 = !this.isCardDropdownOpen1;
    },
    toggleCardDropdown2() {
      this.isCardDropdownOpen2 = !this.isCardDropdownOpen2;
    },
    toggleCardDropdown3() {
      this.isCardDropdownOpen3 = !this.isCardDropdownOpen3;
    },
    toggleCardDropdown4() {
      this.isCardDropdownOpen4 = !this.isCardDropdownOpen4;
    },

    // Métodos para los dropdowns de las tablas
    toggleTableDropdown1() {
      this.isTableDropdownOpen1 = !this.isTableDropdownOpen1;
    },
    toggleTableDropdown2() {
      this.isTableDropdownOpen2 = !this.isTableDropdownOpen2;
    },
    toggleTableDropdown3() {
      this.isTableDropdownOpen3 = !this.isTableDropdownOpen3;
    },
    toggleTableDropdown4() {
      this.isTableDropdownOpen4 = !this.isTableDropdownOpen4;
    },
    toggleTableDropdown5() {
      this.isTableDropdownOpen5 = !this.isTableDropdownOpen5;
    },
    toggleTableDropdown6() {
      this.isTableDropdownOpen6 = !this.isTableDropdownOpen6;
    },
    toggleTableDropdown7() {
      this.isTableDropdownOpen7 = !this.isTableDropdownOpen7;
    },
    toggleTableDropdown8() {
      this.isTableDropdownOpen8 = !this.isTableDropdownOpen8;
    },
    toggleTableDropdown9() {
      this.isTableDropdownOpen9 = !this.isTableDropdownOpen9;
    },

    handleClickOutside(event) {
      // Cierra todos los dropdowns si se hace clic fuera de ellos
      const dropdowns = [
        'isSearchDropdownOpen',
        'isNotificationDropdownOpen',
        'isProfileDropdownOpen',
        'isCardDropdownOpen1', 'isCardDropdownOpen2', 'isCardDropdownOpen3', 'isCardDropdownOpen4',
        'isTableDropdownOpen1', 'isTableDropdownOpen2', 'isTableDropdownOpen3', 'isTableDropdownOpen4',
        'isTableDropdownOpen5', 'isTableDropdownOpen6', 'isTableDropdownOpen7', 'isTableDropdownOpen8', 'isTableDropdownOpen9'
      ];
      dropdowns.forEach(dropdown => {
        if (this[dropdown] && !event.target.closest('.dropdown')) {
          this[dropdown] = false;
        }
      });

      // Cierra los dropdowns del sidebar si se hace clic fuera
      const sidebarDropdowns = [
        'isAuthDropdownOpen',
        'isServicesDropdownOpen',
        'isClientsDropdownOpen',
        'isEmployeesDropdownOpen',
        'isArrangementsDropdownOpen',
        'isSuppliersDropdownOpen'
      ];
      sidebarDropdowns.forEach(dropdown => {
        if (this[dropdown] && !event.target.closest('.sidebar-dropdown-toggle')) {
          this[dropdown] = false;
        }
      });
    },
    handleResize() {
      // Ajusta la visibilidad del sidebar al cambiar el tamaño de la ventana
      this.isSidebarOpen = window.innerWidth >= 768;
    }
  },
  mounted() {
    // Inicializa el modo oscuro desde localStorage si existe
    if (localStorage.getItem('darkMode') === 'true') {
      this.isDarkMode = true;
    }
    document.addEventListener('click', this.handleClickOutside);
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    // Observa cambios en la ruta para actualizar el elemento activo del sidebar
    '$route.name': {
      handler(newRouteName) {
        if (newRouteName === 'Home') { // Asumiendo que tu ruta de dashboard se llama 'Home'
          this.activeMenuItem = 'dashboard';
        }
      },
      immediate: true // Ejecuta el handler inmediatamente después de la creación del componente
    }
  }
};
</script>

<style scoped>
/* Los estilos específicos de Tailwind y las reglas @apply van en tu archivo CSS principal (src/assets/style.css).
   Aquí puedes añadir estilos scoped si son muy específicos de este componente y no son fácilmente expresables con clases de Tailwind. */
</style>