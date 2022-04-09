import * as React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/Home';
import SetUserScreen from '../screens/SetUser/SetUser';

import { AppStackParamList } from './RouteTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

const Stack = createNativeStackNavigator();

export default function AppRoot() {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SetUser" component={SetUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
