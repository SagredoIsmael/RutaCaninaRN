import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

class MapRoutesScreen extends React.Component {
  static navigationOptions = {
    title: 'Mapa de rutas'
  };

  render() {
    return (<View style={styles.container}></View>);
  }
}

const mapStateToProps = state => {
  return {dataRoutes: state.dataRoutes}
}

export default connect(mapStateToProps, actions)(MapRoutesScreen)

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#bedce2',
    paddingHorizontal: 10,
    paddingTop: 70,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'space-between'
  }
});
