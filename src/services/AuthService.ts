import BaseService from './BaseService';
import { API_ENDPOINTS } from '../config/apiConfig';

class AuthService extends BaseService {
    static async login(credentials: any) {
        return this.post(API_ENDPOINTS.LOGIN, credentials);
    }

    static async signup(userData: any) {
        return this.post(API_ENDPOINTS.REGISTER, userData);
    }
}

export default AuthService;
