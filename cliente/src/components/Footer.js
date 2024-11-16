import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      {/* Ajusta el margen interno con px para pantallas grandes */}
      <div className="container mx-auto px-4 lg:px-20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Información de contacto */}
        <div className="text-left">
          <h3 className="font-bold text-lg mb-4 text-center md:text-left bg-secondary text-white py-2 px-4 rounded">Información de contacto</h3>
          <p>Email: 
            <a href="mailto:contacto@teloresolvemos.com" className="text-blue-400 hover:underline" aria-label="Enviar correo electrónico">contacto@teloresolvemos.com</a>
          </p>
          <p>Teléfono: 
            <a href="tel:+1234567890" className="text-blue-400 hover:underline" aria-label="Llamar a +1 234 567 890">+1 234 567 890</a>
          </p>
        </div>

        {/* Links de interés */}
        <div className="text-center">
          <h3 className="font-bold text-lg mb-4 text-center md:text-left bg-secondary text-white py-2 px-4 rounded">Links de interés</h3>
          <ul className="space-y-1">
            <li>
              <a href="/about" className="text-blue-400 hover:underline" aria-label="Página de Nosotros">Nosotros</a>
            </li>
            <li>
              <a href="/join" className="text-blue-400 hover:underline" aria-label="Únete a nuestro equipo">Únete</a>
            </li>
            <li>
              <a href="/services" className="text-blue-400 hover:underline" aria-label="Ver nuestros Servicios">Servicios</a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="text-right">
          <h3 className="font-bold text-lg mb-4 text-center md:text-left bg-secondary text-white py-2 px-4 rounded">Síguenos</h3>
          <div className="flex justify-end space-x-6">
            <a href="https://www.facebook.com/teloresolvemosfacil?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500" aria-label="Ir a Facebook">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="https://wa.me/3025887156" target="_blank" rel="noopener noreferrer" className="hover:text-green-500" aria-label="Ir a WhatsApp">
              <i className="fab fa-whatsapp text-xl"></i>
            </a>
            <a href="https://www.instagram.com/te_lo_resolvemos/profilecard/?igsh=MTV1OW9uc3AwZGZ3eg==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500" aria-label="Ir a Instagram">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://vm.tiktok.com/ZMhXXJpq6/" target="_blank" rel="noopener noreferrer" className="hover:text-black" aria-label="Ir a TikTok">
              <i className="fab fa-tiktok text-xl"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Aliados y copyright */}
      <div className="container mx-auto mt-6 text-center">
        <p className="text-sm text-gray-400">
          &copy; 2024 Te lo resolvemos · Todos los Derechos Reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
