const Usuario = require('../../models/userModel');
const Mensajeria = require('../../models/mensajeriaModel');

// Controlador para asignar un domiciliario a una orden
const assignDomiciliaryToOrder = async (req, res) => {
  const { orderId, repartidorId } = req.body;

  try {
    // Verificar que el usuario tenga el rol de domiciliario
    const repartidor = await Usuario.findById(repartidorId);
    if (!repartidor || !repartidor.role.includes('domiciliario')) {
      return res.status(400).json({ message: 'El usuario no tiene el rol de domiciliario' });
    }

    // Actualizar la orden con el nombre del repartidor
    const updatedOrder = await Mensajeria.findByIdAndUpdate(
      orderId,
      { nombreRepartidor: repartidor._id },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar el domiciliario', error });
  }
};

module.exports = assignDomiciliaryToOrder ;
