import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import Camera from '../components/Camera'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

 class MisRutasScreen extends React.Component {
  static navigationOptions = {
    title: 'Mis Rutas',
  };

  render() {
    return (
        <View style={styles.container}>
          <Camera> </Camera>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataRoutes : state.dataRoutes,
    keyUser : state.keyUser,
  }
}

export default connect(mapStateToProps, actions)(MisRutasScreen)

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
