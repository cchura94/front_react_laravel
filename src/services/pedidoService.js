import api from "./api";

const pedidoService = {
    listar: (page=1, q='') => {
        return api.get(`/pedido?page=${page}&q=${q}`);
    },
    guardar: (datos) => {
        return api.post("/pedido", datos);
    },
    mostrar: (id) => {
        return api.get(`/pedido/${id}`);
    },

    buscarCliente: (q='') => {
        return api.get(`/pedido/buscar-cliente?q=${q}`);
    },
}

export default pedidoService;