import React from "react"
import {createStackNavigator, createAppContainer} from "react-navigation"
import MainTabNavigator from "./MainTabNavigator"
import DogScreen from "../screens/DogScreen"
import NewRouteScreen from "../screens/NewRoute/NewRouteScreen"
import Profile from "../screens/PerfilScreen"
import MapRoutes from "../screens/MapRoutesScreen"
import RoutesList from "../screens/RutasScreen"
import ChatRouteScreen from "../screens/ChatRouteScreen"

const AppStackNavigator = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  Dogs: {
    screen: DogScreen
  },
  NewRoute: {
    screen: NewRouteScreen
  },
  ChatRouteScreen: {
    screen: ChatRouteScreen
  },
  Profile: {
    screen: Profile
  },
  MapRoutes: {
    screen: MapRoutes
  },
  RoutesList: {
    screen: RoutesList
  }
});

const App = createAppContainer(AppStackNavigator);

export default App;
