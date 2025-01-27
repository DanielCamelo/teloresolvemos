const Mensajeria = require('../../models/mensajeriaModel');
const Domicilio = require('../../models/domiciliosModel');
const TransporteParticular = require('../../models/transporteParticulaModel');
const TransporteSalud = require('../../models/transporteSaludModel');
const ComprasIntermunicipales = require('../../models/comprasIntermunicipalesModel');
const Diligencias = require('../../models/diligenciasModel');

// Controlador para cambiar el estado de una orden
const actualizarPrecio = async (req, res) => {
  const { orderId, nuevoPrecio } = req.body;

  try {
    if (!orderId || !nuevoPrecio || isNaN(nuevoPrecio)) {
      return res.status(400).json({ message: 'ID de orden o precio no válido' });
    }

    console.log(`Intentando actualizar precio para la orden con ID: ${orderId}, nuevo precio: ${nuevoPrecio}`);

    let updatedPrecio;

    // Intentar actualizar la orden en Mensajeria
    updatedPrecio = await Mensajeria.findByIdAndUpdate(
      orderId,
      { precio: nuevoPrecio },
      { new: true }
    );
    if (updatedPrecio) return res.status(200).json(updatedPrecio);
    console.log(`No se encontró la orden en Mensajeria: ${orderId}`);

    // Si no se encuentra en Mensajeria, intentar con Domicilio
    updatedPrecio = await Domicilio.findByIdAndUpdate(
      orderId,
      { precio: nuevoPrecio },
      { new: true }
    );
    if (updatedPrecio) return res.status(200).json(updatedPrecio);
    console.log(`No se encontró la orden en Domicilio: ${orderId}`);

    // Si no se encuentra en Domicilio, intentar con TransporteParticular
    updatedPrecio = await TransporteParticular.findByIdAndUpdate(
      orderId,
      { precio: nuevoPrecio },
      { new: true }
    );
    if (updatedPrecio) return res.status(200).json(updatedPrecio);
    console.log(`No se encontró la orden en TransporteParticular: ${orderId}`);

    // Si no se encuentra en TransporteParticular, intentar con TransporteSalud
    updatedPrecio = await TransporteSalud.findByIdAndUpdate(
      orderId,
      { precio: nuevoPrecio },
      { new: true }
    );
    if (updatedPrecio) return res.status(200).json(updatedPrecio);
    console.log(`No se encontró la orden en TransporteSalud: ${orderId}`);

    // Si no se encuentra en TransporteSalud, intentar con ComprasIntermunicipales
    updatedPrecio = await ComprasIntermunicipales.findByIdAndUpdate(
      orderId,
      { precio: nuevoPrecio },
      { new: true }
    );
    if (updatedPrecio) return res.status(200).json(updatedPrecio);
    console.log(`No se encontró la orden en ComprasIntermunicipales: ${orderId}`);

    // Si no se encuentra en ComprasIntermunicipales, intentar con Diligencias
    updatedPrecio = await Diligencias.findByIdAndUpdate(
      orderId,
      { precio: nuevoPrecio },
      { new: true }
    );
    if (updatedPrecio) return res.status(200).json(updatedPrecio);
    console.log(`No se encontró la orden en Diligencias: ${orderId}`);

    // Si la orden no se encuentra en ninguno de los modelos
    return res.status(404).json({ message: `Orden con ID ${orderId} no encontrada en ninguna colección` });

  } catch (error) {
    console.error('Error al intentar actualizar el precio de la orden:', error);
    res.status(500).json({
      message: 'Error al actualizar el precio de la orden',
      error: error.message || error // Incluye el mensaje del error si está disponible
    });
  }
};

module.exports = actualizarPrecio;
