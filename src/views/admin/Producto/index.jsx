import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import Modal from "../../../components/Modal";
import productoService from "../../../services/productoService";
import categoriaService from "../../../services/categoriaService";

const Producto = () => {

    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)
    const [producto, setProducto] = useState({ nombre: "", precio: 0, stock: 0, descripcion: "", categoria_id: "" })
    const [idseleccion, setIdSeleccion] = useState(null)
    // const [buscar, setBuscar] = useState('')
    const [modalOpenImage, setModalOpenImage] = useState(false)
    const [imagen, setImagen] = useState(null)

    useEffect(() => {
        listarProducto()
        listarCategorias()
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
    const listarCategorias = async () => {
        try {
            const { data } = await categoriaService.listar();
            setCategorias(data)

        } catch (error) {

        }

    }
    function cerrarModal() {
        setModalOpen(false)
    }
    function cerrarModalImage(){
        setModalOpenImage(false)
    }

    const handleChage = (e) => {
        const { name, value } = e.target;

        setProducto((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }

    const guardarProducto = async (e) => {
        e.preventDefault();

        if (idseleccion) {
            await productoService.modificar(idseleccion, producto)
        } else {
            await productoService.guardar(producto)
        }

        listarProducto();

        setModalOpen(false)
    }

    const buscador = async (e) => {
        try {
            // setPage(nroPage)
            if (e.key === 'Enter') {
                let buscar = e.target.value
                console.log(buscar)
                const { data } = await productoService.listar(1, buscar);
                console.log(data)
                setProductos(data.data)
                setTotal(data.total)

            }


        } catch (error) {

        }

    }

    const handleUploadImage = (data) => {
        console.log(data)
        setProducto(data)
        setIdSeleccion(data.id)
        setModalOpenImage(true)
    }

    const actualizarImagen = async () => {
        console.log(imagen)
        if(idseleccion){
            let formData = new FormData();
            formData.append("imagen", imagen);
            const {data} = await productoService.enviarImagen(idseleccion, formData)
            console.log(data)

            setModalOpenImage(false)
            setProducto({ nombre: "", precio: 0, stock: 0, descripcion: "", categoria_id: "" })
            listarProducto()
        }
    }

    const handleShowProducto = (data) => {
        console.log(data)
        setIdSeleccion(data.id)
        setProducto(data)
        setModalOpen(true)
    }

    return (
        <>
        <div className="bg-white p-4 rounded shadow">

            <button type="button" className="py-3 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => setModalOpen(!modalOpen)}>NUEVO</button>

            <input type="search" onKeyDown={(e) => buscador(e)} />


            <TablePagination columnas={columnas} datos={productos} total={total} page={page} paginate={listarProducto} handleUploadImage={handleUploadImage} handleShow={handleShowProducto}></TablePagination>
        </div>

            <Modal modalOpen={modalOpen} setModalOpen={cerrarModal} titulo="Guardar Producto">
                { /* <pre>{JSON.stringify(producto)}</pre> */ }
                <div style={{textAlign: "center"}}>
                    <img src={'http://localhost:8000/'+producto.imagen} alt="" width="200px" />
                </div>
                <form onSubmit={(e) => guardarProducto(e)}>
                    <label htmlFor="">Ingrese Nombre</label>
                    <input type="text" name="nombre" value={producto.nombre} onChange={handleChage}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full" />
                    <br />

                    <label htmlFor="">Ingrese Precio</label>
                    <input type="number" step="0.01" name="precio" value={producto.precio} onChange={handleChage}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full" />
                    <br />

                    <label htmlFor="">Ingrese Stock</label>
                    <input type="number" name="stock" value={producto.stock} onChange={handleChage}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full" />
                    <br />

                    <label htmlFor="">Ingrese Categoria</label>
                    <select name="categoria_id" onChange={handleChage} required>
                        <option value="-1">Seleccione una Categoria</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id} >{cat.nombre}</option>
                        ))
                        }

                    </select>
                    <br />

                    <label htmlFor="">Ingrese Descripcion</label>
                    <textarea value={producto.descripcion} name="descripcion" id="" cols="30" rows="5" onChange={handleChage} className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"></textarea>
                    <br />
                    <input type="submit" className="py-3 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" value="Guardar Producto" />
                </form>
            </Modal>

            <Modal modalOpen={modalOpenImage} setModalOpen={cerrarModalImage} titulo="Subida de Imagen">
            <div style={{textAlign: "center"}}>
                    <img src={'http://localhost:8000/'+producto.imagen} alt="" width="200px" />
                </div>
                    <label htmlFor="">Seleccione sun Imagen</label>
                    <input type="file" onChange={(e) => setImagen(e.target.files[0])}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full" />
                    <br />

                    <button type="button" onClick={() => actualizarImagen()}>Actualizar Imagen</button>
            </Modal>
        </>
    )
}

export default Producto;