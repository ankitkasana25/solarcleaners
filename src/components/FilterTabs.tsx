import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

export interface FilterTab {
    id: string;
    label: string;
    count?: number;
}

interface FilterTabsProps {
    tabs: FilterTab[];
    activeTab: string;
    onTabPress: (tabId: string) => void;
}

export const FilterTabs = ({ tabs, activeTab, onTabPress }: FilterTabsProps) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab;

                    return (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => onTabPress(tab.id)}
                            style={[
                                styles.tab,
                                isActive ? styles.activeTab : styles.inactiveTab,
                            ]}
                        >
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                {tab.label}
                                {tab.count !== undefined && ` ${tab.count}${isActive ? '+' : ''}`}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 28,
        shadowColor: '#0D81FC',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    activeTab: {
        backgroundColor: colors.primary,
    },
    inactiveTab: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.primary,
    },
    activeTabText: {
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
