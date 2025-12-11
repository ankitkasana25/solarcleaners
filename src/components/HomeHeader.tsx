import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ImageIcon } from './ImageIcon';

export const HomeHeader = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.contentContainer}>
        {/* Left: Hamburger and Location */}
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
            <ImageIcon name="menu" size={28} color="#000000ff" />
          </TouchableOpacity>
        </View>

        {/* Right: Actions */}
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <ImageIcon name="bell" size={24} color="#1C1C1E" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('UserProfile' as never)}>
            {/* Placeholder for Profile Image */}
            <View style={styles.profilePlaceholder}>
              <ImageIcon name="profile" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50, // Standard header height content area
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
  },
  appLogo: {
    width: 100,
    height: 32,
    marginRight: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginRight: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  profileButton: {
    marginLeft: 16,
  },
  profilePlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF', // or an image
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34C759',
    borderWidth: 1,
    borderColor: '#FFF',
  },
});
