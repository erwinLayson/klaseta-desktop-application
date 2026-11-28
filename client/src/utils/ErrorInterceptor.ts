import {api} from "../api/fetchData";

api.interceptors.response.use(
    (response) => {
        console.log("Response:", response.data);
        return response;
    },
    (error) => {
        console.log("Error:", error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized
            console.error("Unauthorized access", error.response.data);
        }
        return Promise.reject(error);
    }
);
