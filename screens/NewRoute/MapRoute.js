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
  Dimensions
} from 'react-native'

var {
  GooglePlacesAutocomplete
} = require('react-native-google-places-autocomplete')

var screenWidth = Dimensions.get('window').width
const WalkthroughableView = walkthroughable(View)

class MapRoute extends React.Component {

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
    console.log(this.state.coordsMarker);
    this.changeValueNewRoute(coords.nativeEvent.coordinate)
    let where = (await Expo.Location.reverseGeocodeAsync(coords.nativeEvent.coordinate))[0]
    this.setState({descripMarker: where.name})
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
        <CopilotStep text="Para encontrar un lugar puedes ayudarte del buscador" order={2} name="findPlace">
          <WalkthroughableView style={{
              width: '80%',
              top: 0,
              alignItems: 'center',
              height: '12%',
              position: 'absolute'
            }}/>
        </CopilotStep>
        <CopilotStep text="Mueve el mapa hasta encontrar tu punto de encuentro. Una vez localizado, pincha encima para colocar el pin." order={1} name="map">
          <WalkthroughableView style={{
              width: '80%',
              top: 0,
              bottom: 60,
              height: '80%'
            }}>
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
              }} onPress={(coords) => this.onMapPress(coords)} showsMyLocationButton={true} showsUserLocation={true} showsCompass={true} compassStyle={{
                bottom: 10,
                left: 10
              }}>
              {
                this.state.coordsMarker
                  ? <Expo.MapView.Marker ref={this.setMarkerRef} coordinate={this.state.coordsMarker} description={this.state.descripMarker} title='Punto de encuentro'/>
                  : null
              }
            </MapView>
          </WalkthroughableView>
        </CopilotStep>
        <GooglePlacesAutocomplete placeholder='¿Dónde quedamos?' minLength={2} autoFocus={false} autoCorrect={true} listViewDisplayed='false' fetchDetails={true} renderDescription={(row) => row.description} onPress={(data, details = null) => {
            console.log(data)
            console.log(details)
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
            description: {
              fontWeight: 'bold'
            },
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              top: 0,
              width: '80%',
              height: '10%',
              borderWidth: 0
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              height: 30,
              color: '#5d5d5d',
              fontSize: 16,
              borderWidth: 0,
              borderRadius: 25
            },
            listView: {
              backgroundColor: Colors.whiteCrudo,
              top: 10
            }
          }} currentLocation={false} currentLocationLabel="Current location" nearbyPlacesAPI='GooglePlacesSearch' GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }} GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }} filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3', 'sublocality', 'administrative_area_level_2', 'administrative_area_level_1']} debounce={200} renderLeftButton={() => <Text></Text>} renderRightButton={() => <Text></Text>}/>
      </View>)
    }
    return (<View/>)
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginBottom: 35,
    flex: 1,
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {dataNewRoute: state.dataNewRoute}
}

export default connect(mapStateToProps, actions)(copilot({tooltipComponent: TooltipCopilot, animated: true, overlay: 'svg'})(MapRoute))
