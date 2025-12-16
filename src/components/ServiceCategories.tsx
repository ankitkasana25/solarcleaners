import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');
// Calculate width for 3.5 items visible or similar
const ITEM_WIDTH = (width - 48) / 3.5;

export interface Category {
    id: string;
    label: string;
    icon: string; // Emoji for now
    color: string;
}

interface ServiceCategoriesProps {
    categories: Category[];
    activeCategory: string;
    onCategoryPress: (id: string) => void;
}

export const ServiceCategories = ({ categories, activeCategory, onCategoryPress }: ServiceCategoriesProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Categories</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {categories.map((cat) => {
                    const isActive = cat.id === activeCategory;
                    return (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.card,
                                { backgroundColor: cat.color },
                                isActive && styles.activeCard
                            ]}
                            onPress={() => onCategoryPress(cat.id)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.iconContainer}>
                                <Text style={styles.icon}>{cat.icon}</Text>
                            </View>
                            <Text style={styles.label}>{cat.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
    },
    seeAll: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.primaryBlue,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    card: {
        width: 100,
        height: 110,
        borderRadius: 20,
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    activeCard: {
        borderWidth: 2,
        borderColor: '#00000020',
        transform: [{ scale: 1.02 }],
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)', // Glassy fit
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    icon: {
        fontSize: 24,
    },
    label: {
        fontSize: 12,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 4,
    },
});
