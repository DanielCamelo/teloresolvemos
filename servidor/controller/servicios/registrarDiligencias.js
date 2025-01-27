const Diligencias = require("../../models/diligenciasModel");

const registrarDiligencias = async (req, res) => {
    try {
        const currentUser = req.userId; // Obtener el usuario actual (cliente)
        const {
            descripcionDiligencia, 
            direccionInvolucrados, 
            documentosNecesarios, 
            fechaHoraRecogida, 
            precio
        } = req.body;

        // Crear el payload con la información para el nuevo registro
        const payload = {
            nombreCliente: currentUser, // Asigna el nombre del cliente a partir del usuario logueado
            descripcionDiligencia, 
            direccionInvolucrados, 
            documentosNecesarios, 
            fechaHoraRecogida, 
            estado: 'pendiente', // Estado inicial
            precio
        };

        // Crear una nueva orden de Diligencias
        const nuevoDiligencias = new Diligencias(payload);

        // Guardar la orden en la base de datos
        const diligenciasGuardado = await nuevoDiligencias.save();

        // Respuesta exitosa
        return res.json({
            data: diligenciasGuardado,
            message: "Orden de diligencias registrada exitosamente",
            success: true,
            error: false
        });

    } catch (err) {
        // Respuesta de error
        res.json({
            message: err.message || "Error al registrar la orden de diligencias",
            error: true,
            success: false
        });
    }
};

module.exports = registrarDiligencias;