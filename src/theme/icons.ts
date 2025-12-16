export const iconAssets = {
    menu: require('../assets/icons/menu.png'),
    search: require('../assets/icons/search.png'),
    bell: require('../assets/icons/bell.png'),
    profile: require('../assets/icons/profile.png'),
    mic: require('../assets/icons/mic.png'),
    // Tab icons
    // Tab icons
    home: require('../assets/icons/home (2).png'),
    services: require('../assets/icons/cleaning_services.png'),
    bookings: require('../assets/icons/edit_calendar.png'),
    cart: require('../assets/icons/shopping_cart.png'),
    // Drawer specific
    support: require('../assets/icons/support_agent.png'),
    logout: require('../assets/icons/logout.png'),
    delete: require('../assets/icons/delete_outline.png'),
    history: require('../assets/icons/history.png'),
    myPlans: require('../assets/icons/myPlans.png'),
    subscriptions: require('../assets/icons/subscriptions.png'),
    // Fallbacks
    location: require('../assets/icons/menu.png'), // Fallback
    dropdown: require('../assets/icons/menu.png'), // Fallback
    'arrow-left': require('../assets/icons/arrow_back.png'),
    share: require('../assets/icons/menu.png'), // Placeholder
};

export type IconName = keyof typeof iconAssets;
