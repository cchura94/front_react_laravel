import Usuario from "../views/admin/Usuario";
import AdminLayout from "../layouts/AdminLayout";
import Categoria from "../views/admin/Categoria";

const AdminRoutes = {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        {
            path: 'usuario',
            element: <Usuario />
        },
        {
            path: 'categoria',
            element: <Categoria></Categoria>
        }
    ]
}

export default AdminRoutes;