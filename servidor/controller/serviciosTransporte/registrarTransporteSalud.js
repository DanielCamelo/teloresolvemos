const TransporteSalud = require("../../models/transporteSaludModel");

const registrarTransporteSalud = async (req, res) => {
    try {
        const currentUser = req.userId; // Obtener el usuario actual (cliente)
        const {
            tipoDeVehiculo,
            NumeroPasajeros,
            direccionRecogida,
            direccionEntrega,
            fechaHoraRecogida,
            opcionDeViaje,
            precio
        } = req.body;

        // Crear el payload con la información para el nuevo registro
        const payload = {
            nombreCliente: currentUser, // Asigna el nombre del cliente a partir del usuario logueado
            tipoDeVehiculo,
            NumeroPasajeros,
            direccionRecogida,
            direccionEntrega,
            fechaHoraRecogida,
            opcionDeViaje,
            estado: 'pendiente', // Estado inicial
            precio
        };

        // Crear una nueva orden de transporte particular
        const nuevoTransporteSalud = new TransporteSalud(payload);

        // Guardar la orden en la base de datos
        const TransporteSaludGuardado = await nuevoTransporteSalud.save();

        // Respuesta exitosa
        return res.json({
            data: TransporteSaludGuardado,
            message: "Orden de transporte Salud registrada con éxito",
            success: true,
            error: false
        });

    } catch (err) {
        // Respuesta de error
        res.json({
            message: err.message || "Error al registrar la orden de transporte Salud",
            error: true,
            success: false
        });
    }
};

module.exports = registrarTransporteSalud;