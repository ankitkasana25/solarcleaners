import { makeAutoObservable, runInAction } from 'mobx';
import AuthService from '../services/AuthService';

class AuthStore {
    isAuthenticated = false;
    user: any = null;
    token: string | null = null;
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    login = async (credentials: { email?: string; mobile?: string; password: string }) => {
        this.isLoading = true;
        this.error = null;
        try {
            const result: any = await AuthService.login(credentials);

            // The API seems to use status: "1" for success or a success: true flag
            if (result.status === "1" || result.status === 1 || result.success) {
                runInAction(() => {
                    this.isAuthenticated = true;
                    this.user = result.data || result.user;
                    this.token = result.token || (result.data && result.data.token);
                });
                return { success: true };
            } else {
                this.error = result.message || 'Login failed';
                return { success: false, message: this.error };
            }
        } catch (error: any) {
            this.error = error.message || 'Network error occurred';
            return { success: false, message: this.error };
        } finally {
            this.isLoading = false;
        }
    };

    signup = async (userData: any) => {
        this.isLoading = true;
        this.error = null;
        try {
            const result: any = await AuthService.signup({
                username: userData.username,
                email: userData.email,
                mobile: userData.mobile,
                password: userData.password
            });

            if (result.status === "1" || result.status === 1 || result.success) {
                runInAction(() => {
                    this.isAuthenticated = true;
                    this.user = result.data || result.user;
                    this.token = result.token || (result.data && result.data.token);
                });
                return { success: true };
            } else {
                this.error = result.message || 'Registration failed';
                return { success: false, message: this.error };
            }
        } catch (error: any) {
            this.error = error.message || 'Network error occurred';
            return { success: false, message: this.error };
        } finally {
            this.isLoading = false;
        }
    };

    logout = () => {
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
    };

    updateProfile = (data: any) => {
        this.user = { ...this.user, ...data };
    };
}

export default AuthStore;


