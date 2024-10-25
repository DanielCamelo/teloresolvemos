const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('conectado a la base de datos de MongoDB');
    }catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;

//Importar colecciones
const User = require('../models/userModel');
const Service = require('../models/servicesModel');
const Operator = require('../models/operatorModel');
const Admin = require('../models/adminModel');

// Ejemplo de cómo crear un usuario
const crearUsuario = async () => {
  try {
    const nuevoUsuario = new User({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      teléfono: '555-1234',
      password: 'hashed_password',
      tipoUsuario: 'cliente',
    });

    const usuarioGuardado = await nuevoUsuario.save();
    console.log('Usuario guardado:', usuarioGuardado);
  } catch (err) {
    console.error('Error al guardar usuario:', err);
  }
};

// Llamar a la función para crear un usuario
crearUsuario();