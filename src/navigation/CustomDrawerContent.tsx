import React from 'react';
import { observer } from 'mobx-react-lite';
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
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { useRootStore } from '../stores/RootStore';

import { ImageIcon } from '../components/ImageIcon'; // Use ImageIcon for consistency
import { IconName } from '../theme/icons';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

// Helper to get active route name recursively
const getActiveRouteName = (state: any): string => {
  if (!state || !state.routes) return '';
  const route = state.routes[state.index ?? 0];
  if (!route) return '';

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
  isExpandable?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  children?: React.ReactNode;
  labelStyle?: any;
  hideChevron?: boolean;
}

const MenuItem = ({
  label,
  icon,
  onPress,
  index,
  logout,
  isActive,
  isExpandable,
  isExpanded,
  children,
  labelStyle,
  hideChevron,
}: MenuItemProps) => {
  const rotation = useSharedValue(0);

  // Update rotation when expanded state changes
  React.useEffect(() => {
    if (isExpandable) {
      rotation.value = withTiming(isExpanded ? 90 : 0);
    }
  }, [isExpanded, isExpandable]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View>
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
              size={18}
              color={logout ? '#f77069ff' : isActive ? '#F5A623' : '#333333'}
            />
          )}
        </View>
        <Text
          style={[
            styles.menuLabel,
            labelStyle,
            logout && styles.logoutLabel,
            isActive && styles.activeMenuLabel,
          ]}
        >
          {label}
        </Text>
        {!logout &&
          !hideChevron &&
          (isActive && !isExpandable ? (
            <View style={styles.activeIndicator} />
          ) : isExpandable ? (
            <Animated.Text style={[styles.chevron, animatedIconStyle]}>
              ›
            </Animated.Text>
          ) : (
            <Text style={styles.chevron}>›</Text>
          ))}
      </AnimatedTouchableOpacity>
      {isExpandable && isExpanded && children && (
        <View style={styles.subMenuContainer}>{children}</View>
      )}
    </View>
  );
};

export const CustomDrawerContent = observer((props: DrawerContentComponentProps) => {
  const insets = useSafeAreaInsets();
  const { authStore } = useRootStore();
  const progress = useDrawerProgress();
  const activeRouteName = getActiveRouteName(props.state);

  const user = authStore.user || {
    name: 'Guest User',
    email: '',
    gender: 'male',
    avatar: null,
  };

  const handleLogout = async () => {
    await authStore.logout();
  };

  // ... (headerAnimatedStyle) ... (no change to it, so just keep component structure logic)
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
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: '#F4F9FF' },
      ]}
    >
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View style={styles.profileRow}>
          <Image
            source={
              user.avatar
                ? { uri: user.avatar }
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
              <Text style={[styles.editProfileText, { color: '#000000ff' }]}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Dashboard</Text>
          </View>

          <MenuItem
            label="Our Services"
            icon="services"
            index={0}
            isActive={activeRouteName === 'Services'}
            onPress={() => props.navigation.navigate('MainStack', { screen: 'MainTabs', params: { screen: 'Services' } })}
            labelStyle={styles.primaryMenuLabel}
          />

          <MenuItem
            label="My Booking"
            icon="bookings"
            index={1}
            isActive={activeRouteName === 'Bookings'}
            onPress={() => props.navigation.navigate('MainStack', { screen: 'MainTabs', params: { screen: 'Bookings' } })}
            labelStyle={styles.primaryMenuLabel}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Account</Text>
          </View>

          {/* New Order History Link */}
          <MenuItem
            label="Order History"
            icon="history"
            index={4}
            onPress={() =>
              props.navigation.navigate('MainStack', { screen: 'OrderHistory' })
            }
            labelStyle={styles.primaryMenuLabel}
          />

          <MenuItem
            label="Help & Support"
            icon="support"
            index={5}
            onPress={() => props.navigation.navigate('MainStack', { screen: 'ContactUs' })}
            hideChevron
          />
        </View>
      </ScrollView>

      {/* Footer fixed at bottom */}
      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
        ]}
      >
        <MenuItem
          label="Log Out"
          icon="logout"
          index={6}
          logout
          onPress={handleLogout}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FF', // Light pale blue background
  },
  header: {
    padding: 24,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  greeting: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 2,
  },
  name: {
    color: '#2D44B5', // Use the blue theme color
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  editProfileLink: {
    paddingVertical: 4,
  },
  editProfileText: {
    color: '#666666',
    fontSize: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  accentBar: {
    width: 4,
    height: 16,
    backgroundColor: '#2D44B5',
    marginRight: 8,
    borderRadius: 2,
  },
  sectionTitle: {
    color: '#2D44B5', // text color (since background is blue)
    fontSize: 14,
    fontFamily: 'NotoSans-Medium',
    fontWeight: 500, // optional if font file already defines weight
    lineHeight: 18.2, // 130% of 14px → 14 × 1.3
    letterSpacing: 0,
    textAlign: 'center',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(45, 68, 181, 0.08)', // Subtle blue tint
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activeIconContainer: {
    // No specific change needed for container if transparent
  },
  menuLabel: {
    flex: 1,
    color: '#444444',
    fontSize: 14,
    fontWeight: '500',
  },
  primaryMenuLabel: {
    color: '#2D44B5',
    // fontWeight: '600',
  },
  activeMenuLabel: {
    color: '#2D44B5',
    // fontWeight: '600',
  },
  chevron: {
    color: '#2D44B5',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4, // Adjust alignment
  },
  activeIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#2D44B5',
    position: 'absolute',
    left: 0,
  },
  logoutItem: {
    marginTop: 10,
  },
  logoutIconContainer: {
    // Keep transparent
  },
  logoutLabel: {
    color: '#FF3B30',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 10,
  },
  subMenuContainer: {
    paddingLeft: 52, // Indent to align with text
    gap: 12,
    marginBottom: 8,
  },
  subMenuItem: {
    paddingVertical: 8,
  },
  subMenuLabel: {
    color: '#555555',
    fontSize: 12,
    fontWeight: '400',
  },
});
