import Inicio from "../views/Inicio";
import Login from "../views/Login";
import SitioLayout from "../layouts/SitioLayout";

const SitioRoutes = {
    path: '/',
    element: <SitioLayout />,
    children: [
        {
            path: '',
            element: <Inicio />
        },
        {
            path: 'login',
            element: <Login />
        }
    ]
}

export default SitioRoutes;