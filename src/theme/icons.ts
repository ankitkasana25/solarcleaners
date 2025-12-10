export const iconAssets = {
    menu: require('../assets/icons/menu.png'),
    search: require('../assets/icons/search.png'),
    bell: require('../assets/icons/bell.png'),
    profile: require('../assets/icons/profile.png'),
    mic: require('../assets/icons/mic.png'),
    // Tab icons
    home: require('../assets/icons/Home.png'),
    services: require('../assets/icons/cleaningService.png'),
    bookings: require('../assets/icons/booking.png'),
    cart: require('../assets/icons/cart.png'),
    // Fallbacks
    location: require('../assets/icons/menu.png'), // Fallback
    dropdown: require('../assets/icons/menu.png'), // Fallback
    'arrow-left': require('../assets/icons/menu.png'), // Placeholder
    share: require('../assets/icons/menu.png'), // Placeholder
};

export type IconName = keyof typeof iconAssets;
