const User = require('../../models/userModel'); // Ajusta el path según tu estructura de carpetas

// Controlador para obtener todos los usuarios con rol de domiciliario
const getDomiciliarios = async (req, res) => {
  try {
    // Filtrar usuarios que tengan "domiciliario" en el array de roles
    const domiciliarios = await User.find({ role: { $in: ['domiciliario'] } })
      .select('-password'); // Excluir contraseña de la respuesta

    // Si no hay domiciliarios
    if (!domiciliarios.length) {
      return res.status(404).json({ message: 'No hay domiciliarios disponibles' });
    }

    // Enviar respuesta con los domiciliarios encontrados
    res.status(200).json({
      success: true,
      message: 'Domiciliarios obtenidos con éxito',
      data: domiciliarios,
    });
  } catch (error) {
    console.error('Error en getDomiciliarios:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error interno al obtener los domiciliarios',
      error: error.message 
    });
  }
};

module.exports = getDomiciliarios ;

