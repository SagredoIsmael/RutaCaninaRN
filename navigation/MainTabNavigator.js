import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RutasScreen from '../screens/RutasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import MisRutasScreen from '../screens/MisRutasScreen';

const RutasStack = createStackNavigator({
  Rutas : RutasScreen,
});

RutasStack.navigationOptions = {
  tabBarLabel: 'Rutas cerca',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PerfilStack = createStackNavigator({
  Links: PerfilScreen,
});

PerfilStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const MisRutasStack = createStackNavigator({
  Settings: MisRutasScreen,
});

MisRutasStack.navigationOptions = {
  tabBarLabel: 'Mis Rutas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  RutasStack,
  PerfilStack,
  MisRutasStack,
});
