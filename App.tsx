import 'react-native-gesture-handler'; // Must be at the top
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';

function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
