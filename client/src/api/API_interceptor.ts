import { api } from "./fetchAPI";

api.interceptors.response.use(
    (response) => {
        console.log(response)
        return response
    },
    (error) => {
        if (error.response) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        console.error("Bad request");
                        break;

                    case 401:
                        console.error("Unauthorized");
                        break;

                    case 403:
                        console.error("Forbidden");
                        break;

                    case 404:
                        console.error("Resource not found");
                        break;

                    case 500:
                        console.error("Internal server error");
                        break;

                    default:
                        console.error("Request failed:", error.response.status);
                }
            } else if (error.request) {
                console.error("Server did not respond");
            } else {
                console.error("Request configuration error:", error.message);
            }

            return Promise.reject(error);
        }
    }
)