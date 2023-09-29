import api from "./api";

const authService = {
    loginConLaravel: (credenciales) => {
        return api.post("/v1/auth/login", credenciales);
    },
    getPerfil: () => {
        return api.get("/v1/auth/profile")
    },
    salir: () => {
        return api.get("/v1/auth/logout")
    }
}

export default authService;