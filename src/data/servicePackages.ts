// Solar Cleaning Service Packages and Pricing
// Rate: ₹0.15 per Watt = ₹150 per kW

export interface ServicePackage {
    id: string;
    category: 'residential' | 'commercial' | 'industrial';
    systemSize: number; // in kW
    price: number; // in ₹
    popular?: boolean;
    recommended?: boolean;
}

export interface ServiceCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
    services: string[];
}

// Pricing Packages based on ₹150 per kW
export const RESIDENTIAL_PACKAGES: ServicePackage[] = [
    { id: 'res-3kw', category: 'residential', systemSize: 3, price: 450 },
    { id: 'res-5kw', category: 'residential', systemSize: 5, price: 750, popular: true },
    { id: 'res-10kw', category: 'residential', systemSize: 10, price: 1500 },
    { id: 'res-15kw', category: 'residential', systemSize: 15, price: 2250 },
];

export const COMMERCIAL_PACKAGES: ServicePackage[] = [
    { id: 'com-10kw', category: 'commercial', systemSize: 10, price: 1500 },
    { id: 'com-20kw', category: 'commercial', systemSize: 20, price: 3000, popular: true },
    { id: 'com-30kw', category: 'commercial', systemSize: 30, price: 4500 },
    { id: 'com-50kw', category: 'commercial', systemSize: 50, price: 7500 },
];

export const INDUSTRIAL_PACKAGES: ServicePackage[] = [
    { id: 'ind-50kw', category: 'industrial', systemSize: 50, price: 7500 },
    { id: 'ind-70kw', category: 'industrial', systemSize: 70, price: 10500, popular: true },
    { id: 'ind-100kw', category: 'industrial', systemSize: 100, price: 15000 },
];

// Calculate custom price (@ ₹150/kW)
export const calculatePrice = (systemSizeKW: number): number => {
    return systemSizeKW * 150;
};

// Package Includes (All Categories)
export const PACKAGE_INCLUDES = [
    'Pure / DM water cleaning (no chemicals)',
    'Soft brush & microfiber cleaning',
    'Dust, bird dropping & pollution removal',
    'Safe & damage-free process',
    'Basic performance improvement check',
];

// Service Categories
export const SERVICE_CATEGORIES: ServiceCategory[] = [
    {
        id: 'cleaning',
        name: 'Solar Panel Cleaning',
        icon: '✨',
        description: 'Professional cleaning services',
        services: [
            'Residential rooftop solar panel cleaning',
            'Commercial & industrial solar plant cleaning',
            'Robotic cleaning',
            'Manual & mechanized cleaning',
            'Monthly / Quarterly / Annual cleaning contracts',
        ],
    },
    {
        id: 'om',
        name: 'Solar O&M',
        icon: '🔧',
        description: 'Operation & Maintenance',
        services: [
            'Routine solar plant inspection',
            'Preventive & breakdown maintenance',
            'Inverter checking & fault rectification',
            'DC/AC cable inspection',
            'Junction box & MC4 connector checking',
        ],
    },
    {
        id: 'support',
        name: 'Rooftop Solar Support',
        icon: '🏠',
        description: 'Installation & Support Services',
        services: [
            'Solar panel shifting & re-alignment',
            'Structure tightening & correction',
            'Inverter replacement / upgradation',
            'Earthing & lightning arrester testing',
            'Fire & electrical safety check',
        ],
    },
    {
        id: 'equipment',
        name: 'Water & Equipment',
        icon: '💧',
        description: 'Solutions & Rentals',
        services: [
            'Cleaning equipment rental',
            'Special solar brushes & tools',
            'Anti-static / eco-friendly cleaning solutions',
        ],
    },
    {
        id: 'emergency',
        name: 'Emergency Services',
        icon: '🚨',
        description: 'On-Demand Support',
        services: [
            'Emergency breakdown support',
            'Inverter trip & fault handling',
            'Storm / dust-storm cleaning',
        ],
    },
];

// Maintenance Packages
export const MAINTENANCE_PACKAGES = [
    {
        id: 'monthly',
        name: 'Monthly Maintenance',
        description: 'Regular monthly cleaning & inspection',
        frequency: 'Monthly',
        discount: '10%',
        icon: '📅',
    },
    {
        id: 'quarterly',
        name: 'Quarterly Maintenance',
        description: 'Quarterly deep cleaning & maintenance',
        frequency: 'Quarterly',
        discount: '15%',
        icon: '📊',
        popular: true,
    },
    {
        id: 'annual',
        name: 'Annual Contract (AMC)',
        description: 'Complete annual maintenance coverage',
        frequency: 'Annual',
        discount: '25%',
        icon: '⭐',
    },
];

// App Features
export const APP_FEATURES = [
    {
        id: 'location',
        icon: '📍',
        title: 'Location-based Service',
        description: 'Find services near you',
    },
    {
        id: 'schedule',
        icon: '📅',
        title: 'Schedule Booking',
        description: 'Choose date & time',
    },
    {
        id: 'quotation',
        icon: '💰',
        title: 'Instant Quotation',
        description: 'Get price instantly',
    },
    {
        id: 'report',
        icon: '📊',
        title: 'Generation Report',
        description: 'Before/after comparison',
    },
    {
        id: 'proof',
        icon: '📸',
        title: 'Photo & Video Proof',
        description: 'Work documentation',
    },
    {
        id: 'rating',
        icon: '⭐',
        title: 'Rating & Review',
        description: 'Rate our service',
    },
    {
        id: 'support',
        icon: '📞',
        title: 'Technician Support',
        description: 'Call & WhatsApp',
    },
];
