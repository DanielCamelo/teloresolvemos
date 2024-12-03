const User = require('../../models/userModel'); // Ajusta el path según tu estructura de carpetas

// Controlador para obtener todos los usuarios con rol de domiciliario
const getDomiciliarios = async (req, res) => {
  try {
    // Filtrar usuarios que tengan "domiciliario" en el array de roles
    const domiciliarios = await User.find({ role: { $in: ['domiciliario'] } });

    // Si no hay domiciliarios
    if (!domiciliarios.length) {
      return res.status(404).json({ message: 'No hay domiciliarios disponibles' });
    }

    // Enviar respuesta con los domiciliarios encontrados
    res.status(200).json({
      message: 'Domiciliarios obtenidos con éxito',
      data: domiciliarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los domiciliarios' });
  }
};

module.exports = getDomiciliarios ;
