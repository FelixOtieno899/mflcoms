import axios from "axios";
import { getItem } from "../../utility/localStorageControl";

const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT;

const authHeader = () => ({
    Authorization: `Bearer ${getItem("access_token")}`,
});

const client = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        Authorization: `Bearer ${getItem("access_token")}`,
        "Content-Type": "application/json",
    },
});

class DataService {
    static get(path = "", params = {}) {
        return client.get(path, { params }); 
    }

    static post(path = "", data = {}, optionalHeader = {}) {
        // Check if data includes a file before setting the Content-Type header
        const isMultipart = Object.values(data).some(
            (value) => value instanceof File,
        );

        // Conditional setting of headers
        const headers = {
            ...authHeader(),
            ...optionalHeader,
        };

        if (isMultipart) {
            headers["Content-Type"] = "multipart/form-data";
        }

        return client({
            method: "POST",
            url: path,
            data,
            headers,
        });
    }

    static patch(path = "", data = {}) {
        return client({
            method: "PATCH",
            url: path,
            data: JSON.stringify(data),
            headers: { ...authHeader() },
        });
    }

    static delete(path = "", data = {}) {
        return client({
            method: "DELETE",
            url: path,
            data: JSON.stringify(data),
            headers: { ...authHeader() },
        });
    }

    static put(path = "", data = {}) {
        const isMultipart = Object.values(data).some(
            (value) => value instanceof File,
        );

        const headers = {
            ...authHeader(),
        };

        if (isMultipart) {
            headers["Content-Type"] = "multipart/form-data";
        }

        return client({
            method: "PUT",
            url: path,
            data: isMultipart ? data : JSON.stringify(data),
            headers,
        });
    }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
    // do something before executing the request
    // For example tag along the bearer access token to request header or set a cookie
    const requestConfig = config;
    const { headers } = config;
    requestConfig.headers = {
        ...headers,
        Authorization: `Bearer ${getItem("access_token")}`,
    };

    return requestConfig;
});

client.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            if (response.status === 500) {
                // Handle 500 error globally if needed
                console.error("Server error:", response);
            }
            // Reject the error to allow the catch block in the original method to handle it
            return Promise.reject(error);
        }
        // If there's no response (network error, etc.), also reject the error
        return Promise.reject(error);
    },
);

export { DataService };
