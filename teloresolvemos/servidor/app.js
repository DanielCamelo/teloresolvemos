// server/app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.send('API is running');
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
