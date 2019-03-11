import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {MapView} from 'expo'
import Colors from "../constants/Colors"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import InfoRoute from '../components/Modals/InfoRoute'
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
    },
    isOpenInfoRoute: false
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

  _pressMarker = (markerKey) => {
    for (let route of this.props.dataRoutes) {
      if (route.key == markerKey) {
        this.setState({routeSelected: route, isOpenInfoRoute: true})
        break
      }
    }
  }

  _pressDismissInfoRoute = () => {
    this.setState({isOpenInfoRoute: false})
  }

  renderMarker = marker => {
    return (<MapView.Marker key={marker.key} identifier={marker.key} coordinate={marker.coords} onPress={() => this._pressMarker(marker.key)}>
      <Icon style={{
          marginRight: 5
        }} name={"routes"} size={40} color={Colors.pinkChicle}/>
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
        <InfoRoute isOpenInfoRoute={this.state.isOpenInfoRoute} routeSelect={this.state.routeSelected} clickDismiss={this._pressDismissInfoRoute}/>
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