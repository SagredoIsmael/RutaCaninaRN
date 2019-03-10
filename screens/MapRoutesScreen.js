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
} from 'react-native'

class MapRoutesScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    me: {
      location: {
        coords: {
          latitude: 36.834047,
          longitude: -2.463714
        }
      }
    }
  }

  componentDidMount() {
    this._getLocationAsync()
  }

  _getLocationAsync = async () => {
    let {status} = (await Expo.Permissions.askAsync(Expo.Permissions.LOCATION));

    if (status !== 'granted') {
      console.error('Location Permission Not Granted')
      Alert('Es necesario permitir la localización')
    }

    let location = await Expo.Location.getCurrentPositionAsync()
    this.setState({
      me: {
        location: location
      }
    })
  }

  renderMarker = marker => {
    return (<MapView.Marker key={marker.id} identifier={marker.id} coordinate={marker.coords} onPress={this.onMarkerPress}>
      <View style={{
          width: 35,
          height: 35,
          backgroundColor: marker.id === this.state.selectedMarkerId
            ? 'gold'
            : 'green'
        }}></View>
    </MapView.Marker>);
  };

  render() {
    return (<View style={styles.container}>
      <MapView style={{
          width: '100%',
          top: 0,
          bottom: 0,
          position: 'absolute'
        }} region={{
          latitude: this.state.me.location.coords.latitude,
          longitude: this.state.me.location.coords.longitude,
          longitudeDelta: 0.01211,
          latitudeDelta: 0.01211
        }} showsMyLocationButton={true} showsUserLocation={true} showsCompass={true} compassStyle={{
          bottom: 10
        }}>
        {this.props.dataRoutes.map(this.renderMarker)}
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
