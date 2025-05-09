import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Mensajeria from '../pages/Mensajeria';
import Domicilios from '../pages/Domicilios';
import TransporteParticular from '../pages/TransporteParticular';
import TransporteSalud from '../pages/TransporteSalud';
import Diligencias from '../pages/Diligencias';
import RegistroDelivery from '../pages/RegistroDelivery';
import RegistroChofer from '../pages/RegistroChofer';
import Nosotros from '../pages/Nosotros';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import Pqrs from '../pages/Pqrs';
import HistorialMensajeria from '../pages/HistorialMensajeria';
import DetalleMensajeria from '../pages/DetalleMensajeria';
import PerfilAdministrador from '../pages/PerfilAdministrador';
import VerUsuarios from '../pages/VerUsuarios';
import VerBanners from '../pages/VerBanners';
import OrdenesDeServicio from '../pages/OrdenesDeServicio';
import OrdenesPendiente from '../pages/OrdenesPendiente';
import OrdenesEnProceso from '../pages/OrdenesEnProceso';
import OrdenesEntregadas from '../pages/OrdenesEntregadas';
import OrdenesCanceladas from '../pages/OrdenesCanceladas';
import PerfilCliente from '../pages/PerfilCliente';
import HistorialDomicilio from '../pages/HistorialDomicilio';
import DetalleDomicilio from '../pages/DetalleDomicilio';
import PerfilDomiciliario from '../pages/PerfilDomiciliario';
import ComprasIntermunicipales from '../pages/ComprasIntermunicipales';
import HistorialTransporteParticular from '../pages/HistorialTransporteParticular';
import DetalleTransporteParticular from '../pages/DetalleTransporteParticular';
import DetalleTransporteSalud from '../pages/DetalleTransporteSalud';
import HistorialTransporteSalud from '../pages/HistorialTransporteSalud';
import HistorialComprasIntermunicipales from '../pages/HistorialComprasIntermunicipales';
import DetalleComprasIntermunicipales from '../pages/DetalleComprasIntermunicipales';
import HistorialDiligencias from '../pages/HistorialDiligencias';
import DetalleDiligencias from '../pages/DetalleDiligencias';
import PerfilChofer from '../pages/PerfilChofer';
import VerBarrios from '../pages/VerBarrios';

const routes = createBrowserRouter(
    [
        {
            path: '/',
            element : <App />,
            children: [
                {
                    path: '', // Esta ruta se encargar de cargar el componente Home por defecto
                    element: <Home />
                },
                {
                    path : "/login",
                    element: <Login />
                },
                {
                    path: "sign-up",
                    element: <SignUp />
                },
                {
                    path: "forgot-password",
                    element: <ForgotPassword/>
                },
                {
                    path: "reset-password",
                    element: <ResetPassword/>
                },
                {
                    path:"/mensajeria",
                    element: <Mensajeria />
                },
                {
                    path: '/domicilios', // ruta para domicilios
                    element: <Domicilios />,
                },
                {
                    path:"/transporte-particular",
                    element: <TransporteParticular />,
                },
                {
                    path:"/transporte-salud",
                    element: <TransporteSalud />,
                },
                {
                    path:"/compras-intermunicipales",
                    element: <ComprasIntermunicipales />,
                },
                {
                    path:"/diligencias",
                    element: <Diligencias />,       
                },
                {
                    path:"/pqrs",
                    element: <Pqrs />,
                },
                {
                    path:"/unete-domiciliario",
                    element: <RegistroDelivery />
                },
                {
                    path:"/unete-transportador",
                    element: <RegistroChofer />
                },
                {
                    path:"/historial-mensajeria",
                    element: <HistorialMensajeria />
                },
                {
                    path: "/detalle-mensajeria/:orderId", // Ruta dinámica para el detalle
                    element: <DetalleMensajeria /> // El componente que se muestra cuando se accede a esta ruta
                },
                {
                    path: "historial-domicilios",
                    element: <HistorialDomicilio />
                },
                {
                    path: "/detalle-domicilio/:orderId", // Ruta dinámica para el detalle
                    element: <DetalleDomicilio /> // El componente que se muestra cuando se accede a esta ruta
                },
                {
                    path:"historial-TransporteParticular",
                    element: <HistorialTransporteParticular />
                },
                {
                    path:"/detalle-TransporteParticular/:orderId",
                    element: <DetalleTransporteParticular />
                },
                {
                    path:"historial-TransporteSalud",
                    element: <HistorialTransporteSalud />
                },
                {
                    path:"/detalle-TransporteSalud/:orderId",
                    element: <DetalleTransporteSalud />
                },
                {
                    path:"historial-ComprasIntermunicipales",
                    element: <HistorialComprasIntermunicipales />
                },
                {
                    path:"/detalle-ComprasIntermunicipales/:orderId",
                    element: <DetalleComprasIntermunicipales/>
                },
                {
                    path:"historial-diligencias",
                    element: <HistorialDiligencias />
                },
                {
                    path:"/detalle-diligencias/:orderId",
                    element: <DetalleDiligencias/>
                },
                {
                    path: "perfil-administrador",
                    element: <PerfilAdministrador />
                },
                {
                    path: "ver-usuarios",
                    element: <VerUsuarios />
                },
                {
                    path: "ver-banners",
                    element: <VerBanners />
                },
                {
                    path: "ver-barrios",
                    element: <VerBarrios />
                },
                {
                    path: "ver-ordenes",
                    element: <OrdenesDeServicio />,
                },
                {
                    path: "ver-ordenes/pendiente",
                    element: <OrdenesPendiente />
                },
                {
                    path: "ver-ordenes/en-proceso",
                    element: <OrdenesEnProceso />
                },
                {
                    path: "ver-ordenes/entregado",
                    element: <OrdenesEntregadas />
                },
                {
                    path: "ver-ordenes/cancelado",
                    element: <OrdenesCanceladas />
                },
                {
                    path: "nosotros",  // Ruta para la página de Nosotros
                    element: <Nosotros />, // Componente que se muestra cuando se accede a esta ruta
                },
                {
                    path: "perfilCliente",
                    element: <PerfilCliente />
                },
                {
                    path:"perfil-chofer",
                    element : <PerfilChofer />
                },
                {
                    path: "perfil-domiciliario",
                    element: <PerfilDomiciliario />
                }
            ]
                
        }
    ]
);

export default routes;