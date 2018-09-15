import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class MisRutasScreen extends React.Component {
  static navigationOptions = {
    title: 'Mis Rutas',
  };

  render() {
    return (

        <View style={styles.container}>

        </View>

    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#bedce2',
    paddingHorizontal: 10,
    paddingTop: 70,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
});
