const Barrios = require('../../models/barriosModel'); 

// Subir un nuevo barrio
const uploadBarrio = async (req, res) => {
  try {
    const {
      nombreBarrio,
      zona,
      precioSur,
      precioNorte,
      precioCentro,
      precioOccidente,
      precioOriente,
    } = req.body;

    // Validar campos requeridos
    if (
      !nombreBarrio ||
      !zona ||
      precioSur == null ||
      precioNorte == null ||
      precioCentro == null ||
      precioOccidente == null ||
      precioOriente == null
    ) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Crear y guardar el nuevo barrio
    const nuevoBarrio = new Barrios({
      nombreBarrio,
      zona,
      precioSur,
      precioNorte,
      precioCentro,
      precioOccidente,
      precioOriente,
    });

    await nuevoBarrio.save();

    res.status(201).json({
      message: 'Barrio creado exitosamente',
      barrio: nuevoBarrio,
    });
  } catch (error) {
    console.error('Error al subir el barrio:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = uploadBarrio;
