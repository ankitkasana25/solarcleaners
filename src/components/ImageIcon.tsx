import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { iconAssets, IconName } from '../theme/icons';

interface ImageIconProps {
    name: IconName;
    size?: number;
    color?: string; // tintColor
    style?: StyleProp<ImageStyle>;
}

export const ImageIcon = ({ name, size = 24, color, style }: ImageIconProps) => {
    const source = iconAssets[name];

    if (!source) {
        console.warn(`Icon ${name} not found in iconAssets`);
        return null;
    }

    return (
        <Image
            source={source}
            style={[
                styles.icon,
                { width: size, height: size, tintColor: color },
                style
            ]}
            resizeMode="contain"
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        // Base styles if needed
    }
});
