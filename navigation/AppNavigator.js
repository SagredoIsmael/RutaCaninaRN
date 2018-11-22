import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DogScreen from '../screens/DogScreen';

export default createSwitchNavigator({
  Main: MainTabNavigator,
  Dogs: DogScreen
});
