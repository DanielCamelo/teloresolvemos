import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaClock, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Importa iconos
import { jsPDF } from "jspdf";
import SummaryApi from "../common";
import logo from "../assets/Logo PNG.png";

const DetalleMensajeria = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          SummaryApi.getMensajeriaByUserIdAndOrderId.url(orderId),
          {
            method: SummaryApi.getMensajeriaByUserIdAndOrderId.method,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setOrder(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error al obtener los detalles de la orden.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const isActive = (currentStatus, targetStatus) => {
    const estados = ["pendiente", "en proceso", "entregado", "cancelado"];
    return estados.indexOf(currentStatus) >= estados.indexOf(targetStatus);
  };

  const downloadPDF = () => {
    if (!order) return;
    const doc = new jsPDF();
  
    // Configuración general
    doc.setFont("helvetica", "normal");
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Agregar el logo en la esquina superior izquierda
     // Agregar el logo en la parte superior derecha con mayor tamaño
  const logoWidth = 50; // Nuevo ancho del logo
  const logoHeight = 50; // Nuevo alto del logo
  const logoX = pageWidth - logoWidth - 10; // Posición a la derecha con un margen de 10
  const logoY = 10; // Posición en la parte superior con un margen de 10
  doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
  
    // Encabezado
    doc.setFontSize(18);
    doc.text("ORDEN DE MENSAJERÍA", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("TE LO RESOLVEMOS", pageWidth / 2, 30, { align: "center" });
    
  
    // Borde del encabezado
    doc.rect(10, 10, pageWidth - 20, 40);
  
    // Información de la orden
    doc.setFont("helvetica", "bold");
    doc.text("Detalles de la Orden:", 10, 55);
  
    const infoYStart = 60;
    const lineSpacing = 10;
    let currentY = infoYStart;
  
    // Crear una tabla de dos columnas: Detalles de la Orden y Estado del Pedido
    const columnWidth = (pageWidth - 20) / 2; // Dividir el ancho de la página en dos
  
    // Columna izquierda: Detalles de la Orden
    doc.setFont("helvetica", "normal");
    doc.text(`N° de Orden: ${order._id || "No disponible"}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Fecha: ${new Date(order.fechaHoraRecogida).toLocaleDateString()}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Cliente: ${order.nombreCliente?.name || "No disponible"}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Repartidor: ${order.nombreRepartidor?.name || "No asignado"}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Peso Estimado: ${order.pesoEstimado} kg`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Dirección de Recogida: ${order.direccionRecogida}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Dirección de Entrega: ${order.direccionEntrega}`, 10, currentY);
    currentY += lineSpacing;
  
    // Columna derecha: Estado del Pedido
    doc.setFont("helvetica", "bold");
    doc.text("Estado del Pedido:", columnWidth + 10, infoYStart); // Colocar el título a la derecha
    currentY = infoYStart;
    doc.setFont("helvetica", "normal");
    doc.text(`Estado del pedido: ${order.estado || "No disponible"}`, columnWidth + 10, currentY + lineSpacing);
  
    // Ajustar el espacio para la tabla de precios
    const tableYStart = currentY + lineSpacing + 60; // Ajustar el inicio de la tabla para que haya espacio suficiente
    doc.setFont("helvetica", "bold");
    doc.text("Resumen de Precios:", 10, tableYStart);
  
    const tableY = tableYStart + 5;
  
    // Dibujar tabla
    doc.rect(10, tableY, pageWidth - 20, 40); // Borde principal de la tabla
    doc.line(10, tableY + 10, pageWidth - 10, tableY + 10); // Línea horizontal separadora
    doc.line(120, tableY, 120, tableY + 40); // Línea vertical para separar columnas
  
    // Títulos de columnas
    doc.text("Concepto", 15, tableY + 7);
    doc.text("Precio", 125, tableY + 7);
  
    // Rellenar tabla
    doc.setFont("helvetica", "normal");
    doc.text("Servicio de mensajería", 15, tableY + 17);
    doc.text(`$${order.precio}`, 125, tableY + 17);
  
    // Total
    doc.setFont("helvetica", "bold");
    doc.text("Total:", 125, tableY + 37);
    doc.text(`$${order.precio}`, 140, tableY + 37);
  
    // Pie de página
    const footerY = tableY + 50;
    doc.setFontSize(10);
    doc.text(
      "Gracias por confiar en TE LO RESOLVEMOS para sus servicios.",
      pageWidth / 2,
      footerY,
      { align: "center" }
    );
  
    // Guardar el archivo
    doc.save(`detalle_mensajeria_${order._id || "orden"}.pdf`);
  };
  
  
  

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mt-4 mb-6">
      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : order ? (
        <div>
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-bold">{order.tipoDePaquete}</h2>
            <span className="text-sm text-gray-500">
              {new Date(order.fechaHoraRecogida).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between items-center my-4">
            <div className="flex items-center space-x-4">
              <div
                className={`flex flex-col items-center ${
                  isActive(order.estado, "pendiente")
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                <FaClock size={24} />
                <span className="text-xs">Pendiente</span>
              </div>
              <div
                className={`flex flex-col items-center ${
                  isActive(order.estado, "en proceso")
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                <FaTruck size={24} />
                <span className="text-xs">En Proceso</span>
              </div>
              <div
                className={`flex flex-col items-center ${
                  isActive(order.estado, "entregado")
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                <FaCheckCircle size={24} />
                <span className="text-xs">Entregado</span>
              </div>
              <div
                className={`flex flex-col items-center ${
                  isActive(order.estado, "cancelado")
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                <FaTimesCircle size={24} />
                <span className="text-xs">Cancelado</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Cliente:</span>
              <span>{order.nombreCliente?.name || "No disponible"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Repartidor:</span>
              <span>{order.nombreRepartidor?.name || "No asignado"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Peso Estimado:</span>
              <span>{order.pesoEstimado} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Dirección de Recogida:</span>
              <span className="text-right">{order.direccionRecogida}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Dirección de Entrega:</span>
              <span className="text-right">{order.direccionEntrega}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Precio Total:</span>
              <span className="text-right">${order.precio}</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
              onClick={downloadPDF}
            >
              Descargar en PDF
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No se encontraron detalles para esta orden.
        </p>
      )}
    </div>
  );
};

export default DetalleMensajeria;

