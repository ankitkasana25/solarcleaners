import AuthStore from './AuthStore';
import { CartStore } from './CartStore';

export class RootStore {
    authStore: AuthStore;
    cartStore: CartStore;

    constructor() {
        this.authStore = new AuthStore();
        this.cartStore = new CartStore();
    }
}

const rootStore = new RootStore();
export const useRootStore = () => rootStore;
