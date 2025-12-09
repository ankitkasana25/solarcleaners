import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ImageIcon } from './ImageIcon';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    showVoiceSearch?: boolean;
}

export const SearchBar = ({
    placeholder = 'Search',
    value,
    onChangeText,
    showVoiceSearch = false,
}: SearchBarProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <ImageIcon name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#AAAAAA"
                    value={value}
                    onChangeText={onChangeText}
                />
                {showVoiceSearch && (
                    <TouchableOpacity style={styles.voiceButton}>
                        <ImageIcon name="mic" size={20} color="#666" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#F5F5F5',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,

    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#1C1C1E',
        height: '100%',
    },
    voiceButton: {
        marginLeft: 8,
    },
});
