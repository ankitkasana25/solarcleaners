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
        fontSize: 20,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
        letterSpacing: 0.5,
    },
    seeAll: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primaryBlue,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 16,
        paddingBottom: 10, // For shadow visibility
    },
    card: {
        width: 110,
        height: 120,
        borderRadius: 24,
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    activeCard: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        transform: [{ scale: 1.05 }],
        shadowOpacity: 0.25,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    icon: {
        fontSize: 28,
    },
    label: {
        fontSize: 13,
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});
