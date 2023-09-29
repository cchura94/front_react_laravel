import axios from "axios"

const url = "http://127.0.0.1:8000/api";

const api = axios.create({
    baseURL: url,
    timeout: 30000
});

// autorizacion

// capturar errores (401, 403)

const apiService = {
    get: (url, params) => api.get(url, {params}),
    post: (url, data) => api.post(url, data),
    put: (url, data) => api.put(url, data),
    delete: (url) => api.delete(url),
}

export default apiService;
