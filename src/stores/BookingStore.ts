import { makeAutoObservable } from 'mobx';

export interface BookingItem {
    id: string;
    items: any[]; // Or specific CartItem[] type if shared
    totalPrice: number;
    date: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    paymentMethod: 'Pay on Visit' | 'UPI';
    scheduledDate?: Date;
    scheduledTime?: string;
}

export class BookingStore {
    bookings: BookingItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addBooking(booking: Omit<BookingItem, 'id' | 'date' | 'status'>) {
        const newBooking: BookingItem = {
            ...booking,
            id: `ORD-${Date.now()}`,
            date: new Date().toDateString(),
            status: 'Confirmed',
        };
        this.bookings.unshift(newBooking); // Add to top
    }
}
