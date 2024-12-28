const Domicilio = require('../../models/domiciliosModel');

// Controlador para obtener todas las órdenes de mensajería
const getAllDomiciliOrder = async (req, res) => {
  try {
    const orders = await Domicilio.find();
    res.status(200).json({
      success: true,
      data: orders, // Los datos estarán bajo la propiedad "data"
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes', error });
  }
};

module.exports = getAllDomiciliOrder;