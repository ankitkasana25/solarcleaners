import apiClient from './apiClient';

class BaseService {
    protected static async post(endpoint: string, data: any = {}) {
        return apiClient.post(endpoint, data);
    }

    protected static async get(endpoint: string) {
        return apiClient.get(endpoint);
    }

    protected static async put(endpoint: string, data: any = {}) {
        return apiClient.put(endpoint, data);
    }

    protected static async delete(endpoint: string) {
        return apiClient.delete(endpoint);
    }
}

export default BaseService;
