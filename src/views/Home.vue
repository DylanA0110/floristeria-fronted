<template>
  <div :class="{ 'dark': isDarkMode }" class="text-gray-800 font-inter">
    <div
      class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
      :class="{ 'hidden': !isSidebarOpen && !isDesktop }"
      @click="toggleSidebar"
    ></div>

   <TheSidebar
      :is-sidebar-open="isSidebarOpen"
      :is-desktop="isDesktop" @close-sidebar="isSidebarOpen = false"
      @toggle-sidebar-collapse="toggleSidebar" :active-menu-item="activeMenuItem"
      @update:activeMenuItem="activeMenuItem = $event"
    />
   <main
  class="w-full bg-gray-50 min-h-screen transition-all main dark:bg-darkBackground dark:text-white"
  :class="{
    // Estado normal: Sidebar completamente abierto en desktop
    'md:w-[calc(100%-256px)] md:ml-64': isSidebarOpen && isDesktop && !isSidebarMinimized,
    
    // Estado minimizado: Sidebar minimizado en desktop
    'md:w-[calc(100%-64px)] md:ml-16': isSidebarMinimized && isDesktop, // Ajusta 64px para el ancho del sidebar minimizado, y ml-16 para el margen

    // Estado cerrado (sólo para móvil o si se decide ocultar completamente en desktop)
    'md:w-full md:ml-0': !isSidebarOpen && !isSidebarMinimized && isDesktop, // Asegura que si no está ni abierto ni minimizado, ocupe todo el ancho
    
    // Comportamiento en móvil (siempre sin margen y ancho completo por defecto cuando el overlay no está activo)
    'ml-0': !isDesktop
  }"
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
            <button type="button" class="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-darkCard dark:text-gray-300 dark:hover:text-gray-100" @click="toggleSearchDropdown" data-dropdown-toggle="isSearchDropdownOpen">
              <i class="ri-search-line"></i>
            </button>
            <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isSearchDropdownOpen }" data-dropdown-content="isSearchDropdownOpen">
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
                      <img src="../assets/images/user.png" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                      <div class="ml-2">
                        <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500 dark:text-gray-300 dark:group-hover:text-blue-400">Crear página de aterrizaje</div>
                        <div class="text-[11px] text-gray-400 dark:text-gray-500">$345</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group dark:hover:bg-darkBackground">
                      <img src="../assets/images/user.png" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                      <div class="ml-2">
                        <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500 dark:text-gray-300 dark:group-hover:text-blue-400">Administrar el sitio web</div>
                        <div class="text-[11px] text-gray-400 dark:text-gray-500">$345</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group dark:hover:bg-darkBackground">
                      <img src="../assets/images/user.png" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                      <div class="ml-2">
                        <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500 dark:text-gray-300 dark:group-hover:text-blue-400">Configurar servidor de correo</div>
                        <div class="text-[11px] text-gray-400 dark:text-gray-500">$345</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group dark:hover:bg-darkBackground">
                      <img src="../assets/images/user.png" alt="" class="w-8 h-8 rounded block object-cover align-middle">
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
            <button type="button" class="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-darkCard dark:text-gray-300 dark:hover:text-gray-100" @click="toggleNotificationDropdown" data-dropdown-toggle="isNotificationDropdownOpen">
              <i class="ri-notification-3-line"></i>
            </button>
            <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isNotificationDropdownOpen }" data-dropdown-content="isNotificationDropdownOpen">
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
            <button type="button" class="dropdown-toggle flex items-center" @click="toggleProfileDropdown" data-dropdown-toggle="isProfileDropdownOpen">
              <img src="../assets/images/user.png" alt="" class="w-8 h-8 rounded-full block object-cover align-middle">
            </button>
            <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px] dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isProfileDropdownOpen }" data-dropdown-content="isProfileDropdownOpen">
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
                <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleCardDropdown1" data-dropdown-toggle="isCardDropdownOpen1">
                  <i class="ri-more-fill"></i>
                </button>
                <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isCardDropdownOpen1 }" data-dropdown-content="isCardDropdownOpen1">
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
                <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleCardDropdown2" data-dropdown-toggle="isCardDropdownOpen2">
                  <i class="ri-more-fill"></i>
                </button>
                <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isCardDropdownOpen2 }" data-dropdown-content="isCardDropdownOpen2">
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
                <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleCardDropdown3" data-dropdown-toggle="isCardDropdownOpen3">
                  <i class="ri-more-fill"></i>
                </button>
                <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isCardDropdownOpen3 }" data-dropdown-content="isCardDropdownOpen3">
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
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown1" data-dropdown-toggle="isTableDropdownOpen1">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen1 }" data-dropdown-content="isTableDropdownOpen1">
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
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown2" data-dropdown-toggle="isTableDropdownOpen2">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen2 }" data-dropdown-content="isTableDropdownOpen2">
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
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown3" data-dropdown-toggle="isTableDropdownOpen3">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen3 }" data-dropdown-content="isTableDropdownOpen3">
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
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown4" data-dropdown-toggle="isTableDropdownOpen4">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen4 }" data-dropdown-content="isTableDropdownOpen4">
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
                        <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100" @click="toggleTableDropdown5" data-dropdown-toggle="isTableDropdownOpen5">
                          <i class="ri-more-fill"></i>
                        </button>
                        <div class="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-[120px] w-full bg-white rounded-md border border-gray-100 dark:bg-darkCard dark:border-gray-700" :class="{ 'block': isTableDropdownOpen5 }" data-dropdown-content="isTableDropdownOpen5">
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
              <div class="text-xl font-semibold dark:text-white">Actividad reciente</div>
              <button type="button" class="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm dark:text-gray-300 dark:hover:text-gray-100">
                <i class="ri-more-fill"></i>
              </button>
            </div>
            <div class="max-h-[400px] overflow-y-auto">
              <div class="flex items-center mb-4">
                <div class="bg-gray-100 rounded-md p-2 mr-3 dark:bg-darkBackground">
                  <i class="ri-notification-3-line text-lg text-gray-600 dark:text-gray-300"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Se han enviado 10 pedidos</div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">2 minutos atrás</div>
                </div>
              </div>
              <div class="flex items-center mb-4">
                <div class="bg-gray-100 rounded-md p-2 mr-3 dark:bg-darkBackground">
                  <i class="ri-shopping-cart-line text-lg text-gray-600 dark:text-gray-300"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Nuevo pedido recibido</div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">10 minutos atrás</div>
                </div>
              </div>
              <div class="flex items-center mb-4">
                <div class="bg-gray-100 rounded-md p-2 mr-3 dark:bg-darkBackground">
                  <i class="ri-mail-line text-lg text-gray-600 dark:text-gray-300"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Nuevo mensaje de soporte</div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">30 minutos atrás</div>
                </div>
              </div>
              <div class="flex items-center mb-4">
                <div class="bg-gray-100 rounded-md p-2 mr-3 dark:bg-darkBackground">
                  <i class="ri-user-line text-lg text-gray-600 dark:text-gray-300"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Nuevo registro de usuario</div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">1 hora atrás</div>
                </div>
              </div>
              <div class="flex items-center mb-4">
                <div class="bg-gray-100 rounded-md p-2 mr-3 dark:bg-darkBackground">
                  <i class="ri-notification-3-line text-lg text-gray-600 dark:text-gray-300"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Se han enviado 10 pedidos</div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">2 minutos atrás</div>
                </div>
              </div>
              <div class="flex items-center mb-4">
                <div class="bg-gray-100 rounded-md p-2 mr-3 dark:bg-darkBackground">
                  <i class="ri-shopping-cart-line text-lg text-gray-600 dark:text-gray-300"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Nuevo pedido recibido</div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">10 minutos atrás</div>
                </div>
              </div>
              <div class="flex items-center mb-4">
                <div class="bg-gray-100 rounded-md p-2 mr-3 dark:bg-darkBackground">
                  <i class="ri-mail-line text-lg text-gray-600 dark:text-gray-300"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Nuevo mensaje de soporte</div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">30 minutos atrás</div>
                </div>
              </div>
              <div class="flex items-center mb-4">
                <div class="bg-gray-100 rounded-md p-2 mr-3 dark:bg-darkBackground">
                  <i class="ri-user-line text-lg text-gray-600 dark:text-gray-300"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Nuevo registro de usuario</div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">1 hora atrás</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// Importa useRoute si lo vas a usar, sino se puede quitar
import { useRoute } from 'vue-router'; 

// Importa TheSidebar - Asegúrate de que la ruta es correcta
import TheSidebar from '../componentes/TheSideBar.vue';

export default {
  components: {
    TheSidebar // Registra el componente TheSidebar
  },
  data() {
    return {
      isDarkMode: false,
       isSidebarOpen: window.innerWidth >= 768,
       isSidebarMinimized: false, 
      isDesktop: window.innerWidth >= 768,// Añadido para controlar el estado del escritorio
      isSearchDropdownOpen: false,
      isNotificationDropdownOpen: false,
      isProfileDropdownOpen: false,
      isCardDropdownOpen1: false,
      isCardDropdownOpen2: false,
      isCardDropdownOpen3: false,
      isTableDropdownOpen1: false,
      isTableDropdownOpen2: false,
      isTableDropdownOpen3: false,
      isTableDropdownOpen4: false,
      isTableDropdownOpen5: false,
      activeMenuItem: 'dashboard' // Inicializa el elemento de menú activo
    };
  },
  methods: {
    
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode);
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
    toggleSidebar() {
  if (this.isDesktop) {
    // Si estamos en desktop, alternamos entre abierto y minimizado
    if (this.isSidebarOpen && !this.isSidebarMinimized) {
      this.isSidebarMinimized = true; // Pasar de abierto a minimizado
      this.isSidebarOpen = false; // El sidebar no está "abierto" en su estado completo
    } else {
      this.isSidebarMinimized = false; // Quitar el estado minimizado
      this.isSidebarOpen = true; // Volver a abrir el sidebar completamente
    }
  } else {
    // Si estamos en móvil, el sidebar simplemente se abre o se cierra (overlay)
    this.isSidebarOpen = !this.isSidebarOpen;
    if (!this.isSidebarOpen) {
      this.closeAllOtherDropdowns();
    }
  }
},
     hhandleResize() {
      // Ajusta la visibilidad del sidebar al cambiar el tamaño de la ventana
      this.isSidebarOpen = window.innerWidth >= 768;
    },
    
    // Métodos para alternar dropdowns específicos (en Home.vue)
    toggleSearchDropdown() {
      this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
      this.closeAllOtherDropdowns('isSearchDropdownOpen');
    },
    toggleNotificationDropdown() {
      this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
      this.closeAllOtherDropdowns('isNotificationDropdownOpen');
    },
    toggleProfileDropdown() {
      this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
      this.closeAllOtherDropdowns('isProfileDropdownOpen');
    },
    toggleCardDropdown1() {
      this.isCardDropdownOpen1 = !this.isCardDropdownOpen1;
      this.closeAllOtherDropdowns('isCardDropdownOpen1');
    },
    toggleCardDropdown2() {
      this.isCardDropdownOpen2 = !this.isCardDropdownOpen2;
      this.closeAllOtherDropdowns('isCardDropdownOpen2');
    },
    toggleCardDropdown3() {
      this.isCardDropdownOpen3 = !this.isCardDropdownOpen3;
      this.closeAllOtherDropdowns('isCardDropdownOpen3');
    },
    toggleTableDropdown1() {
      this.isTableDropdownOpen1 = !this.isTableDropdownOpen1;
      this.closeAllOtherDropdowns('isTableDropdownOpen1');
    },
    toggleTableDropdown2() {
      this.isTableDropdownOpen2 = !this.isTableDropdownOpen2;
      this.closeAllOtherDropdowns('isTableDropdownOpen2');
    },
    toggleTableDropdown3() {
      this.isTableDropdownOpen3 = !this.isTableDropdownOpen3;
      this.closeAllOtherDropdowns('isTableDropdownOpen3');
    },
    toggleTableDropdown4() {
      this.isTableDropdownOpen4 = !this.isTableDropdownOpen4;
      this.closeAllOtherDropdowns('isTableDropdownOpen4');
    },
    toggleTableDropdown5() {
      this.isTableDropdownOpen5 = !this.isTableDropdownOpen5;
      this.closeAllOtherDropdowns('isTableDropdownOpen5');
    },
    mounted() {
    // ... (existing mounted logic) ...
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Initial call to set sidebar state
  },
  beforeUnmount() {
    // ... (existing beforeUnmount logic) ...
    window.removeEventListener('resize', this.handleResize);
  },
    // Nueva función auxiliar para cerrar todos los dropdowns excepto uno
    closeAllOtherDropdowns(excludeDropdown = null) {
        const dropdownsToManage = [
            'isSearchDropdownOpen',
            'isNotificationDropdownOpen',
            'isProfileDropdownOpen',
            'isCardDropdownOpen1',
            'isCardDropdownOpen2',
            'isCardDropdownOpen3',
            'isTableDropdownOpen1',
            'isTableDropdownOpen2',
            'isTableDropdownOpen3',
            'isTableDropdownOpen4',
            'isTableDropdownOpen5'
        ];
        dropdownsToManage.forEach(stateName => {
            if (stateName !== excludeDropdown) {
                this[stateName] = false;
            }
        });
    },

    handleClickOutside(event) {
      // Define los estados de los dropdowns que este componente Home.vue maneja
      const dropdownsToManage = [
        'isSearchDropdownOpen',
        'isNotificationDropdownOpen',
        'isProfileDropdownOpen',
        'isCardDropdownOpen1',
        'isCardDropdownOpen2',
        'isCardDropdownOpen3',
        'isTableDropdownOpen1',
        'isTableDropdownOpen2',
        'isTableDropdownOpen3',
        'isTableDropdownOpen4',
        'isTableDropdownOpen5'
      ];

      let clickedInsideAnyDropdown = false;

      // Itera sobre los dropdowns para ver si el clic fue dentro de alguno de ellos
      for (const stateName of dropdownsToManage) {
        if (this[stateName]) { // Si el dropdown está abierto
          // Usa los atributos 'data-dropdown-toggle' y 'data-dropdown-content' para identificar elementos
          const toggleButton = document.querySelector(`[data-dropdown-toggle="${stateName}"]`);
          const contentElement = document.querySelector(`[data-dropdown-content="${stateName}"]`);

          // Verifica si el clic fue dentro del botón de alternar o el contenido del dropdown actual
          if ((toggleButton && toggleButton.contains(event.target)) || (contentElement && contentElement.contains(event.target))) {
            clickedInsideAnyDropdown = true;
            break; // Si se hizo clic dentro de un dropdown abierto, no es necesario verificar los demás
          }
        }
      }

      // Si el clic no fue dentro de ningún dropdown o su botón, cierra todos
      if (!clickedInsideAnyDropdown) {
        dropdownsToManage.forEach(stateName => {
          this[stateName] = false;
        });
      }
    },

    handleResize() {
      this.isDesktop = window.innerWidth >= 788; // Actualiza el estado de isDesktop
      if (this.isDesktop) {
        this.isSidebarOpen = true; // Sidebar siempre abierto en desktop
      } else {
        this.isSidebarOpen = false; // Sidebar cerrado inicialmente en móvil
      }
    },
    // Método para actualizar activeMenuItem emitido desde TheSidebar
    updateActiveMenuItem(item) {
        this.activeMenuItem = item;
    }
  },
  mounted() {
    // Inicializa el modo oscuro desde localStorage
    if (localStorage.getItem('darkMode') === 'true') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    } else {
      this.isDarkMode = false;
      document.documentElement.classList.remove('dark');
    }

    document.addEventListener('click', this.handleClickOutside);
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Llama para establecer el estado inicial del sidebar
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    '$route.name': {
      handler(newRouteName) {
        // Mapea los nombres de ruta a activeMenuItem. Asegúrate de que coincidan.
        // Por ejemplo, si tu ruta de dashboard se llama 'home' o 'dashboard'
        this.activeMenuItem = newRouteName.toLowerCase();
      },
      immediate: true // Ejecuta el handler inmediatamente después de la creación
    }
  }
};
</script>

<style scoped>
/*
  Mantén aquí solo los estilos específicos de este componente.
  Los estilos globales o de Tailwind (@apply) deberían estar en tu archivo CSS principal (src/assets/style.css).
*/
</style>