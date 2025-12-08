import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerItem } from '../components/drawer/DrawerItem';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Menu Items */}
        <DrawerItem
          label="Profile"
          iconName="profile"
          onPress={() =>
            props.navigation.navigate('MainTabs', { screen: 'Profile' })
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
