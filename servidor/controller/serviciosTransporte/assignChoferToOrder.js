const Usuario = require('../../models/userModel');
const TransporteParticular = require('../../models/transporteParticulaModel');
const TransporteSalud = require('../../models/transporteSaludModel');


// Controlador para asignar un domiciliario a una orden
const assignChoferToOrder = async (req, res) => {
  const { orderId, choferId } = req.body;

  try {
    // Verificar que el usuario tenga el rol de domiciliario
    const chofer= await Usuario.findById(choferId);
    if (!chofer || !chofer.role.includes('conductor')) {
      return res.status(400).json({ message: 'El usuario no tiene el rol de conductor' });
    }

    // Intentar asignar el repartidor a la orden de mensajería
    let updatedOrder = await TransporteParticular.findByIdAndUpdate(
      orderId,
      { nombreChofer: chofer._id },
      { new: true } // Devuelve el documento actualizado
    );

    // Si no se encuentra la orden en Mensajeria, buscar en Domicilio
    if (!updatedOrder) {
      updatedOrder = await TransporteSalud.findByIdAndUpdate(
        orderId,
        { nombreChofer: chofer._id },
        { new: true } // Devuelve el documento actualizado
      );
    }

    // Si la orden no se encuentra en ninguno de los dos modelos
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar el conductor', error });
  }
};


module.exports = assignChoferToOrder ;