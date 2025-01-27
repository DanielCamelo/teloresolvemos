const Diligencias = require("../../models/diligenciasModel");

// Controlador para obtener todas las órdenes de mensajería
const getAllDiligenciasOrder = async (req, res) => {
  try {
    const orders = await Diligencias.find();
    res.status(200).json({
      success: true,
      data: orders, // Los datos estarán bajo la propiedad "data"
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes', error });
  }
};

module.exports = getAllDiligenciasOrder;