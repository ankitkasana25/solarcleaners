import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentComponentProps,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  FadeInLeft,
} from 'react-native-reanimated';
import { useRootStore } from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ImageIcon } from '../components/ImageIcon'; // Use ImageIcon for consistency
import { IconName } from '../theme/icons';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

// Helper to get active route name recursively
const getActiveRouteName = (state: any): string => {
  if (!state || !state.routes) return '';
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
};

interface MenuItemProps {
  label: string;
  icon?: IconName;
  onPress: () => void;
  index: number;
  logout?: boolean;
  isActive?: boolean;
}

const MenuItem = ({
  label,
  icon,
  onPress,
  index,
  logout,
  isActive,
}: MenuItemProps) => {
  return (
    <AnimatedTouchableOpacity
      entering={FadeInLeft.delay(index * 100).springify()}
      style={[
        styles.menuItem,
        logout && styles.logoutItem,
        isActive && styles.activeMenuItem,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          logout && styles.logoutIconContainer,
          isActive && styles.activeIconContainer,
        ]}
      >
        {icon && (
          <ImageIcon
            name={icon}
            size={22}
            color={logout ? '#FF3B30' : isActive ? '#F5A623' : '#333333'}
          />
        )}
      </View>
      <Text
        style={[
          styles.menuLabel,
          logout && styles.logoutLabel,
          isActive && styles.activeMenuLabel,
        ]}
      >
        {label}
      </Text>
      {!logout &&
        (isActive ? (
          <View style={styles.activeIndicator} />
        ) : (
          <Text style={styles.chevron}>›</Text>
        ))}
    </AnimatedTouchableOpacity>
  );
};

export const CustomDrawerContent = observer(
  (props: DrawerContentComponentProps) => {
    const insets = useSafeAreaInsets();
    const { authStore } = useRootStore();
    const progress = useDrawerProgress();
    const activeRouteName = getActiveRouteName(props.state);

    // Mock user data
    const user = {
      name: 'Ankit Kasana',
      email: 'ankit@example.com',
      gender: 'male',
      avatar: null,
    };

    const handleLogout = async () => {
      await authStore.logout();
    };

    const headerAnimatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        (progress as any).value,
        [0, 1],
        [0.8, 1],
        Extrapolate.CLAMP,
      );
      const opacity = interpolate(
        (progress as any).value,
        [0, 1],
        [0, 1],
        Extrapolate.CLAMP,
      );
      return {
        transform: [{ scale }],
        opacity,
      };
    });

    return (
      <View
        style={[styles.container, { paddingTop: insets.top, backgroundColor: '#FFFFFF' }]} // White Background
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <View style={styles.profileRow}>
            <Image
              source={
                user.avatar
                  ? { uri: user.avatar }
                  : user.gender === 'male'
                    ? require('../assets/icons/profile.png')
                    : require('../assets/icons/profile.png')
              }
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.greeting}>Hello,</Text>
              <Text style={styles.name}>{user.name}</Text>
              <TouchableOpacity
                style={styles.editProfileLink}
                onPress={() => props.navigation.navigate('UserProfile')}
              >
                <Text style={styles.editProfileText}>Edit Profile ›</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dashboard</Text>
            <MenuItem
              label="Home"
              icon="home"
              index={0}
              isActive={activeRouteName === 'Home'}
              onPress={() =>
                props.navigation.navigate('MainTabs', { screen: 'Home' })
              }
            />
            <MenuItem
              label="Services"
              icon="services"
              index={1}
              isActive={activeRouteName === 'Services'}
              onPress={() =>
                props.navigation.navigate('MainTabs', { screen: 'Services' })
              }
            />
            <MenuItem
              label="Bookings"
              icon="bookings"
              index={2}
              isActive={activeRouteName === 'Bookings'}
              onPress={() =>
                props.navigation.navigate('MainTabs', { screen: 'Bookings' })
              }
            />
            <MenuItem
              label="Cart"
              icon="cart"
              index={3}
              isActive={activeRouteName === 'Cart'}
              onPress={() =>
                props.navigation.navigate('MainTabs', { screen: 'Cart' })
              }
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <MenuItem
              label="Profile"
              icon="profile"
              index={4}
              isActive={activeRouteName === 'UserProfile'}
              onPress={() => props.navigation.navigate('UserProfile')}
            />
            <MenuItem
              label="Help & Support"
              icon="mic"
              index={5}
              onPress={() => { }}
            />
          </View>

          <View style={styles.footer}>
            <MenuItem
              label="Log Out"
              icon="profile" // Fallback icon, maybe add 'logout' to icons
              index={6}
              logout
              onPress={handleLogout}
            />
          </View>
        </ScrollView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    marginBottom: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  greeting: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  editProfileLink: {
    paddingVertical: 4,
  },
  editProfileText: {
    color: '#007AFF', // Blue color for generic link
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
    marginLeft: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  activeMenuItem: {
    backgroundColor: '#F0F8FF', // Light blue bg
    borderColor: '#007AFF', // Blue border
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activeIconContainer: {
    backgroundColor: '#D1E8FF', // light blue icon bg
  },
  menuLabel: {
    flex: 1,
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  activeMenuLabel: {
    color: '#007AFF',
    fontWeight: '700',
  },
  chevron: {
    color: '#C7C7CC',
    fontSize: 20,
    fontWeight: '300',
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
  },
  logoutItem: {
    backgroundColor: 'rgba(255,59,48,0.1)',
    borderColor: 'rgba(255,59,48,0.2)',
    marginTop: 20,
  },
  logoutIconContainer: {
    backgroundColor: 'rgba(255,59,48,0.2)',
  },
  logoutLabel: {
    color: '#FF3B30',
  },
  footer: {
    marginTop: 20,
  },
});
