import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageIcon } from './ImageIcon';
import { lightTheme } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const HomeHeader = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
            <Ionicons name="grid-outline" size={24} color={lightTheme.colors.headerTitle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationSelector} activeOpacity={0.7}>
            <View style={styles.locationIconBg}>
              <Ionicons name="location" size={12} color={lightTheme.colors.primaryBlue} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Location</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationValue}>Sector 62, Noida</Text>
                <Ionicons name="chevron-down" size={12} color={lightTheme.colors.slateGray} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => (navigation as any).navigate('MainStack', { screen: 'Notifications' })}
          >
            <Ionicons name="notifications-outline" size={22} color={lightTheme.colors.headerTitle} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => (navigation as any).navigate('UserProfile')}
          >
            <View style={styles.profileBox}>
              <Ionicons name="person" size={18} color="#FFFFFF" />
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
    paddingBottom: 4,
  },
  contentContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F6FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconBg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EBF1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  locationLabel: {
    fontSize: 10,
    fontFamily: 'NotoSans-Medium',
    color: lightTheme.colors.slateGray,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationValue: {
    fontSize: 13,
    fontFamily: 'NotoSans-Bold',
    color: lightTheme.colors.headerTitle,
    marginRight: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF4B4B',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  profileButton: {
    marginLeft: 4,
  },
  profileBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: lightTheme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: lightTheme.colors.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
});
