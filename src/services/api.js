import axios from "axios"

const url = "http://127.0.0.1:8000/api";

const api = axios.create({
    baseURL: url,
    timeout: 30000,
    /*
    headers: {
        Authorization: 'Bearer 11|BbiIf65oomkcioDdVPk2I8DsjeEZ6c4vm2M4bgbU11c3f564'
    }
    */
});

// autorizacion
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token")
        if(token) {
            config.headers["Authorization"] = "Bearer "+ token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// capturar errores (401, 403)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response.status === 401){
            localStorage.removeItem("access_token");
            window.location.href = "/login"
        }
    }
)

const apiService = {
    get: (url, params) => api.get(url, {params}),
    post: (url, data) => api.post(url, data),
    put: (url, data) => api.put(url, data),
    delete: (url) => api.delete(url),
}

export default apiService;
