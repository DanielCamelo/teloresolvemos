import React from 'react';
import BannerProduct from '../components/BannerProduct'; // Importamos el componente BannerProduct

const Nosotros = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 overflow-visible">
            {/* Banner */}
            <BannerProduct />

            {/* Encabezado Principal */}
            <h1 className="text-5xl sm:text-6xl font-extrabold text-center my-8 drop-shadow-lg tracking-wide bg-gradient-to-r from-red-600 via-red-500 to-green-400 text-transparent bg-clip-text leading-[1.2]">
            ¿Quiénes Somos?
            </h1>

            {/* Contenido principal */}
            <main className="flex-grow container mx-auto px-4 lg:px-20 py-12 space-y-16 mt-12">
                {/* Misión */}
                <section className="text-center bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-accent">
                        Nuestra Misión
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        Satisfacer las necesidades de toda la comunidad, brindando un servicio eficiente y responsable, 
                        que nos permita convertirnos en la mejor opción en cada uno de nuestros servicios. Sabemos que el tiempo 
                        de cada uno de nuestros habitantes es nuestro más fuerte compromiso, y estamos aquí para resolverlo.
                    </p>
                </section>

                {/* Visión */}
                <section className="text-center bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-primary">
                        Nuestra Visión
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        Convertirnos en una empresa que haga un aporte social y económico a nuestro municipio. Ser líderes 
                        en el mercado de mensajería, estableciendo estándares de excelencia en servicios, velocidad y seguridad, 
                        para construir relaciones duraderas con nuestros clientes.
                    </p>
                </section>
            </main>

            {/* Footer */}
            <footer>
            </footer>
        </div>
    );
};

export default Nosotros;
