import { makeAutoObservable } from 'mobx';

class AuthStore {
    isAuthenticated = false;
    user: any = null;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    login = async (email: string) => {
        this.isLoading = true;
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.isAuthenticated = true;
            this.user = { email, name: 'John Doe' };
        } finally {
            this.isLoading = false;
        }
    };

    signup = async (data: any) => {
        this.isLoading = true;
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.isAuthenticated = true;
            this.user = { ...data };
        } finally {
            this.isLoading = false;
        }
    };

    logout = () => {
        this.isAuthenticated = false;
        this.user = null;
    };
}

export default AuthStore;
