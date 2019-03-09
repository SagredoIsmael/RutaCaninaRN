import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {MapView} from 'expo'
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
    header: null
  }

  render() {
    return (<View style={styles.container}>
      <MapView style={{
          width: '100%',
          top: 0,
          bottom: 0,
          position: 'absolute'
        }} region={{

          longitudeDelta: 0.01211,
          latitudeDelta: 0.01211
        }} showsMyLocationButton={true} showsUserLocation={true} showsCompass={true} compassStyle={{
          bottom: 10
        }}>
      </MapView>
      </View>);
  }
}

const mapStateToProps = state => {
  return {dataRoutes: state.dataRoutes}
}

export default connect(mapStateToProps, actions)(MapRoutesScreen)

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#bedce2',
    flex: 1,
    justifyContent: 'space-between'
  }
});
