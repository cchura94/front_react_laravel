import TablePagination from "../../components/TablePagination";
import usuarioService from "../../services/usuarioService";
import { useEffect, useState } from "react"

const Usuario = () => {

    const [usuarios, setUsuarios] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    const columnas = [
        { key: "id", label: "ID" },
        { key: "name", label: "NOMBRE" },
        { key: "email", label: "CORREO" },
        { key: "created_at", label: "CREADO EN" }
    ]

     useEffect(() => {
        getUsuarios()
     }, [])

    const getUsuarios = async () => {
        const {data} = await usuarioService.listar();
        console.log(data)
        setUsuarios(data.data)
        setTotal(data.total)
    }

    return(<>
    <div className="bg-white p-4 rounded shadow">
        <h1>Gestión Usuarios</h1>

        <TablePagination columnas={columnas} datos={usuarios} total={total} page={page} paginate={getUsuarios}></TablePagination>

        <table className="items-center w-full bg-transparent border-collapse">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>NOMBRE</td>
                    <td>CORREO</td>
                    <td>ESTADO</td>
                    <td>Gestión</td>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((us) => (
                    <tr>
                        <td>{us.id}</td>
                        <td>{us.name}</td>
                        <td>{us.email}</td>
                        <td>{us.estado}</td>
                        <td>
                            <button>editar</button>
                            <button>eliminar</button>
                        </td>
                    </tr>
                ))
                }
            </tbody>
        </table>
        { JSON.stringify(usuarios) }

    </div>
    </>)
}

export default Usuario;