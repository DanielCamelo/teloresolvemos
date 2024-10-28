const Mensajeria = require('../../models/mensajeriaModel');

// Controlador para registrar una nueva mensajería
const registrarMensajeria = async (req, res) => {
  try {
    const {
      nombreCliente,
      nombreRepartidor,
      tipoDePaquete,
      pesoEstimado,
      dimensiones,
      direccionRecogida,
      direccionEntrega,
      fechaHoraRecogida,
    } = req.body;

    // Crear una nueva instancia del modelo Mensajeria
    const nuevoPaquete = new Mensajeria({
      nombreCliente,
      nombreRepartidor,
      tipoDePaquete,
      pesoEstimado,
      dimensiones,
      direccionRecogida,
      direccionEntrega,
      fechaHoraRecogida,
    });

    // Guardar el paquete en la base de datos
    await nuevoPaquete.save();
    res.status(201).json({ mensaje: 'Mensajería registrada exitosamente', paquete: nuevoPaquete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar la mensajería', error: error.message });
  }
};

module.exports = registrarMensajeria;
