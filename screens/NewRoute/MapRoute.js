import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import { MapView } from 'expo'
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Text,
  Dimensions,
} from 'react-native'

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete')

var screenWidth = Dimensions.get('window').width

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

  onChangePositionMap = (location) => {
    this.setState({me: {
    location : {coords: {latitude: location.lat,
                        longitude:  location.lng}}
                      },})
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
          <MapView
            style={{width:'80%',
              top: 0,
              bottom: 60,
              position: 'absolute'}}
            region={{
              latitude: this.state.me.location.coords.latitude,
              longitude: this.state.me.location.coords.longitude,
              longitudeDelta: 0.01211,
              latitudeDelta: 0.01211,
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
          <GooglePlacesAutocomplete
              placeholder='¿Dónde quedamos?'
              minLength={2}
              autoFocus={false}
              autoCorrect={true}
              listViewDisplayed='false'
              fetchDetails={true}
              renderDescription={(row) => row.description}
              onPress={(data, details = null) => {
                  console.log(data)
                  console.log(details)
                  if (details && details.geometry && details.geometry.location) {
                      this.onChangePositionMap(details.geometry.location)
                  }
              }}
              getDefaultValue={() => {
                  return ''
              }}
              query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyAUYfbKtctkIibOgFnNN2x9Xg9i0sVxlhQ',
                  language: 'es',
                  types: 'geocode'
              }}
              styles={{
                  description: {
                      fontWeight: 'bold',
                  },
                  textInputContainer: {
                      backgroundColor: 'rgba(0,0,0,0)',
                      top: 0,
                      width: '80%',
                      borderWidth: 0
                  },
                  textInput: {
                      marginLeft: 0,
                      marginRight: 0,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 20,
                      height: 38,
                      color: '#5d5d5d',
                      fontSize: 16,
                      borderWidth: 0,
                      borderRadius: 25,
                  },
                  listView: {
                      backgroundColor: Colors.whiteCrudo,
                      top: 10,
                  }
              }}

              currentLocation={false}
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  types: 'food'
              }}

              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3', 'sublocality', 'administrative_area_level_2', 'administrative_area_level_1']}
              debounce={200}
              renderLeftButton={() => <Text></Text> }
              renderRightButton={() => <Text></Text> }
            />
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
  flex:1,
  alignItems: 'center',

},

});


const mapStateToProps = state => {
  return {
    dataNewRoute : state.dataNewRoute,
  }
}

export default connect(mapStateToProps, actions)(MapRoute)
