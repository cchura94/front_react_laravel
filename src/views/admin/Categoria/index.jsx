import { useState, useEffect } from "react";
import categoriaService from "../../../services/categoriaService";
import Modal from "../../../components/Modal";

const Categoria = () => {

    const [categorias, setCategorias] = useState([])
    const [nombre, setNombre] = useState("");
    const [detalle, setDetalle] = useState("");
    const [idseleccion, setIdSeleccion] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)


    useEffect(() => {
        listarCategorias()
    }, [])

    async function listarCategorias() {
        const { data } = await categoriaService.listar();
        setCategorias(data)
    }

    async function guardarCategoria(e) {
        e.preventDefault();

        if (idseleccion) {
            await categoriaService.modificar(idseleccion, { nombre, detalle })
        } else {
            await categoriaService.guardar({ nombre, detalle })
        }

        listarCategorias();

        setNombre("")
        setDetalle("")
        setIdSeleccion(null)

        setModalOpen(false)
    }

    async function editarCategoria(cat) {
        setModalOpen(true)
        setNombre(cat.nombre);
        setDetalle(cat.detalle);
        setIdSeleccion(cat.id);

    }
    async function eliminarCategoria(cat) {
        if (confirm("¿Elininar Categoria?")) {
            await categoriaService.eliminar(cat.id)
            listarCategorias();
        }

    }

    function cerrarModal(){
        setNombre("")
        setDetalle("")
        setIdSeleccion(null)

        setModalOpen(false)
    }


    return (
        <>
<button type="button" className="py-3 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => setModalOpen(!modalOpen)}>NUEVO</button>
             
            <table className="table-auto w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NOMBRE</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DETALLE</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GESTION</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {categorias.map(cat => (
                        <tr key={cat.id}>
                            <td className="px-6 py-3 whitespace-nowrap">{cat.id}</td>
                            <td className="px-6 py-3 whitespace-nowrap">{cat.nombre}</td>
                            <td className="px-6 py-3 whitespace-nowrap">{cat.detalle}</td>
                            <td>
                                <button onClick={() => editarCategoria(cat)} className="py-1 px-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>

                                </button>
                                <button onClick={() => eliminarCategoria(cat)} className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>

                                </button>

                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>

            <Modal modalOpen={modalOpen} setModalOpen={cerrarModal} titulo="Guardar Categoria">
                <form onSubmit={(e) => guardarCategoria(e)}>
                    <label htmlFor="">Ingrese Nombre</label>
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full" />
                    <br />
                    <label htmlFor="">Ingrese Detalle</label>
                    <textarea value={detalle} id="" cols="30" rows="5" onChange={e => setDetalle(e.target.value)} className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"></textarea>
                    <br />
                    <input type="submit" className="py-3 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" value="Guardar Categoria" />
                </form>
            </Modal>
        </>
    )
}

export default Categoria;