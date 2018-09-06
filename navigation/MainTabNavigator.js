import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RutasScreen from '../screens/RutasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import MisRutasScreen from '../screens/MisRutasScreen';

import { Ionicons } from '@expo/vector-icons';

const RutasStack = createStackNavigator({
  Rutas : RutasScreen,
});


RutasStack.navigationOptions = {
  tabBarLabel: 'Rutas cerca',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'?
           `ios-navigate${focused ? '' : '-outline'}`
          : 'md-navigate'
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
      name={Platform.OS === 'ios' ?
       `ios-contact${focused ? '' : '-outline'}`
        : 'md-contact'}
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
      name={Platform.OS === 'ios' ?
       `ios-heart${focused ? '' : '-outline'}`
        : 'md-heart'}
    />
  ),
};

export default createBottomTabNavigator({
  RutasStack,
  PerfilStack,
  MisRutasStack,
});
