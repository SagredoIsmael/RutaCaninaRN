import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import AutoTypingText from 'react-native-auto-typing-text'
import { MapView } from 'expo'
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from 'react-native'

class MapRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    me: {
      location : {coords: {latitude: 36.834047,
                          longitude:  -2.463714}}
    },
  }

  _getLocationAsync = async() => {
    let {status} = (await Expo.Permissions.askAsync(Expo.Permissions.LOCATION));

    if( status !== 'granted') {
      console.error('Location Permission Not Granted')
      Alert('Es necesario permitir la localización')
    }

    let location = await Expo.Location.getCurrentPositionAsync()
    //let almeria = (await Expo.Location.geocodeAsync('juan de la encina, Almería'))[0]
    this.setState({ me:{ location:location }
    /*  places:{
        almeria,
      }*/
    })
  }

  componentDidMount() {
    this._getLocationAsync()
  }

  setMarkerRef = (ref) => {
    this.marker = ref
  }

  onMapPress = async(coords) => {
    this.setState({coordsMarker : coords.nativeEvent.coordinate})
    this.changeValueNewRoute(coords.nativeEvent.coordinate)
    let where = (await Expo.Location.reverseGeocodeAsync(coords.nativeEvent.coordinate))[0]
    this.setState({descripMarker : where.name})
    this.marker.showCallout()
  }

  changeValueNewRoute = (value) => {
    this.props.dataNewRoute.coords = value
    this.props.insert_dataNewRoute(this.props.dataNewRoute)
  }

  render() {
    if (this.props.currentPosition == 2){
      if(!this.state.me.location) {
        console.log('Permission not Granted')
        return(<View />);
      }
      return (
        <View style={styles.container}>
          <AutoTypingText
            text={'A continuación selecciona el punto de encuentro de la ruta'}
            charMovingTime={40}
            delay={0}
            style={{
              position: 'absolute',
              width: '90%',
              height: 100,
              fontSize: 20,
              color: Colors.verdeOscuro,
              margin: 20,
              marginTop: 20,
            }}
            onComplete={() => { console.log('done'); }}
          />
          <MapView
            style={{height: '100%', width: '100%', marginTop:100}}
            initialRegion={{
              latitude: this.state.me.location.coords.latitude,
              longitude: this.state.me.location.coords.longitude,
              longitudeDelta: 0.01211,
              latitudeDelta: 0.01211,
            //latitudeDelta: 0.0022,
            //longitudeDelta: 0.0021,
            }}
            onPress={(coords) => this.onMapPress(coords)}
            showsMyLocationButton={true}
            showsUserLocation={true}
            showsCompass={true}
            compassStyle={{
              bottom: 10,
              left: 10,
            }}
            >
            {this.state.coordsMarker?
              <Expo.MapView.Marker
                ref={this.setMarkerRef}
                coordinate = {this.state.coordsMarker}
                description={this.state.descripMarker}
                title='Punto de encuentro' />
              :
              null
            }
          </MapView>
        </View>
      )
    }
    return (
      <View/>
    )
  }
}


const styles = StyleSheet.create({
container: {
  height: '100%',
},

});


const mapStateToProps = state => {
  return {
    dataNewRoute : state.dataNewRoute,
  }
}

export default connect(mapStateToProps, actions)(MapRoute)
