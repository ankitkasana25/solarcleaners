import { makeAutoObservable } from 'mobx';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    basePrice: number;
    systemSize: string;
    image?: any;
    quantity: number;
    details?: string;
    slotDate?: string; // e.g. "2023-10-25"
    slotTime?: string; // e.g. "10:00 AM"
}

export interface Offer {
    id: string;
    title: string;
    discount: string;
    description: string;
}

export class CartStore {
    items: CartItem[] = [];
    appliedOffers: Offer[] = [];

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

    updateItemSize(id: string, newSize: string) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            const size = parseFloat(newSize) || 0;
            const base = item.basePrice || 500;
            item.systemSize = newSize;
            item.price = size * base;
            item.details = `${newSize} kW System`;
        }
    }

    removeFromCart(id: string) {
        this.items = this.items.filter(i => i.id !== id);
    }

    applyOffer(offer: Offer) {
        // Simple logic: Prevent duplicate offers
        if (!this.appliedOffers.find(o => o.id === offer.id)) {
            this.appliedOffers.push(offer);
        }
    }

    removeOffer(id: string) {
        this.appliedOffers = this.appliedOffers.filter(o => o.id !== id);
    }

    get totalCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get cartSubTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    get discountAmount() {
        let totalDiscount = 0;
        const subTotal = this.cartSubTotal;

        this.appliedOffers.forEach(offer => {
            if (offer.discount.includes('%')) {
                const percentage = parseFloat(offer.discount);
                if (!isNaN(percentage)) {
                    totalDiscount += (subTotal * percentage) / 100;
                }
            } else if (offer.discount.toLowerCase().includes('flat') || offer.discount.includes('₹')) {
                const amount = parseFloat(offer.discount.replace(/[^0-9.]/g, ''));
                if (!isNaN(amount)) {
                    totalDiscount += amount;
                }
            } else if (offer.discount.toLowerCase().includes('free checkup')) {
                // For now, let's treat free checkup as 0 monetary discount or fixed value?
                // Let's assume ₹500 value for free checkup if relevant item exists?
                // Keeping it simple for now, maybe 0 for non-monetary?
                // Or add a flat 'value' property to promotions later.
            }
        });
        return totalDiscount;
    }

    get totalPrice() {
        const total = this.cartSubTotal - this.discountAmount;
        return total > 0 ? total : 0;
    }
}
