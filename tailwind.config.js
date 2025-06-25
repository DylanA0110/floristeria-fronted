// tailwind.config.js
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors"); // Importamos los colores base de Tailwind

module.exports = {
  // CAMBIO 1: Renombrar 'purge' a 'content'
  // El objeto 'enabled: true' ya no es necesario aquí.
  content: [
    // CAMBIO 2: Patrones más específicos para evitar escanear node_modules
    // "./**/*.html",   // Si tienes HTML directamente en la raíz o subcarpetas, este es muy amplio
    // "./*.html",      // Si tienes index.html en la raíz
    // "./**/*.js",     // ESTO ES LO QUE CAUSA EL PROBLEMA DE node_modules
    // "./*.js",        // Y esto también
    // "./**/*.vue",    // Este es bueno para Vue
    // "./*.vue",       // Este también es bueno para Vue
    
    // PATRONES RECOMENDADOS para proyectos Vue con Vite:
    "./index.html", // Tu archivo HTML principal
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Todos los archivos .vue, .js, .ts, .jsx, .tsx dentro de src/
    // Si tienes archivos de Tailwind CSS personalizados en otras carpetas (ej: assets/css), inclúyelos:
    // "./src/assets/css/*.css", 
  ],
  // La opción 'options' con 'safelist' va directamente dentro de 'content' si la necesitas
  // content: {
  //   files: [
  //     './index.html',
  //     './src/**/*.{vue,js,ts,jsx,tsx}',
  //   ],
  //   extract: {
  //     // Puedes definir un extractor personalizado si lo necesitas
  //   },
  //   transform: {
  //     // Puedes definir transformaciones personalizadas
  //   },
  //   safelist: [], // Mueve safelist aquí si necesitas
  // },

  theme: {
    // Al usar 'extend', tus colores personalizados se fusionan con los colores predeterminados de Tailwind.
    // Esto es lo correcto para mantener los colores base de Tailwind (blueGray, red, emerald, etc.)
    // Y añadir tus propios colores de 'floristeria'.
    extend: {
      colors: {
        // Incluye todos los colores por defecto de Tailwind si los necesitas junto a los tuyos
        // Esto sobrescribe los colores base de Tailwind. Si quieres mantener TODOS los de Tailwind
        // y *solo* añadir los tuyos, el 'colors' debería estar así:
        ...colors, // Esto importa todos los colores por defecto de Tailwind
        // Y luego defines tus colores personalizados
        floristeria: {
          darkGreen: '#12403B',
          mediumGreen: '#31594E',
          gold: '#A67D32',
          orangePrimary: '#F2921D',
          orangeAccent: '#F2811D',
        },
        // Si necesitas modificar un color existente de Tailwind o añadir un tono específico:
        // blueGray: {
        //   '50': colors.blueGray['50'], // Para mantener un tono específico de blueGray si lo necesitas
        //   '200': '#F3F4F6', // Ejemplo de sobrescribir un tono específico
        // },
        // Puedes referenciar los colores de Tailwind así:
        // blueGray: colors.blueGray,
      },
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        // "55": "55rem", // Cuidado con tamaños de fuente tan grandes, pueden causar overflow
      },
      opacity: {
        "80": ".8",
      },
      zIndex: {
        "2": 2,
        "3": 3,
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px",
      },
      height: {
        "95-px": "95px",
        "70-px": "70px",
        "350-px": "350px",
        "500-px": "500px",
        "600-px": "600px",
      },
      maxHeight: {
        "860-px": "860px",
      },
      maxWidth: {
        "100-px": "100px",
        "120-px": "120px",
        "150-px": "150px",
        "180-px": "180px",
        "200-px": "200px",
        "210-px": "210px",
        "580-px": "580px",
      },
      minWidth: {
        "140-px": "140px",
        "48": "12rem",
      },
      backgroundSize: {
        full: "100%",
      },
    },
  },
  // La propiedad 'variants' ha sido deprecada en Tailwind CSS v3+.
  // Ahora se controlan a través de la configuración de 'plugins' y 'theme'.
  // Elimina esta sección por completo.
  // variants: [
  //   "responsive", "group-hover", "focus-within", "first", "last", "odd", "even",
  //   "hover", "focus", "active", "visited", "disabled",
  // ],
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, theme }) {
      const screens = theme("screens", {});
      addComponents([
        {
          // Esto ya lo provee Tailwind por defecto, a menos que necesites un comportamiento diferente.
          // Si lo dejas, sobrescribe el 'container' predeterminado de Tailwind.
          ".container": { width: "100%" },
        },
        {
          [`@media (min-width: ${screens.sm})`]: {
            ".container": {
              "max-width": "640px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.md})`]: {
            ".container": {
              "max-width": "768px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.lg})`]: {
            ".container": {
              "max-width": "1024px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.xl})`]: {
            ".container": {
              "max-width": "1280px",
            },
          },
        },
        {
          // Asegúrate de que esto sea lo que quieres. Normalmente, '2xl' es más grande que 'xl'.
          // Aquí tienes el mismo max-width que 'xl'.
          [`@media (min-width: ${screens["2xl"]})`]: {
            ".container": {
              "max-width": "1280px", 
            },
          },
        },
      ]);
    }),
  ],
};