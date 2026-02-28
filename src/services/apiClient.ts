import axios from 'axios';
import { Config } from '../config/apiConfig';

const apiClient = axios.create({
    baseURL: Config.API_URL,
    timeout: Config.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor for adding tokens and common fields
apiClient.interceptors.request.use(
    (config) => {
        // Automatically add app_key and env_type to POST/PUT requests if they are missing
        if (config.method === 'post' || config.method === 'put') {
            if (config.data) {
                config.data = {
                    app_key: Config.APP_KEY,
                    env_type: Config.ENV_TYPE,
                    ...config.data,
                };
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling results
apiClient.interceptors.response.use(
    (response) => {
        // Return only the data payload
        return response.data;
    },
    (error) => {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            errorMessage = error.response.data?.message || `Server Error: ${error.response.status}`;
            console.error('API Error Response:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            errorMessage = 'No response from server. Please check your internet connection.';
            console.error('API No Response:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
            console.error('API Request Error:', error.message);
        }

        return Promise.reject(new Error(errorMessage));
    }
);

export default apiClient;

