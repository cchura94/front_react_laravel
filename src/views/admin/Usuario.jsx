import usuarioService from "../../services/usuarioService";
import { useEffect, useState } from "react"

const Usuario = () => {

    const [usuarios, setUsuarios] = useState([])

     useEffect(() => {
        getUsuarios()
     }, [])

    const getUsuarios = async () => {
        const {data} = await usuarioService.listar();
        setUsuarios(data)
    }

    return(<>
        <h1>Gestión Usuarios</h1>
        <table border={1}>
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
    </>)
}

export default Usuario;