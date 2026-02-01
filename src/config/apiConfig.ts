import { API_URL, ENV, APP_KEY, ENV_TYPE } from '@env';

export const Config = {
    API_URL: API_URL || 'http://localhost:5763',
    ENV: ENV || 'development',
    APP_KEY: APP_KEY || 'Prod',
    ENV_TYPE: ENV_TYPE || '1',
    TIMEOUT: 10000,
};

export const API_ENDPOINTS = {
    LOGIN: '/api-user-login',
    REGISTER: '/api-user-registration',
    PUBLIC_SERVICES: '/admin/services/public',
    CREATE_ORDER: '/admin/orders/create',
};
