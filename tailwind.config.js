// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./**/*.html",
    "./dist/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ["'Inter'", 'sans-serif']
      },
      backgroundImage: {
        'select-arrow': 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTExLjk5OTcgMTMuMTcxNEwxNi45NDk1IDguMjIxNjhMMTguMzYzNyA5LjYzNTg5TDExLjk5OTcgMTUuOTk5OUw1LjYzNTc0IDkuNjM1ODlMNy4wNDk5NiA4LjIyMTY4TDExLjk5OTcgMTMuMTcxNFoiIGZpbGw9InJnYmEoMTU2LDE2MywxNzUsMSk+PC9wYXRoPjwvc3ZnPj")'
      },
      colors: {
        // Define tu color oscuro personalizado
        darkBackground: '#12403B',
        // Si necesitas un gris oscuro diferente para texto o bordes en modo oscuro
        darkText: '#E0E0E0', // Un color más claro para el texto en modo oscuro
        darkBorder: '#2A4E4C', // Un color de borde que combine
        darkCard: '#1A4A48',
        lightCard: '#9b9b9b',
        cardCerrar: '#F2811D', // Un color para las tarjetas en modo oscuro
        
        // Colores específicos para el sidebar en modo claro (AÑADIDOS)
        sidebarBgLight: '#fad3a4', // Fondo naranja del sidebar en modo claro
        sidebarItemActiveBgLight: '#F0F0F0', // Fondo gris claro para el ítem activo/hover en modo claro
        sidebarTextLight: '#000000', // Texto negro en modo claro
      }
    },
  },
  plugins: [],
}