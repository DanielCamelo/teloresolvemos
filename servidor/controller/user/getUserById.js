const userModel = require('../../models/userModel'); // Importa el modelo de usuario

// Controlador para obtener los datos completos de los usuarios por una lista de IDs
const getClientesByIds = async (req, res) => {
    try {
        const { clienteIds } = req.body; // Los IDs de los clientes se reciben en el cuerpo de la solicitud

        // Verifica si la lista de IDs está vacía o no es un array
        if (!Array.isArray(clienteIds) || clienteIds.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar una lista de IDs de clientes.' });
        }

        // Busca los usuarios cuyos IDs estén en la lista proporcionada
        const clientes = await userModel.find({ '_id': { $in: clienteIds } }); // No se utiliza .select, para que devuelva todos los campos

        // Verifica si se encontraron clientes
        if (clientes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron clientes con los IDs proporcionados.' });
        }

        // Responde con los clientes encontrados
        return res.status(200).json({ data: clientes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los clientess', error });
    }
};

module.exports = getClientesByIds; // Exporta el controlador