import React from 'react';
import BouncingPreloader from 'react-native-bouncing-preloader'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';


const icons = [
  require('../assets/images/bone.png'),
  require('../assets/images/dog.png'),
  require('../assets/images/paws.png'),
  require('../assets/images/toys.png'),
];

export default class LoadingIcons extends React.Component {
  render() {
    return (
      <BouncingPreloader
        icons={icons}
        leftDistance={-100}
        rightDistance={-150}
        speed={1000}
      />
    )
  }
}
