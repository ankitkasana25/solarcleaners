export const iconAssets = {
    menu: require('../assets/icons/menu.png'),
    search: require('../assets/icons/search.png'),
    bell: require('../assets/icons/bell.png'),
    // Add placeholders or allow undefined for missing icons
    home: require('../assets/icons/menu.png'), // Fallback for now
    requests: require('../assets/icons/menu.png'), // Fallback
    profile: require('../assets/icons/menu.png'), // Fallback
    location: require('../assets/icons/menu.png'), // Fallback
    dropdown: require('../assets/icons/menu.png'), // Fallback
};

export type IconName = keyof typeof iconAssets;
