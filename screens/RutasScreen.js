import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class RutasScreen extends React.Component {
  static navigationOptions = {
    title: 'Rutas cerca de mí',
  };

  render() {
    return (
      <View style={styles.container}>
        <ExpoLinksView />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#69a5b0',
  },
});
