import axios from "axios";


function fetchAPI() {
    return axios.create({
        baseURL: import.meta.env.VITE_SERVER_LOCAL_BASE_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "Application/json",
            "Accept": "Application/json"
        }
    })
}

export const api = fetchAPI();