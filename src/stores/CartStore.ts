import { makeAutoObservable } from 'mobx';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image?: any;
    quantity: number;
}

export class CartStore {
    items: CartItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addToCart(item: Omit<CartItem, 'quantity'>) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...item, quantity: 1 });
        }
    }

    removeFromCart(id: string) {
        this.items = this.items.filter(i => i.id !== id);
    }

    get totalCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get totalPrice() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}
