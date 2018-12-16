import React from 'react'
import {createStackNavigator} from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import DogScreen from '../screens/DogScreen'
import NewRouteScreen from '../screens/NewRouteScreen'

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
    NewRoute: {
          screen:NewRouteScreen
          },

})

export default AppStackNavigator
