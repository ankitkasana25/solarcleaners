import { lightTheme } from './theme';

export const colors = {
    ...lightTheme.colors,
    // Backwards compatibility layer
    text: lightTheme.colors.gray1,
    textSecondary: lightTheme.colors.gray3,
    error: lightTheme.colors.redOrange,
    success: lightTheme.colors.secondaryGreen,
    white: '#FFFFFF',
    black: '#000000',
    border: lightTheme.colors.gray4,
    google: '#DB4437',
    apple: '#000000',
    gold: lightTheme.colors.subscribeGold,
};
