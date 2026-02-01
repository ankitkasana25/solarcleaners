import axios from 'axios';
import { Config } from '../config/apiConfig';

const apiClient = axios.create({
    baseURL: Config.API_URL,
    timeout: Config.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding tokens
apiClient.interceptors.request.use(
    (config) => {
        // You can get token from a storage or store here
        // const token = authStore.token;
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific status codes
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
