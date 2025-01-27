const User = require('../../models/userModel'); // Ajusta el path según tu estructura de carpetas

// Controlador para obtener todos los usuarios con rol de domiciliario
const getConductores = async (req, res) => {
  try {
    // Filtrar usuarios que tengan "domiciliario" en el array de roles
    const Conductores = await User.find({ role: { $in: ['conductor'] } });

    // Si no hay domiciliarios
    if (!Conductores.length) {
      return res.status(404).json({ message: 'No hay Conductores disponibles' });
    }

    // Enviar respuesta con los domiciliarios encontrados
    res.status(200).json({
      message: 'Conductores obtenidos con éxito',
      data: Conductores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los Conductores' });
  }
};

module.exports = getConductores ;