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

//Conexión con la base de datos
const connectDB = require('./config/db');
connectDB();

// app.js
const { connect } = require('./database');  // Se ajusta la ruta del database

// Arrancar el servidor
connect().then(() => {
  // Aquí puedes continuar con la inicialización de tu servidor
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(console.error);

