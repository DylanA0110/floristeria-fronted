import { createRouter, createWebHistory } from 'vue-router'

// mouting point for the whole app
// import App from "../App.vue"; // Esta línea no es necesaria aquí

// layouts
import Admin from "../layouts/Admin.vue";
import Auth from "../layouts/Auth.vue";

// views for Admin layout
import Dashboard from "../views/admin/Dashboard.vue";
import Settings from "../views/admin/Settings.vue";
import Empleado from "../views/admin/Empleado.vue";
// CAMBIO 1: Actualiza la ruta de importación de Clientes
import Clientes from '../views/admin/Clientes.vue' // <--- CAMBIADO AQUÍ

// views for Auth layout
import Login from "../views/Login.vue";

// views without layouts
import Landing from "../views/Landing.vue";
import Profile from "../views/Profile.vue";
import Index from "../views/Index.vue";

const routes = [
  {
    path: '/',
    redirect: '/login'   // Mostrar login como página inicial
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: Admin,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        meta: { showStats: true } // Mantener stats en Dashboard
      },
      {
        path: 'settings',
        component: Settings,
        meta: { showStats: false } // No stats en Settings
      },
      {
        path: 'empleado', // Path en minúsculas es buena práctica
        component: Empleado,
        meta: { showStats: false } // No stats en Empleado
      },
      {
        // CAMBIO 2: Cambia el path a minúsculas y añade meta para ocultar stats
        path:'clientes', // <--- CAMBIADO AQUÍ (de 'Clientes' a 'clientes')
        component: Clientes,
        meta: { showStats: false } // <--- Añadido aquí para no mostrar stats
      }
    ]
  },
  {
    path: '/landing',
    component: Landing
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/index',
    component: Index
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

export default router;