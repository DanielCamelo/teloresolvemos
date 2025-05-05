const Barrios = require('../../models/barriosModel'); // Ajusta la ruta si es necesario

// Obtener todos los barrios
const allBarrios = async (req, res) => {
  try {
    const barrios = await Barrios.find().sort({ createdAt: -1 }); // Ordena por fecha descendente (más recientes primero)

    res.status(200).json(barrios);
  } catch (error) {
    console.error('Error al obtener los barrios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = allBarrios;
