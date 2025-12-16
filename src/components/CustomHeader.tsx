import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { ImageIcon } from './ImageIcon';

interface CustomHeaderProps {
  title?: string;
}

export const CustomHeader = ({ title }: CustomHeaderProps) => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.contentContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={openDrawer} style={styles.iconButton}>
            <ImageIcon name="menu" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate('MainStack', { screen: 'Notifications' })
            }
          >
            <View style={styles.notificationWrapper}>
              <ImageIcon name="bell" size={24} color={colors.text} />
              <View style={styles.badge} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('UserProfile' as never)}
          >
            <Image
              source={require('../assets/icons/profile.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    gap: 16,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'NotoSans-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18.2, // 130% of 14px
    letterSpacing: 0,
    color: '#2E3A59',
    textAlignVertical: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: colors.white,
  },
  profileButton: {
    marginLeft: 8,
    padding: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E1E1E1',
  },
});
