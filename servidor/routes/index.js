const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
  const usuario = new User({
    nombre: req.body.nombre,
    correo: req.body.correo,
    teléfono: req.body.teléfono,
    password: req.body.password,
    tipoUsuario: req.body.tipoUsuario
  });

  try {
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;