import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import productoService from "../../../services/productoService";

const Producto = () => {

    const [productos, setProductos] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        listarProducto()
    }, [])

    const columnas = [
        {key: "id", label: "ID"},
        {key: "nombre", label: "NOMBRE"},
        {key: "precio", label: "PRECIO"},
        {key: "stock", label: "CANTIDAD"},
        {key: "categoria.nombre", label: "CATEGORIA"}
    ]

    const listarProducto = async (nroPage) => {
        try {
            setPage(nroPage)
            console.log(nroPage)

            const {data} = await productoService.listar(nroPage);
            setProductos(data.data)
            setTotal(data.total)

            
        } catch (error) {
            
        }

    }
    
    return (
        <>
        <TablePagination columnas={columnas} datos={productos} total={total} page={page} paginate={listarProducto}></TablePagination>
        </>
    )
}

export default Producto;