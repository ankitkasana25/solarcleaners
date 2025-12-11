import { makeAutoObservable } from 'mobx';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    basePrice: number; // Added
    systemSize: string; // Added
    image?: any;
    quantity: number;
    details?: string;
}

export class CartStore {
    items: CartItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addToCart(item: Omit<CartItem, 'quantity'>) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            // If already exists, we could update it, or just increment quantity.
            // Since we use custom sizes, maybe overwrite with new selection? 
            // For now, let's just update the existing one with new DETAILS if they match ID
            existingItem.quantity += 1;
            // Optionally update the size/price to the new one?
            // existingItem.price = item.price;
            // existingItem.basePrice = item.basePrice;
            // existingItem.systemSize = item.systemSize;
            // existingItem.details = item.details;
        } else {
            this.items.push({ ...item, quantity: 1 });
        }
    }

    updateItemSize(id: string, newSize: string) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            const size = parseFloat(newSize) || 0;
            const base = item.basePrice || 500; // Fallback for legacy items
            item.systemSize = newSize;
            item.price = size * base;
            item.details = `${newSize} kW System`;
        }
    }

    removeFromCart(id: string) {
        this.items = this.items.filter(i => i.id !== id);
    }

    get totalCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get totalPrice() {
        // Price is already total per item instance (size * base), multiplied by quantity
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}
