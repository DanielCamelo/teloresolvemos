/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',  // Móviles
        'md': '768px',  // Tabletas
        'lg': '1024px', // Pantallas de PC pequeñas
        'xl': '1280px', // Pantallas de PC grandes
      },
      colors: {
        primary: '#FF6363',
        secondary: '#3B82F6',
        accent: '#22ea00',
      },
      backgroundImage: {
        'mobile': "url('/src/assets/fondoMovil.png')", // Fondo para móviles
       // 'desktop': "url('/src/assets/fondoDesktop.jpg')", // Puedes añadir otro para pantallas grandes
      },
    },
  },
  plugins: [],
};
