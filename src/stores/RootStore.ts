import AuthStore from './AuthStore';
import { createContext, useContext } from 'react';

export class RootStore {
    authStore: AuthStore;

    constructor() {
        this.authStore = new AuthStore();
    }
}

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const useRootStore = () => {
    const context = useContext(RootStoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within a RootStoreProvider');
    }
    return context;
};

export default rootStore;
