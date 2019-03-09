import React from "react"
import {Platform} from "react-native"
import {createStackNavigator, createBottomTabNavigator} from "react-navigation"
import TabBarIcon from "../components/TabBarIcon"
import RutasScreen from "../screens/RutasScreen"
import LoginScreen from "../screens/LoginScreen"
import MisRutasScreen from "../screens/MisRutasScreen"
import MapRoutesScreen from "../screens/MapRoutesScreen"

import {Ionicons} from "@expo/vector-icons";

const RutasStack = createStackNavigator({Rutas: RutasScreen});

RutasStack.navigationOptions = {
  tabBarLabel: "Rutas cerca",
  tabBarIcon: ({focused}) => (<TabBarIcon focused={focused} name={Platform.OS === "ios"
      ? `ios-navigate${focused
        ? ""
        : "-outline"}`
      : "md-navigate"
}/>)
};

const PerfilStack = createStackNavigator({Login: LoginScreen});

PerfilStack.navigationOptions = {
  tabBarLabel: "Perfil",
  tabBarIcon: ({focused}) => (<TabBarIcon focused={focused} name={Platform.OS === "ios"
      ? `ios-contact${focused
        ? ""
        : "-outline"}`
      : "md-contact"
}/>)
};

const MisRutasStack = createStackNavigator({MisRutas: MisRutasScreen});

MisRutasStack.navigationOptions = {
  tabBarLabel: "Mis Rutas",
  tabBarIcon: ({focused}) => (<TabBarIcon focused={focused} name={Platform.OS === "ios"
      ? `ios-heart${focused
        ? ""
        : "-outline"}`
      : "md-heart"
}/>)
};

const MapRoutesStack = createStackNavigator({MapRoutes: MapRoutesScreen});

MapRoutesStack.navigationOptions = {
  tabBarLabel: "Mapa",
  tabBarIcon: ({focused}) => (<TabBarIcon focused={focused} name={Platform.OS === "ios"
      ? `ios-navigate${focused
        ? ""
        : "-outline"}`
      : "md-navigate"
}/>)
};

export default createBottomTabNavigator({RutasStack, MapRoutesStack, PerfilStack, MisRutasStack});
