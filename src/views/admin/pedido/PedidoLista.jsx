import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import pedidoService from "../../../services/pedidoService";
import Modal from "../../../components/Modal";

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

const PedidoLista = () => {
    const [pedidos, setPedidos] = useState([])
    const [total, setTotal] = useState(0)
    const [modalOpen, setModalOpen] =useState(false);
    const [pedido, setPedido] = useState({})

    const columnas= [
        {key: 'fecha', label: 'FECHA'},
        {key: 'estado', label: 'ESTADO'},
        {key: 'cliente.nombre_completo', label: 'CLIENTE'}
    ]

    useEffect(() => {
        getPedidos()
    }, [])

    const getPedidos = async (page) => {
        const {data} = await pedidoService.listar(page);
        setPedidos(data.data) 
        setTotal(data.total)

    }

    const mostrarPedido = (p) => {
        setPedido(p)
        setModalOpen(true)
    }

    const generarPDF = (p) => {
        setPedido(p)
        
        const doc = new jsPDF();
        doc.text('Recibo de Compra', 20, 15);
        // doc.setFont(12)
        doc.text(`Cliente: ${pedido.cliente.nombre_completo}`, 20, 25);
        doc.text(`CI/NIT: ${pedido.cliente.ci_nit}`, 20, 35);
        doc.text(`FECHA Pedido: ${pedido.fecha}`, 20, 45);
        


        const filas = pedido.productos.map(prod => [
            prod.nombre, prod.precio, prod.pivot.cantidad
        ])

        // Or use javascript directly:
        autoTable(doc, {
            head: [['Nombre', 'Precio', 'Cantidad']],
            body: filas,
            startY: 55 
        })



        // doc.save("pedido.pdf");
        window.open(doc.output('bloburl'), '_blank');
    }

    return(
        <>
            <h1>Lista Pedido</h1>

            <TablePagination columnas={columnas} datos={pedidos} handleShow={mostrarPedido} handlePDF={generarPDF}></TablePagination>
            <Modal titulo="Detalle de Pedido" modalOpen={modalOpen} setModalOpen={setModalOpen}>
                {pedido.id && 

                <div className="bg-white p-4 shadow-md rounded-lg mx-auto">
                    <div className="mb-4">
                        <p className="font-semibold">Fecha:</p>
                        <p>{pedido.fecha}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Cliente:</p>
                        <p>{pedido.cliente?.nombre_completo}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">CI/NIT:</p>
                        <p>{pedido.cliente?.ci_nit}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Productos:</p>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border-b">Nombre</th>
                                    <th className="border-b">Precio</th>
                                    <th className="border-b">Cant</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.productos.map((prod) => (
                                    <tr key={prod.id}>
                                        <td className="border-b">{prod.nombre}</td>
                                        <td className="border-b">{prod.precio}</td>
                                        <td className="border-b">{prod.pivot.cantidad}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        {
                        pedido.observacion && 
                        <div className="mb-4">
                            <p className="font-semibold">Observación:</p>
                            <p>{pedido.observacion}</p>
                        </div>
                        }
                    </div>
                    

                </div>

                }
            </Modal>
        </>
    )


}

export default PedidoLista;