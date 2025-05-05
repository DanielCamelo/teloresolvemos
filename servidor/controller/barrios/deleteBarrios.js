const Barrios = require('../../models/barriosModel'); 

// Eliminar un barrio por su ID
const deleteBarrios = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: 'El ID del barrio es requerido' });
    }

    const barrioEliminado = await Barrios.findByIdAndDelete(_id);

    if (!barrioEliminado) {
      return res.status(404).json({ message: 'Barrio no encontrado' });
    }

    res.status(200).json({
      message: 'Barrio eliminado correctamente',
      barrio: barrioEliminado,
    });
  } catch (error) {
    console.error('Error al eliminar el barrio:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = deleteBarrios;
