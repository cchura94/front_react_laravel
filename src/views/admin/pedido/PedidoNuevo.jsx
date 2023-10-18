import { useEffect, useState } from "react";
import TablePagination from "./../../../components/TablePagination";
import productoService from "../../../services/productoService";
import pedidoService from "../../../services/pedidoService";
import Modal from "../../../components/Modal";
import clienteService from "../../../services/clienteService";


const PedidoNuevo = () => {

    const [productos, setProductos] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [idseleccion, setIdSeleccion] = useState(null)
    const [carrito, setCarrito] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [cliente, setCliente] = useState({ nombre_completo: '', ci_nit: '', telefono: '' })

    useEffect(() => {
        listarProducto()

    }, [])

    const columnas = [
        { key: "id", label: "ID" },
        { key: "nombre", label: "NOMBRE" },
        { key: "precio", label: "PRECIO" },
        { key: "stock", label: "CANTIDAD" },
        { key: "categoria.nombre", label: "CATEGORIA" }
    ]
    const listarProducto = async (nroPage) => {
        try {
            setPage(nroPage)
            console.log(nroPage)

            const { data } = await productoService.listar(nroPage);
            setProductos(data.data)
            setTotal(data.total)


        } catch (error) {

        }

    }

    const handleAddCarrito = (data) => {
        console.log(data)
        const { id, nombre, precio } = data
        setCarrito([...carrito, { producto_id: id, nombre: nombre, precio: precio, cantidad: 1 }]);

    }

    const buscarCliente = async (e) => {
        const { data } = await pedidoService.buscarCliente(e.target.value);
        if (data.cliente) {
            setClienteSeleccionado(data.cliente);
        } else {
            setClienteSeleccionado({})
        }
    }

    function cerrarModal() {
        setModalOpen(false)
    }

    const guardarCliente = async (e) => {
        e.preventDefault();

        const { data } = await clienteService.guardar(cliente)
        setClienteSeleccionado(data.cliente)
    }

    const handleChage = (e) => {
        const { name, value } = e.target;

        setCliente((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }

    const generarPedido = async () => {

        if (confirm("¿Esta seguro de Generar el Pedido?")) {
            const pedido = {
                cliente_id: clienteSeleccionado.id,
                productos: carrito
            }

            await pedidoService.guardar(pedido);
            setCarrito([]);
            setClienteSeleccionado({})

        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="bg-white p-4 rounded shadow">
                        <TablePagination columnas={columnas} datos={productos} total={total} page={page} paginate={listarProducto} handleAddCarrito={handleAddCarrito}></TablePagination>
                    </div>

                </div>
                <div className="md:cols-span-1 grid gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h1>Carrito</h1>
                        {/* JSON.stringify(carrito) */}

                        <table className="table-auto w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NOMBRE</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PRECIO</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CANT</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GESTION</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y">
                                {carrito.map(prod => (
                                    <tr key={prod.producto_id}>
                                        <td className="px-6 py-3 whitespace-nowrap">{prod.nombre}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">{prod.precio}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">{prod.cantidad}</td>
                                        <td>

                                            <button onClick={() => eliminarProducto(prod)} className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>

                                            </button>

                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>


                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h1>Cliente</h1>

                        <input type="text" onChange={(e) => buscarCliente(e)} />
                        <hr />
                        {clienteSeleccionado.id &&
                            <div>
                                <h2>NOMBRE COMPLETO: {clienteSeleccionado.nombre_completo} </h2>
                                <h2>CI/NIT: {clienteSeleccionado.ci_nit} </h2>
                                <h2>TELEFONO: {clienteSeleccionado.telefono} </h2>
                            </div>
                        }

                        <button type="button" className="py-3 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => setModalOpen(!modalOpen)}>NUEVO CLIENTE</button>


                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h1>Generar Pedido</h1>
                        <button type="button" className="py-3 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => generarPedido()}>GENERAR PEDIDO</button>

                    </div>



                </div>
            </div>

            <Modal modalOpen={modalOpen} setModalOpen={cerrarModal} titulo="Nuevo Cliente">

                <form onSubmit={(e) => guardarCliente(e)}>
                    <label htmlFor="">Ingrese Nombre Completo</label>
                    <input type="text" name="nombre_completo" value={cliente.nombre_completo} onChange={handleChage}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full" />
                    <br />

                    <label htmlFor="">Ingrese CI/NIT</label>
                    <input type="text" name="ci_nit" value={cliente.ci_nit} onChange={handleChage}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full" />
                    <br />

                    <label htmlFor="">TELEFONO</label>
                    <input type="number" name="telefono" value={cliente.telefono} onChange={handleChage}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full" />

                    <br />

                    <input type="submit" className="py-3 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" value="Guardar Cliente" />
                </form>
            </Modal>
        </>
    )
}

export default PedidoNuevo;