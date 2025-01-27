const Mensajeria = require('../../models/mensajeriaModel');
const Domicilio = require('../../models/domiciliosModel');
const TransporteParticular = require('../../models/transporteParticulaModel');
const TransporteSalud = require('../../models/transporteSaludModel');
const ComprasIntermunicipales = require('../../models/comprasIntermunicipalesModel');
const Diligencias = require('../../models/diligenciasModel');

// Controlador para cambiar el estado de una orden
const updateOrderStatus = async (req, res) => {
  const { orderId, nuevoEstado } = req.body;

  try {
    // Validar que el estado es uno de los permitidos
    const estadosPermitidos = ['pendiente', 'en proceso', 'entregado', 'cancelado'];
    if (!estadosPermitidos.includes(nuevoEstado)) {
      return res.status(400).json({ message: 'Estado no válido' });
    }

    // Intentar actualizar la orden de mensajería
    let updatedOrder = await Mensajeria.findByIdAndUpdate(
      orderId,
      { estado: nuevoEstado },
      { new: true } // Devuelve el documento actualizado
    );

    // Si no se encuentra en Mensajeria, intentar con Domicilio
    if (!updatedOrder) {
      updatedOrder = await Domicilio.findByIdAndUpdate(
        orderId,
        { estado: nuevoEstado },
        { new: true } // Devuelve el documento actualizado
      );
    }

    if (!updatedOrder) {
      updatedOrder = await TransporteParticular.findByIdAndUpdate(
        orderId,
        { estado: nuevoEstado },
        { new: true } // Devuelve el documento actualizado
      );
    }

    if (!updatedOrder) {
      updatedOrder = await TransporteSalud.findByIdAndUpdate(
        orderId,
        { estado: nuevoEstado },
        { new: true } // Devuelve el documento actualizado
      );
    }

    if (!updatedOrder) {
      updatedOrder = await ComprasIntermunicipales.findByIdAndUpdate(
        orderId,
        { estado: nuevoEstado },
        { new: true } // Devuelve el documento actualizado
      );
    }

    if (!updatedOrder) {
      updatedOrder = await Diligencias.findByIdAndUpdate(
        orderId,
        { estado: nuevoEstado },
        { new: true } // Devuelve el documento actualizado
      );
    }

    // Si la orden no se encuentra en ninguno de los dos modelos
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado de la orden', error });
  }
};

module.exports = updateOrderStatus;

