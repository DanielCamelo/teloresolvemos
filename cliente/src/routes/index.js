import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Mensajeria from '../pages/Mensajeria';
import Domicilios from '../pages/Domicilios';
import TransporteParticular from '../pages/TransporteParticular';
import TransporteSalud from '../pages/TransporteSalud';
import TrasladoAeropuertos from '../pages/TrasladoAeropuertos';
import Diligencias from '../pages/Diligencias';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import Pqrs from '../pages/Pqrs';

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
                    path:"/traslado-aeropuertos",
                    element: <TrasladoAeropuertos />,
                },
                {
                    path:"/diligencias",
                    element: <Diligencias />,       
                },
                {
                    path:"/pqrs",
                    element: <Pqrs />,
                }
            ]
                
        }
    ]
);

export default routes;