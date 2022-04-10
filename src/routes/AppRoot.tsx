import * as React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/Home';
import UserCreateScreen from '../screens/UserCreate/UserCreate';
import UserEditScreen from '../screens/UserEdit/UserEdit';

import { AppStackParamList } from './RouteTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

const Stack = createNativeStackNavigator();

export default function AppRoot() {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserCreate" component={UserCreateScreen} />
        <Stack.Screen name="UserEdit" component={UserEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
