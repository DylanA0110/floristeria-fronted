// tailwind.config.js
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: true,
    content: [
      "./**/*.html",
      "./*.html",
      "./**/*.js",
      "./*.js",
      "./**/*.vue",
      "./*.vue",
    ],
    options: {
      safelist: [],
    },
  },
  theme: {
    // Es importante no sobrescribir 'colors' directamente aquí si queremos mantener los colores predeterminados de Tailwind
    // Si necesitas mantener los colores como 'blueGray', 'red', 'emerald', etc., asegúrate de extenderlos en 'extend'.
    // Tu configuración actual con `...colors` ya los incluye.
    // Lo más seguro es usar 'extend' para agregar tus colores personalizados.
    extend: {
      colors: {
        // Aquí defines tus colores personalizados para la floristería
        floristeria: {
          // Puedes darles nombres descriptivos o números si prefieres
          // Por ejemplo, 'darkGreen', 'mediumGreen', 'gold', 'orangePrimary', 'orangeAccent'
          darkGreen: '#12403B',    // Un verde muy oscuro
          mediumGreen: '#31594E',  // Un verde intermedio
          gold: '#A67D32',         // Un dorado/marrón claro
          orangePrimary: '#F2921D',// Un naranja vibrante
          orangeAccent: '#F2811D', // Un naranja un poco más intenso/rojizo
        },
        // Mantenemos los colores existentes de Tailwind si los usas en alguna parte,
        // o si los sobrescribes aquí, se usarán tus nuevas definiciones.
        // Por ejemplo, si quieres que tu 'emerald' o 'blueGray' default sea de tu paleta:
        // emerald: {
        //   600: '#12403B', // Si quieres que tu bg-emerald-600 ahora sea el darkGreen de tu floristería
        //   // ... puedes definir otros tonos de emerald aquí si los vas a usar
        // },
        // blueGray: {
        //   200: '#F3F4F6', // Un gris azulado claro, para fondos de footer, etc.
        //   // ...
        // },
      },
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        "55": "55rem",
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
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, theme }) {
      const screens = theme("screens", {});
      addComponents([
        {
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