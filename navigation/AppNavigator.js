import React from 'react';
import {createStackNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import DogScreen from '../screens/DogScreen';

const AppStackNavigator = createStackNavigator ({
    Main: {
           screen:MainTabNavigator,
           navigationOptions: {
                header: null
              }
         },
    Dogs: {
           screen:DogScreen
          },
})

export default AppStackNavigator
