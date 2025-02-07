import React from 'react';
import BannerProduct from '../components/BannerProduct'; // Importamos el componente BannerProduct

const Nosotros = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
            {/* Banner */}
            <BannerProduct />

            {/* Encabezado Principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center my-6 md:my-8 drop-shadow-lg tracking-wide bg-gradient-to-r from-red-600 via-red-500 to-green-400 text-transparent bg-clip-text leading-tight">
                ¿Quiénes Somos?
            </h1>

            {/* Contenido principal */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12 space-y-10 sm:space-y-16">
                {/* Misión */}
                <section className="text-center bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-red-600">
                        Nuestra Misión
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                        Satisfacer las necesidades de toda la comunidad, brindando un servicio eficiente y responsable,
                        que nos permita convertirnos en la mejor opción en cada uno de nuestros servicios. Sabemos que el tiempo
                        de cada uno de nuestros habitantes es nuestro más fuerte compromiso, y estamos aquí para resolverlo.
                    </p>
                </section>

                {/* Visión */}
                <section className="text-center bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-600">
                        Nuestra Visión
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                        Convertirnos en una empresa que haga un aporte social y económico a nuestro municipio. Ser líderes
                        en el mercado de mensajería, estableciendo estándares de excelencia en servicios, velocidad y seguridad,
                        para construir relaciones duraderas con nuestros clientes.
                    </p>
                </section>
            </main>

            {/* Footer */}
            <footer className="text-center py-6 bg-gray-200 mt-8 text-gray-700 text-sm">
                © {new Date().getFullYear()} Nuestra Empresa. Todos los derechos reservados.
            </footer>
        </div>
    );
};

export default Nosotros;
