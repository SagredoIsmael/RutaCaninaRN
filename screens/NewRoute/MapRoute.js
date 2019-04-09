import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import {MapView} from 'expo'
import TooltipCopilot from '../../components/TooltipComponent/TooltipCopilot'
import {copilot, walkthroughable, CopilotStep} from '@okgrow/react-native-copilot'
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Text,
  Dimensions,
  Platform
} from 'react-native'

var {
  GooglePlacesAutocomplete
} = require('react-native-google-places-autocomplete')

var screenWidth = Dimensions.get('window').width
const WalkthroughableView = walkthroughable(View)

class MapRoute extends React.Component {

  state = {
    maxZoomLevel: 5,
    me: {
      location: {
        coords: {
          latitude: 40.4167047,
          longitude: -3.7035825
        }
      }
    },
  }

  componentDidMount() {
    this._getLocationAsync()
    this.props.copilotEvents.on('stepChange', this.handleStepChange)
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  activateHelper = () => {
    this.props.start()
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  }

  _getLocationAsync = async () => {
    let {status} = (await Expo.Permissions.askAsync(Expo.Permissions.LOCATION));

    if (status !== 'granted') {
      Alert('Es necesario permitir la localización')
    }

    let location = await Expo.Location.getCurrentPositionAsync()
    this.setState({
      me: {
        location: location
      }
    })
  }

  setMarkerRef = (ref) => {
    this.marker = ref
  }

  onChangePositionMap = (location) => {
    this.setState({
      me: {
        location: {
          coords: {
            latitude: location.lat,
            longitude: location.lng
          }
        }
      }
    })
    var coords = {
      nativeEvent: {
        coordinate: {
          latitude: location.lat,
          longitude: location.lng
        }
      }
    }
    this.onMapPress(coords)
  }

  onMapPress = async (coords) => {
    this.setState({coordsMarker: coords.nativeEvent.coordinate})
    this.changeValueNewRoute(coords.nativeEvent.coordinate)

    let where = (await Expo.Location.reverseGeocodeAsync(coords.nativeEvent.coordinate))[0]

    if (Platform.OS === 'ios'){
      this.setState({descripMarker: where.name})
    }else{
      var streetName = where.street + ", " + where.name
      this.setState({descripMarker: streetName})
    }
    this.marker.showCallout()
  }

  changeValueNewRoute = (value) => {
    this.props.dataNewRoute.coords = value
    this.props.insert_dataNewRoute(this.props.dataNewRoute)
  }

  render() {
    if (this.props.currentPosition == 1) {
      if (!this.state.me.location) {
        console.log('Permission not Granted')
        Alert("Debes aceptar el permiso de localización")
        return (<View/>);
      }
      return (<View style={styles.container}>
        <CopilotStep text="Mueve el mapa hasta encontrar tu punto de encuentro. Una vez localizado, haz click encima para colocar el pin" order={1} name="map">
          <WalkthroughableView style={{
              width: '80%',
              height: '100%',
            }}>
            <MapView style={{
                top:50,
                flex:1,

              }} region={{
                latitude: this.state.me.location.coords.latitude,
                longitude: this.state.me.location.coords.longitude,
                longitudeDelta: 0.15,
                latitudeDelta: 0.15
              }} onPress={(coords) => this.onMapPress(coords)} showsMyLocationButton={true} showsUserLocation={true} showsCompass={true} compassStyle={{
                bottom: 10,
                left: 10
              }} maxZoomLevel={this.state.maxZoomLevel} onMapReady={() => {
                this.setState({maxZoomLevel: 20}) }}>
              {
                this.state.coordsMarker
                  ? <Expo.MapView.Marker ref={this.setMarkerRef} coordinate={this.state.coordsMarker} description={this.state.descripMarker} title='Punto de encuentro'/>
                  : null
              }
            </MapView>
            <GooglePlacesAutocomplete placeholder='¿Dónde quedamos?' minLength={2} autoFocus={false} autoCorrect={true} listViewDisplayed='false' fetchDetails={true} renderDescription={(row) => row.description} onPress={(data, details = null) => {
                if (details && details.geometry && details.geometry.location) {
                  this.onChangePositionMap(details.geometry.location)
                }
              }} getDefaultValue={() => {
                return ''
              }} query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyAUYfbKtctkIibOgFnNN2x9Xg9i0sVxlhQ',
                language: 'es',
                types: 'geocode'
              }} styles={{
                container:{
                  position:'absolute',
                  width:'100%'
                },
                description: {
                  fontWeight: 'bold',
                  fontSize: 12,
                },
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderWidth: 0,

                },
                textInput: {
                  color: '#5d5d5d',
                  fontSize: 14,
                  borderWidth: 0,
                  borderRadius: 25
                },
                listView: {
                  backgroundColor: Colors.whiteCrudo,
                }
              }} currentLocation={false} currentLocationLabel="Current location" nearbyPlacesAPI='GooglePlacesSearch' GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }} GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food'
              }} filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3', 'sublocality', 'administrative_area_level_2', 'administrative_area_level_1']} debounce={200} renderLeftButton={() => <Text></Text>} renderRightButton={() => <Text></Text>}/>
          </WalkthroughableView>
        </CopilotStep>
      </View>)
    }
    return (<View/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {dataNewRoute: state.dataNewRoute}
}

export default connect(mapStateToProps, actions)(copilot({tooltipComponent: TooltipCopilot, animated: true, overlay: 'svg'})(MapRoute))
