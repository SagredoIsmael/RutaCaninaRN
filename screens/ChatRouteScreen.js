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

class ChatRouteScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat de la ruta'
  };

  render() {
    return (<View style={styles.container}></View>);
  }
}

const mapStateToProps = state => {
  return {dataRoutes: state.dataRoutes}
}

export default connect(mapStateToProps, actions)(ChatRouteScreen)

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
