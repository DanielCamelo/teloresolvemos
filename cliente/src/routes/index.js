import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Mensajeria from '../pages/Mensajeria';
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
                    path: '',
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
                    path:"/pqrs",
                    element: <Pqrs />,
                }
            ]
                
        }
    ]
);

export default routes;