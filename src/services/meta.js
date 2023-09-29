import axios from "axios"

const url = "https://graph.facebook.com/v17.0/106430075725576";

const api = axios.create({
    baseURL: url,
    timeout: 30000,
    headers: {
        Authorization: 'Bearer EAAP15Boh9isBO0JXXA2YuLWRDY36lPtaaZCZA7R8EQKRyYUUQ1Yk10G14uZCpWP09zB0qAxsSHoTBmXHA3vOckrahkE6QQUXyTlrsDyriZCuQC855JjuP501H1WZBiiGy3sm9vgfIZC36Srjk4GpV8rqJTB3O83OQOZAtihyQxWPYzB8wN6OUJmZCJW0NgzFycWUgyGP34imPae7KorevosZD',
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