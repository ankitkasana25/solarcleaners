import AuthStore from './AuthStore';
import { CartStore } from './CartStore';
import { BookingStore } from './BookingStore';

export class RootStore {
    authStore: AuthStore;
    cartStore: CartStore;
    bookingStore: BookingStore;

    constructor() {
        this.authStore = new AuthStore();
        this.cartStore = new CartStore();
        this.bookingStore = new BookingStore();
    }
}

const rootStore = new RootStore();
export const useRootStore = () => rootStore;
