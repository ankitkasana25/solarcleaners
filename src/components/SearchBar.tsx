import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ImageIcon } from './ImageIcon';
import { lightTheme } from '../theme/theme';

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
        <ImageIcon
          name="search"
          size={16}
          color={lightTheme.colors.gray5}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={lightTheme.colors.gray4}
          value={value}
          onChangeText={onChangeText}
        />
        {showVoiceSearch && (
          <TouchableOpacity style={styles.voiceButton}>
            <ImageIcon
              name="mic"
              size={20}
              color={lightTheme.colors.gray1000}
            />
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
    height: 42,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'NotoSans-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15.6, // 130% of 12
    color: lightTheme.colors.typography,
    height: '100%',
    textAlignVertical: 'center', // vertical-align: middle
    padding: 0, // Reset padding for precise alignment
  },
  voiceButton: {
    marginLeft: 8,
  },
});
