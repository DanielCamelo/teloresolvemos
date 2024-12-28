const Domicilios = require("../../models/domiciliosModel");

const registrarDomicilio = async (req, res) => {
    try {
        const currentUser = req.userId; // Obtener el usuario actual (cliente)
        const {
            categoriaProducto, 
            descripcionProducto, 
            direccionRecogida, 
            direccionEntrega, 
            opcionPago, 
            comentario, 
            precio
        } = req.body;

        // Crear el payload con la información para el nuevo registro
        const payload = {
            nombreCliente: currentUser, // Asigna el nombre del cliente a partir del usuario logueado
            categoriaProducto,
            descripcionProducto,
            direccionRecogida,
            direccionEntrega,
            opcionPago,
            comentario,
            estado: 'pendiente', // Estado inicial
            precio
        };

        // Crear una nueva orden de domicilio
        const nuevoDomicilio = new Domicilios(payload);

        // Guardar la orden en la base de datos
        const domicilioGuardado = await nuevoDomicilio.save();

        // Respuesta exitosa
        return res.json({
            data: domicilioGuardado,
            message: "Orden de domicilio registrada exitosamente",
            success: true,
            error: false
        });

    } catch (err) {
        // Respuesta de error
        res.json({
            message: err.message || "Error al registrar la orden de domicilio",
            error: true,
            success: false
        });
    }
};

module.exports = registrarDomicilio;
