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
        backgroundColor: 'transparent',
        paddingVertical: 12,
        marginBottom: 8,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 10,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeTab: {
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    inactiveTab: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E1E1E1',
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: '#8E8E93',
    },
    activeTabText: {
        fontFamily: 'NotoSans-Bold',
        color: '#FFFFFF',
    },
});
