import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth' // Asegúrate de que la ruta sea correcta

// layouts
import Admin from "../layouts/Admin.vue";
import Auth from "../layouts/Auth.vue"; // Aunque no lo uses directamente en rutas, si existe, es buena práctica mantenerlo

// views for Admin layout
import Dashboard from "../views/admin/Dashboard.vue";
import Settings from "../views/admin/Settings.vue";
import Empleado from "../views/admin/Empleado.vue";
import Clientes from '../views/admin/Clientes.vue'; // Asegúrate de que esta ruta sea correcta

// views for Auth layout
import Login from "../views/Login.vue";

// views without layouts (o con un layout público)
import Landing from "../views/Landing.vue";
import Profile from "../views/Profile.vue";
import Index from "../views/Index.vue";

const routes = [
  {
    path: '/',
    redirect: '/login' // Mostrar login como página inicial
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false } // <--- Explícitamente NO requiere autenticación
  },
  {
    path: '/admin',
    component: Admin,
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true }, // <--- TODAS las rutas bajo /admin requieren autenticación
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        meta: { showStats: true }
      },
      {
        path: 'settings',
        component: Settings,
        meta: { showStats: false }
      },
      {
        path: 'empleado',
        component: Empleado,
        meta: { showStats: false }
      },
      {
        path: 'clientes',
        component: Clientes,
        meta: { showStats: false }
      }
    ]
  },
  {
    path: '/landing',
    component: Landing,
    meta: { requiresAuth: false } // <--- Explícitamente NO requiere autenticación
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: false } // <--- Explícitamente NO requiere autenticación
  },
  {
    path: '/index',
    component: Index,
    meta: { requiresAuth: false } // <--- Explícitamente NO requiere autenticación
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login' // Si la ruta no existe, redirige a login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


// ** Guardia global para rutas protegidas y gestión de login **
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Obtiene la instancia del store de autenticación

  // Determina si la ruta a la que se intenta acceder requiere autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Determina si la ruta a la que se intenta acceder es la página de login
  const isLoginPage = to.path === '/login';

  // Lógica de redirección:
  // 1. Si la ruta requiere autenticación Y el usuario NO está autenticado
  if (requiresAuth && !authStore.isAuthenticated) {
    console.log('Redirigiendo a login: Ruta protegida sin autenticar.', to.path); // Para depuración
    next('/login'); // Redirige al login
  }
  // 2. Si el usuario está autenticado Y intenta acceder a la página de login
  else if (isLoginPage && authStore.isAuthenticated) {
    console.log('Redirigiendo a dashboard: Ya autenticado en página de login.'); // Para depuración
    next('/admin/dashboard'); // Redirige al dashboard
  }
  // 3. En cualquier otro caso (ruta no protegida, o protegida y autenticado), permite la navegación
  else {
    console.log('Permitiendo navegación a:', to.path); // Para depuración
    next();
  }
});

export default router;