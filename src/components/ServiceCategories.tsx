import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');
const GRID_ITEM_WIDTH = (width - 60) / 3; // 3 columns with padding/gap

export interface Category {
    id: string;
    label: string;
    icon: string;
    color: string;
}

interface ServiceCategoriesProps {
    categories: Category[];
    activeCategory: string;
    onCategoryPress: (id: string) => void;
}

export const ServiceCategories = ({ categories, activeCategory, onCategoryPress }: ServiceCategoriesProps) => {
    // Filter out 'all' and 'faq' if they don't look like main categories in the screenshot
    const displayCategories = categories.filter(c => c.id !== 'faq');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Explore all services</Text>
            </View>
            <View style={styles.gridContainer}>
                {displayCategories.map((cat) => {
                    const isActive = cat.id === activeCategory;
                    return (
                        <TouchableOpacity
                            key={cat.id}
                            style={styles.categoryItem}
                            onPress={() => onCategoryPress(cat.id)}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.iconBox,
                                isActive && styles.activeIconBox
                            ]}>
                                <Text style={styles.icon}>{cat.icon}</Text>
                            </View>
                            <Text style={[
                                styles.label,
                                isActive && styles.activeLabel
                            ]}>{cat.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'NotoSans-Bold',
        color: '#1C1C1E',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 24,
    },
    categoryItem: {
        width: GRID_ITEM_WIDTH,
        alignItems: 'center',
    },
    iconBox: {
        width: GRID_ITEM_WIDTH,
        height: GRID_ITEM_WIDTH * 0.9,
        backgroundColor: '#F7F7F7', // Light gray background like screenshot
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    activeIconBox: {
        backgroundColor: '#EBF1FF',
        borderWidth: 1,
        borderColor: lightTheme.colors.primaryBlue,
    },
    icon: {
        fontSize: 32,
    },
    label: {
        fontSize: 12,
        fontFamily: 'NotoSans-Medium',
        color: '#444',
        textAlign: 'center',
        lineHeight: 16,
    },
    activeLabel: {
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primaryBlue,
    },
});
