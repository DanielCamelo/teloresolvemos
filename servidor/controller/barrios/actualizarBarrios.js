const Barrios = require('../../models/barriosModel'); 

// Actualizar los datos de un barrio
const updateBarrio = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: 'El ID del barrio es requerido' });
    }

    const datosActualizados = req.body;

    const barrioActualizado = await Barrios.findByIdAndUpdate(
      _id,
      datosActualizados,
      { new: true } // Retorna el documento actualizado
    );

    if (!barrioActualizado) {
      return res.status(404).json({ message: 'Barrio no encontrado' });
    }

    res.status(200).json({
      message: 'Barrio actualizado correctamente',
      barrio: barrioActualizado,
    });
  } catch (error) {
    console.error('Error al actualizar el barrio:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = updateBarrio;
