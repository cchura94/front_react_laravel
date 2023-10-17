import Usuario from "../views/admin/Usuario";
import AdminLayout from "../layouts/AdminLayout";
import Categoria from "../views/admin/Categoria";
import Producto from "../views/admin/Producto";
import PedidoNuevo from "../views/admin/pedido/PedidoNuevo";

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
        },
        {
            path: 'producto',
            element: <Producto />
        },
        {
            path: 'pedido/nuevo',
            element: <PedidoNuevo />
        }
    ]
}

export default AdminRoutes;