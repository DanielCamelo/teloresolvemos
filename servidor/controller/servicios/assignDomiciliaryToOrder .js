const Usuario = require('../../models/userModel');
const Mensajeria = require('../../models/mensajeriaModel');
const Domicilio = require('../../models/domiciliosModel');

// Controlador para asignar un domiciliario a una orden
const assignDomiciliaryToOrder = async (req, res) => {
  const { orderId, repartidorId } = req.body;

  try {
    // Verificar que el usuario tenga el rol de domiciliario
    const repartidor = await Usuario.findById(repartidorId);
    if (!repartidor || !repartidor.role.includes('domiciliario')) {
      return res.status(400).json({ message: 'El usuario no tiene el rol de domiciliario' });
    }

    // Intentar asignar el repartidor a la orden de mensajería
    let updatedOrder = await Mensajeria.findByIdAndUpdate(
      orderId,
      { nombreRepartidor: repartidor._id },
      { new: true } // Devuelve el documento actualizado
    );

    // Si no se encuentra la orden en Mensajeria, buscar en Domicilio
    if (!updatedOrder) {
      updatedOrder = await Domicilio.findByIdAndUpdate(
        orderId,
        { nombreRepartidor: repartidor._id },
        { new: true } // Devuelve el documento actualizado
      );
    }

    // Si la orden no se encuentra en ninguno de los dos modelos
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar el domiciliario', error });
  }
};


module.exports = assignDomiciliaryToOrder ;
