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
              size={22}
              color={logout ? '#FF3B30' : isActive ? '#F5A623' : '#333333'}
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
        {!logout && !hideChevron &&
          (isActive && !isExpandable ? (
            <View style={styles.activeIndicator} />
          ) : isExpandable ? (
            <Animated.Text style={[styles.chevron, animatedIconStyle]}>›</Animated.Text>
          ) : (
            <Text style={styles.chevron}>›</Text>
          ))}
      </AnimatedTouchableOpacity>
      {isExpandable && isExpanded && children && (
        <View style={styles.subMenuContainer}>
          {children}
        </View>
      )}
    </View>
  );
};

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
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

  const [servicesExpanded, setServicesExpanded] = React.useState(false);
  const [bookingsExpanded, setBookingsExpanded] = React.useState(false);
  const [plansExpanded, setPlansExpanded] = React.useState(false); // New State
  const [myPlansExpanded, setMyPlansExpanded] = React.useState(false); // New State

  const toggleServices = () => {
    setServicesExpanded(!servicesExpanded);
  };

  const toggleBookings = () => {
    setBookingsExpanded(!bookingsExpanded);
  };

  const togglePlans = () => {
    setPlansExpanded(!plansExpanded);
  };

  const toggleMyPlans = () => {
    setMyPlansExpanded(!myPlansExpanded);
  };

  const navigateToService = (serviceId: string) => {
    props.navigation.navigate('MainTabs', { screen: 'Services', params: { filter: serviceId } });
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
      style={[styles.container, { paddingTop: insets.top, backgroundColor: '#F4F9FF' }]}
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
              <Text style={[styles.editProfileText, { color: '#2D44B5' }]}>Edit Profile</Text>
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
            <View style={styles.accentBar} />
            <Text style={styles.sectionTitle}>Dashboard</Text>
          </View>

          <MenuItem
            label="Our Services"
            icon="services"
            index={0}
            isActive={activeRouteName === 'Services'}
            onPress={toggleServices}
            isExpandable
            isExpanded={servicesExpanded}
            labelStyle={styles.primaryMenuLabel}
          >
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigateToService('residential')}>
              <Text style={styles.subMenuLabel}>Residential Cleaning</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigateToService('commercial')}>
              <Text style={styles.subMenuLabel}>Commercial Cleaning</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigateToService('bird_proofing')}>
              <Text style={styles.subMenuLabel}>Bird Proofing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigateToService('maintenance')}>
              <Text style={styles.subMenuLabel}>Maintenance</Text>
            </TouchableOpacity>
          </MenuItem>

          <MenuItem
            label="My Booking"
            icon="bookings"
            index={1}
            isActive={activeRouteName === 'Bookings'}
            onPress={toggleBookings}
            isExpandable
            isExpanded={bookingsExpanded}
            labelStyle={styles.primaryMenuLabel}
          >
            <TouchableOpacity style={styles.subMenuItem} onPress={() => props.navigation.navigate('MainStack', { screen: 'MainTabs', params: { screen: 'Bookings' } })}>
              <Text style={styles.subMenuLabel}>Dec 10 - Residential Clean</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => props.navigation.navigate('MainStack', { screen: 'MainTabs', params: { screen: 'Bookings' } })}>
              <Text style={styles.subMenuLabel}>Nov 28 - Maintenance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => props.navigation.navigate('MainStack', { screen: 'MainTabs', params: { screen: 'Bookings' } })}>
              <Text style={styles.subMenuLabel}>Oct 15 - Bird Proofing</Text>
            </TouchableOpacity>
          </MenuItem>

          {/* New Subscription Plans Dropdown */}
          <MenuItem
            label="Subscription Plans"
            icon="subscriptions"
            index={2}
            isActive={activeRouteName === 'SubscriptionPlans'}
            onPress={togglePlans}
            isExpandable
            isExpanded={plansExpanded}
            labelStyle={styles.primaryMenuLabel}
          >
            <TouchableOpacity style={styles.subMenuItem} onPress={() => props.navigation.navigate('MainStack', { screen: 'MainTabs', params: { screen: 'Home' } })}>
              {/* Redirecting to Home as Plans are there currently. Or create specific screen? */}
              <Text style={styles.subMenuLabel}>View All Plans</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem}>
              <Text style={styles.subMenuLabel}>Comparisons</Text>
            </TouchableOpacity>
          </MenuItem>

          {/* New My Plans Dropdown */}
          <MenuItem
            label="My Plans"
            icon="myPlans"
            index={3}
            isActive={activeRouteName === 'MyPlans'}
            onPress={toggleMyPlans}
            isExpandable
            isExpanded={myPlansExpanded}
            labelStyle={styles.primaryMenuLabel}
          >
            <TouchableOpacity style={styles.subMenuItem}>
              {/* Dummy purchased plan */}
              <Text style={styles.subMenuLabel}>Active: Starter Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem}>
              <Text style={styles.subMenuLabel}>Renewals</Text>
            </TouchableOpacity>
          </MenuItem>

        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.accentBar} />
            <Text style={styles.sectionTitle}>Account</Text>
          </View>

          {/* New Order History Link */}
          <MenuItem
            label="Order History"
            icon="history"
            index={4}
            onPress={() => props.navigation.navigate('MainStack', { screen: 'OrderHistory' })}
            labelStyle={styles.primaryMenuLabel}
          />

          <MenuItem
            label="Help & Support"
            icon="support"
            index={5}
            onPress={() => { }}
            hideChevron
          />
        </View>
      </ScrollView>

      {/* Footer fixed at bottom */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
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
};

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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  editProfileLink: {
    paddingVertical: 4,
  },
  editProfileText: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '500',
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
    color: '#2D44B5',
    fontSize: 16,
    fontWeight: '700',
    // marginBottom: 12, // Moved to row
    // marginLeft: 8, // Removed, accent bar handles spacing
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
    fontSize: 16,
    fontWeight: '500',
  },
  primaryMenuLabel: {
    color: '#2D44B5',
    fontWeight: '600',
  },
  activeMenuLabel: {
    color: '#2D44B5',
    fontWeight: '600',
  },
  chevron: {
    color: '#2D44B5',
    fontSize: 28,
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
    fontSize: 15,
    fontWeight: '400',
  },
});
