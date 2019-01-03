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
} from 'react-native'

class MapRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    latitude: -36.834047,
    longitude: -2.463714,
    culte: 1,
    ecole: 1,
    boutique: 1,
    toggle: true,
  }

  componentDidMount() {
    this._getLocation()
   }

   _getLocation = () => {
     navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          })
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
      )
   }

  onMapPress = (e) => {
    console.log(e)
  }

  render() {
    if (this.props.currentPosition == 2){
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
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
            onPress={(e) => this.onMapPress(e)}
            showsMyLocationButton={true}
            showsUserLocation={true}
            showsCompass={true}
            compassStyle={{
              bottom: 10,
              left: 10,
            }}
            >
            <MapView.Marker draggable
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324
              }}
              title='Hello Map1s'
              description='jejeje'
            />
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
