import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import DogScreen from '../screens/DogScreen';

const DogStack = createStackNavigator({
  Dog : DogScreen,
})

export default createSwitchNavigator({
  Main: MainTabNavigator,
  Dogs: DogStack
});
