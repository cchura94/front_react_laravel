import Usuario from "../views/admin/Usuario";
import AdminLayout from "../layouts/AdminLayout";

const AdminRoutes = {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        {
            path: 'usuario',
            element: <Usuario />
        }
    ]
}

export default AdminRoutes;