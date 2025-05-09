import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import SummaryApi from "../common";
import tipoPaqueteCategoria from "../helpers/tipoPaqueteCategoria";
import pesoPaqueteCategoria from "../helpers/pesoPaqueteCategoria";
import { toast } from 'react-toastify';

const RegistrarMensajeria = () => {
    const [formData, setFormData] = useState({
        tipoDePaquete: '',
        pesoEstimado: '',
        direccionRecogida: '',
        direccionEntrega: '',
        fechaHoraRecogida: '',
        barrioEntrega: '',
        barrioRecogida: ''
    });

    const [precio, setPrecio] = useState(null); // Nuevo estado para el precio}
    const [barrios, setBarrios] = useState([]);
    const [filtro, setFiltro] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const fetchBarrios = async () => {
        try {
          const response = await fetch(SummaryApi.allBarrios.url, {
            method: SummaryApi.allBarrios.method,
            credentials: 'include',
          });
          const data = await response.json();
          console.log(data);
          setBarrios(data || []);
        } catch (err) {
          toast.error('Error al cargar barrios');
        }
      };

      const barriosFiltrados = barrios.filter((barrio) => {
        const query = filtro.toLowerCase();
        return (
          barrio.nombreBarrio.toLowerCase().includes(query) ||
          barrio.zona.toLowerCase().includes(query)
        );
      });

      const handleCalcularDistancia = () => {
        const { barrioRecogida, barrioEntrega } = formData;
    
        const barrioOrigen = barrios.find(b => b.nombreBarrio === barrioRecogida);
        const barrioDestino = barrios.find(b => b.nombreBarrio === barrioEntrega);
    
        if (!barrioOrigen || !barrioDestino) {
            toast.error("No se pudo calcular la distancia entre las direcciones.");
            toast.info("Por favor, contactanos por WhatsApp.");
            return;
        }
        let precioCalculado

        //logica de precios segun la zona

        if(barrioDestino.zona === "fuera" || barrioOrigen.zona === "fuera"){
            
            precioCalculado= barrioDestino.precioCentro;
        }
        else if (barrioDestino.zona === "centro"){

            if (barrioOrigen.zona === "centro") {

                if (barrioOrigen.precioCentro >= barrioDestino.precioCentro) {
                    precioCalculado = barrioOrigen.precioCentro;
                } else if (barrioDestino.precioCentro > barrioOrigen.precioCentro) {
                    precioCalculado = barrioDestino.precioCentro;
                }
            }
            else if (barrioOrigen.zona === "norte"){

                if(barrioOrigen.precioCentro >= barrioDestino.precioNorte){
                    precioCalculado= barrioOrigen.precioCentro;
                }else if(barrioDestino.precioNorte > barrioOrigen.precioCentro){
                    precioCalculado= barrioDestino.precioNorte;
                }
            }
            else if (barrioOrigen.zona === "sur"){

                if(barrioOrigen.precioCentro >= barrioDestino.precioSur){
                    precioCalculado= barrioOrigen.precioCentro;
                }else if(barrioDestino.precioSur > barrioOrigen.precioCentro){
                    precioCalculado= barrioDestino.precioSur;
                }
            }
            else if (barrioOrigen.zona === "oriente"){
                if(barrioOrigen.precioCentro >= barrioDestino.precioOriente){
                    precioCalculado= barrioOrigen.precioCentro;
                }else if(barrioDestino.precioOriente > barrioOrigen.precioCentro){
                    precioCalculado= barrioDestino.precioOriente;
                }
            }
            else if (barrioOrigen.zona === "occidente"){
                if(barrioOrigen.precioCentro >= barrioDestino.precioOccidente){
                    precioCalculado= barrioOrigen.precioCentro;
                }else if(barrioDestino.precioOccidente > barrioOrigen.precioCentro){
                    precioCalculado= barrioDestino.precioOccidente;
                }
            }
            
        }
        else if (barrioDestino.zona === "norte"){

            if (barrioOrigen.zona === "centro") {
                if (barrioOrigen.precioNorte >= barrioDestino.precioCentro) {
                    precioCalculado = barrioOrigen.precioNorte;
                } else if (barrioDestino.precioCentro > barrioOrigen.precioNorte) {
                    precioCalculado = barrioDestino.precioCentro;
                }
            }
            else if (barrioOrigen.zona === "norte"){
                if(barrioOrigen.precioNorte >= barrioDestino.precioNorte){
                    precioCalculado= barrioOrigen.precioNorte;
                }else if(barrioDestino.precioNorte > barrioOrigen.precioNorte){
                    precioCalculado= barrioDestino.precioNorte;
                }
            }
            else if (barrioOrigen.zona === "sur"){
                if(barrioOrigen.precioNorte >= barrioDestino.precioSur){
                    precioCalculado= barrioOrigen.precioNorte;
                }else if(barrioDestino.precioSur > barrioOrigen.precioNorte){
                    precioCalculado= barrioDestino.precioSur;
                }
            }
            else if (barrioOrigen.zona === "oriente"){
                if(barrioOrigen.precioNorte >= barrioDestino.precioOriente){
                    precioCalculado= barrioOrigen.precioNorte;
                }else if(barrioDestino.precioOriente > barrioOrigen.precioNorte){
                    precioCalculado= barrioDestino.precioOriente;
                }
            }
            else if (barrioOrigen.zona === "occidente"){
                if(barrioOrigen.precioNorte >= barrioDestino.precioOccidente){
                    precioCalculado= barrioOrigen.precioNorte;
                }else if(barrioDestino.precioOccidente > barrioOrigen.precioNorte){
                    precioCalculado= barrioDestino.precioOccidente;
                }
            }
            
        }
        else if (barrioDestino.zona === "sur"){

            if (barrioOrigen.zona === "centro") {
                if (barrioOrigen.precioSur >= barrioDestino.precioCentro) {
                    precioCalculado = barrioOrigen.precioSur;
                } else if (barrioDestino.precioCentro > barrioOrigen.precioSur) {
                    precioCalculado = barrioDestino.precioCentro;
                }
            }
            else if (barrioOrigen.zona === "norte"){
                if(barrioOrigen.precioSur >= barrioDestino.precioNorte){
                    precioCalculado= barrioOrigen.precioSur;
                }else if(barrioDestino.precioNorte > barrioOrigen.precioSur){
                    precioCalculado= barrioDestino.precioNorte;
                }
            }
            else if (barrioOrigen.zona === "sur"){
                if(barrioOrigen.precioSur >= barrioDestino.precioSur){
                    precioCalculado= barrioOrigen.precioSur;
                }else if(barrioDestino.precioSur > barrioOrigen.precioSur){
                    precioCalculado= barrioDestino.precioSur;
                }
            }
            else if (barrioOrigen.zona === "oriente"){
                if(barrioOrigen.precioSur >= barrioDestino.precioOriente){
                    precioCalculado= barrioOrigen.precioSur;
                }else if(barrioDestino.precioOriente > barrioOrigen.precioSur){
                    precioCalculado= barrioDestino.precioOriente;
                }
            }
            else if (barrioOrigen.zona === "occidente"){
                if(barrioOrigen.precioSur >= barrioDestino.precioOccidente){
                    precioCalculado= barrioOrigen.precioSur;
                }else if(barrioDestino.precioOccidente > barrioOrigen.precioSur){
                    precioCalculado= barrioDestino.precioOccidente;
                }
            }
            
        }
        else if (barrioDestino.zona === "oriente"){

            if (barrioOrigen.zona === "centro") {
                if (barrioOrigen.precioOriente >= barrioDestino.precioCentro) {
                    precioCalculado = barrioOrigen.precioOriente;
                } else if (barrioDestino.precioCentro > barrioOrigen.precioOriente) {
                    precioCalculado = barrioDestino.precioCentro;
                }
            }
            else if (barrioOrigen.zona === "norte"){
                if(barrioOrigen.precioOriente >= barrioDestino.precioNorte){
                    precioCalculado= barrioOrigen.precioOriente;
                }else if(barrioDestino.precioNorte > barrioOrigen.precioOriente){
                    precioCalculado= barrioDestino.precioNorte;
                }
            }
            else if (barrioOrigen.zona === "sur"){
                if(barrioOrigen.precioOriente >= barrioDestino.precioSur){
                    precioCalculado= barrioOrigen.precioOriente;
                }else if(barrioDestino.precioSur > barrioOrigen.precioOriente){
                    precioCalculado= barrioDestino.precioSur;
                }
            }
            else if (barrioOrigen.zona === "oriente"){
                if(barrioOrigen.precioOriente >= barrioDestino.precioOriente){
                    precioCalculado= barrioOrigen.precioOriente;
                }else if(barrioDestino.precioOriente > barrioOrigen.precioOriente){
                    precioCalculado= barrioDestino.precioOriente;
                }
            }
            else if (barrioOrigen.zona === "occidente"){
                if(barrioOrigen.precioOriente >= barrioDestino.precioOccidente){
                    precioCalculado= barrioOrigen.precioOriente;
                }else if(barrioDestino.precioOccidente > barrioOrigen.precioOriente){
                    precioCalculado= barrioDestino.precioOccidente;
                }
            }

            
        }
        else if (barrioDestino.zona === "occidente"){

            if (barrioOrigen.zona === "centro") {
                if (barrioOrigen.precioOccidente >= barrioDestino.precioCentro) {
                    precioCalculado = barrioOrigen.precioOccidente;
                } else if (barrioDestino.precioCentro > barrioOrigen.precioOccidente) {
                    precioCalculado = barrioDestino.precioCentro;
                }
            }
            else if (barrioOrigen.zona === "norte"){
                if(barrioOrigen.precioOccidente >= barrioDestino.precioNorte){
                    precioCalculado= barrioOrigen.precioOccidente;
                }else if(barrioDestino.precioNorte > barrioOrigen.precioOccidente){
                    precioCalculado= barrioDestino.precioNorte;
                }
            }
            else if (barrioOrigen.zona === "sur"){
                if(barrioOrigen.precioOccidente >= barrioDestino.precioSur){
                    precioCalculado= barrioOrigen.precioOccidente;
                }else if(barrioDestino.precioSur > barrioOrigen.precioOccidente){
                    precioCalculado= barrioDestino.precioSur;
                }
            }
            else if (barrioOrigen.zona === "oriente"){
                if(barrioOrigen.precioOccidente >= barrioDestino.precioOriente){
                    precioCalculado= barrioOrigen.precioOccidente;
                }else if(barrioDestino.precioOriente > barrioOrigen.precioOccidente){
                    precioCalculado= barrioDestino.precioOriente;
                }
            }
            else if (barrioOrigen.zona === "occidente"){
                if(barrioOrigen.precioOccidente >= barrioDestino.precioOccidente){
                    precioCalculado= barrioOrigen.precioOccidente;
                }else if(barrioDestino.precioOccidente > barrioOrigen.precioOccidente){
                    precioCalculado= barrioDestino.precioOccidente;
                }
            }
            
        }

        if (!formData.fechaHoraRecogida) {
            toast.warning("Por favor, selecciona una fecha para calcular el precio.");
            return; // Detiene la ejecución si no hay fecha
        }

        //logica segun la hora
        const fechaHoraRecogida = new Date(formData.fechaHoraRecogida);
        const horaRecogida = fechaHoraRecogida.getHours();

        if (horaRecogida >= 19 || horaRecogida < 6) {
            toast.info("Se aplicará una tarifa nocturna.");
            precioCalculado += 500; // Aumenta el precio en 500 por tarifa nocturna

        }

        setPrecio(precioCalculado); // Actualiza el precio calculado
    
    };
    

      const handleSubmit = async (e) => {
        e.preventDefault();

         // Validar que la fecha y hora de recogida no estén en el pasado
         const fechaHoraRecogida = new Date(formData.fechaHoraRecogida);
         const ahora = new Date();
     
         if (fechaHoraRecogida < ahora) {
             toast.error("La fecha y hora de recogida no pueden estar en el pasado.");
             return;
         }
 

        try {
            const { barrioRecogida, barrioEntrega } = formData;
    
        const barrioOrigen = barrios.find(b => b.nombreBarrio === barrioRecogida);
        const barrioDestino = barrios.find(b => b.nombreBarrio === barrioEntrega);

        if (!barrioOrigen || !barrioDestino) {

            // Formatear la fecha y hora de recogida de manera más legible
            const fechaHoraFormateada = new Date(formData.fechaHoraRecogida).toLocaleString('es-CO', {
                weekday: 'long', // Día de la semana (opcional)
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // Usar formato de 12 horas (AM/PM)
            });

            // Crear el mensaje para WhatsApp con un formato más claro
            const mensaje = `
    Detalles de la Orden de Mensajería:
    
    ──────────────────────
    Direcciónes:
    Recogida: ${formData.direccionRecogida}, ${formData.barrioRecogida}
    Entrega: ${formData.direccionEntrega}, ${formData.barrioEntrega}
    ──────────────────────
    Tipo de Paquete: ${formData.tipoDePaquete}
    Peso Estimado: ${formData.pesoEstimado} kg
    ──────────────────────
    Fecha y Hora de Recogida: ${fechaHoraFormateada}
    ──────────────────────
    Precio sin calcular
    ──────────────────────
    Orden de mensajeria sin calcular precio
            `;

             // URL para WhatsApp (ajustar el número y el mensaje)
             const telefono = "+573025887156"; // Número de teléfono del destinatario
             const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
     
             // Redirigir a WhatsApp para enviar el mensaje
             
             window.open(urlWhatsApp, '_blank');

        }else {
            // Formatear la fecha y hora de recogida de manera más legible
            const fechaHoraFormateada = new Date(formData.fechaHoraRecogida).toLocaleString('es-CO', {
                weekday: 'long', // Día de la semana (opcional)
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // Usar formato de 12 horas (AM/PM)
            });

            // Crear el mensaje para WhatsApp con un formato más claro
            const mensaje = `
    Detalles de la Orden de Mensajería:
    
    ──────────────────────
    Direcciónes:
    Recogida: ${formData.direccionRecogida}, ${formData.barrioRecogida}
    Entrega: ${formData.direccionEntrega}, ${formData.barrioEntrega}
    ──────────────────────
    Tipo de Paquete: ${formData.tipoDePaquete}
    Peso Estimado: ${formData.pesoEstimado} kg
    ──────────────────────
    Fecha y Hora de Recogida: ${fechaHoraFormateada}
    ──────────────────────
    Precio sugerido: ${precio != null ? `$${precio.toLocaleString()}` : "No disponible"}
            `;

               // URL para WhatsApp (ajustar el número y el mensaje)
               const telefono = "+573025887156"; // Número de teléfono del destinatario
               const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
       
               // Redirigir a WhatsApp para enviar el mensaje
               window.open(urlWhatsApp, '_blank');

               }

               const response = await fetch(SummaryApi.addMensaje.url, {
                method : SummaryApi.addMensaje.method,
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    direccionRecogida: formData.direccionRecogida + ", " + formData.barrioRecogida,
                    direccionEntrega: formData.direccionEntrega + ", " + formData.barrioEntrega,
                    precio: precio // Incluye el precio calculado

                })
            });
            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
            } else if (data.error) {
                toast.error(data.message);
            }     

        } catch (error) {

            toast.error("Error al registrar la orden de mensajería");

            
        }


      }

   useEffect(() => {
       fetchBarrios();
   
     }, []);
   
    
    

    

    return (
        
        <section id='registrar-mensajeria' className="flex items-center justify-center min-h-screen bg-cover bg-center">
            <div className='bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg' style={{ margin: '1%', opacity: '0.85' }}>
                <h2 className="text-center font-bold text-xl mb-6">Registrar Orden de Mensajería</h2>


                <form onSubmit={handleSubmit}>
                    <div className='grid mb-4'>
                        <label className="text-gray-600">Tipo de Paquete:</label>
                        <div className='bg-gray-100 p-3 rounded-lg'>
                            <select
                                name="tipoDePaquete"
                                value={formData.tipoDePaquete}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent outline-none"
                            >
                                <option value="">Seleccione una categoría</option>
                                {tipoPaqueteCategoria.map((categoria) => (
                                    <option key={categoria.id} value={categoria.value}>
                                        {categoria.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Peso Estimado (kg):</label>
                        <div className='bg-gray-100 p-3 rounded-lg'>
                            <select
                                name="pesoEstimado"
                                value={formData.pesoEstimado}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent outline-none"
                            >
                                <option value="">Seleccione un peso</option>
                                {pesoPaqueteCategoria.map((peso) => (
                                    <option key={peso.id} value={peso.value}>
                                        {peso.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <datalist id="barrios">
    {barriosFiltrados.map((barrio, index) => (
        <option key={index} value={barrio.nombreBarrio} />
    ))}
</datalist>



                    <div className='grid grid-cols-2 gap-4'>
                    <div>
                            <label className="text-gray-600">Dirección de Recogida:</label>
                            <input
                                type="text"
                                name="direccionRecogida"
                                value={formData.direccionRecogida}
                                onChange={handleChange}
                                className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                                placeholder="Calle 123"
                            />
                        </div>
                        <div>
                            <label htmlFor="barrioRecogida" className="text-gray-600">Barrio de Recogida:</label>
                            <input
                                list="barrios"
                                name="barrioRecogida"
                                value={formData.barrioRecogida}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                                placeholder="Escribe el barrio "
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                    <div>
                            <label className="text-gray-600">Dirección de Entrega:</label>
                            <input
                                type="text"
                                name="direccionEntrega"
                                value={formData.direccionEntrega}
                                onChange={handleChange}
                                className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                                placeholder="Cra 123"
                            />
                        </div>
                        <div>
                            <label htmlFor="barrioEntrega" className="text-gray-600">Barrio de Entrega:</label>
                            <input
                                list="barrios"
                                name="barrioEntrega"
                                value={formData.barrioEntrega}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                                placeholder="Escribe el barrio "
                            />
                        </div>
                    </div>

                    <div className='grid mb-4'>
                        <label className="text-gray-600">Fecha y Hora de Recogida:</label>
                        <input
                            type="datetime-local"
                            name="fechaHoraRecogida"
                            value={formData.fechaHoraRecogida}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 p-3 rounded-lg outline-none"
                        />
                    </div>

                    <div className="mb-4 text-center">
                        <button
                            type="button"
                            onClick={handleCalcularDistancia}
                            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                            Calcular Distancia
                        </button>
                    </div>

                    {precio && (
    <div className="mb-4 text-center">
        <p className="text-lg font-semibold">
            Precio sugerido: ${precio.toLocaleString()}
        </p>
    </div>
)}


<div className="mb-4 text-center">
                            
<button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Contactar por WhatsApp
                    </button>
                        </div>
                </form>

                <Link to="/historial-mensajeria" className="text-blue-500 mt-4">
                    Historial de órdenes de mensajería
                </Link>
                
            </div>
        </section>
    );
};

export default RegistrarMensajeria;

