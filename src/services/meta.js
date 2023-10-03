import axios from "axios"

const url = "https://graph.facebook.com/v17.0/106430075725576";

const api = axios.create({
    baseURL: url,
    timeout: 30000,
    headers: {
        Authorization: 'Bearer EAAP15Boh9isBOxR1Ls1NMc1SyRZBoruh4F8fTV3HHC0IRha4lVHksFtlLfCPgBP3v4BqOZAuGL8fbiRASIgwKZC845KAvZCeo3dqPlReqSEw1fe10mZBLLVVURMYCVZC89qdjnK5uhrdFqQg9CMn3gZCljl3w416RZCMX2UDGtiOwZAJMB3LuKZB6skK2wZCEmYKpeq7pldOZAbgCBgFKZCAVq04ZD',
        'Content-Type': 'application/json'
    }
});

const apiServiceMeta = {
    get: (url, params) => api.get(url, {params}),
    post: (url, data) => api.post(url, data),
    put: (url, data) => api.put(url, data),
    delete: (url) => api.delete(url),
}

export default apiServiceMeta;