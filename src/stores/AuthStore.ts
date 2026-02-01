import { makeAutoObservable, runInAction } from 'mobx';
import apiClient from '../services/apiClient';
import { API_ENDPOINTS, Config } from '../config/apiConfig';

class AuthStore {
    isAuthenticated = false;
    user: any = null;
    token: string | null = null;
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    login = async (credentials: { email: string; mobile: string; password: string }) => {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
            const { success, token, user, message } = response.data;

            if (success) {
                runInAction(() => {
                    this.isAuthenticated = true;
                    this.user = user;
                    this.token = token;
                });
                return { success: true };
            } else {
                this.error = message || 'Login failed';
                return { success: false, message: this.error };
            }
        } catch (error: any) {
            this.error = error.response?.data?.message || 'Network error';
            return { success: false, message: this.error };
        } finally {
            this.isLoading = false;
        }
    };

    signup = async (userData: any) => {
        this.isLoading = true;
        this.error = null;
        try {
            const payload = {
                ...userData,
                app_key: Config.APP_KEY,
                env_type: Config.ENV_TYPE,
            };
            const response = await apiClient.post(API_ENDPOINTS.REGISTER, payload);
            const { success, token, user, message } = response.data;

            if (success) {
                runInAction(() => {
                    this.isAuthenticated = true;
                    this.user = user;
                    this.token = token;
                });
                return { success: true };
            } else {
                this.error = message || 'Registration failed';
                return { success: false, message: this.error };
            }
        } catch (error: any) {
            this.error = error.response?.data?.message || 'Network error';
            return { success: false, message: this.error };
        } finally {
            this.isLoading = false;
        }
    };

    logout = () => {
        this.isAuthenticated = false;
        this.user = null;
    };

    updateProfile = (data: any) => {
        this.user = { ...this.user, ...data };
    };
}

export default AuthStore;
