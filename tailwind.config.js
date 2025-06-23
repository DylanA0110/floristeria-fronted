/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             // Asegura que Tailwind escanee tu archivo HTML principal
    "./src/**/*.{vue,js,ts,jsx,tsx}", // ¡Esta línea es CRUCIAL! Le dice a Tailwind que escanee todos los archivos .vue, .js, .ts, etc. dentro de la carpeta 'src' y sus subcarpetas.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}