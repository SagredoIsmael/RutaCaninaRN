import React from "react"
import {MapView} from 'expo'
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Image,
  ImageBackground,
  Button,
  Platform,
  Linking
} from "react-native"
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import Colors from "../../constants/Colors"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

const MapLocationModal = ({isOpenMapLocation, location, descriptionMarker, clickDismiss}) => {

  if (location != null) {
    return (<Dialog onDismiss={() => {}} width={0.8} height={0.8} style={{
        backgroundColor: '#F7F7F8'
      }} visible={isOpenMapLocation} actionsBordered="actionsBordered" onTouchOutside={() => clickDismiss()} dialogAnimation={new ScaleAnimation()} footer={
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-between'}}>
          <AwesomeButtonRick type="secondary" style={{
                alignSelf: 'center',
                marginTop: 0,
                marginBottom: 15
              }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => goToExternalAppMap(location)}>
              Cómo llegar
          </AwesomeButtonRick>

          <AwesomeButtonRick type="secondary" style={{
                alignSelf: 'center',
                marginTop: 0,
                marginBottom: 5
              }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => clickDismiss()}>
              Cerrar
          </AwesomeButtonRick>
        </View>
      }>
      <DialogContent style={{
          backgroundColor: '#F7F7F8',
          width: '100%',
          height: '80%'
        }}>
        <MapView style={{
            width: '100%',
            height: '100%',
            top: 5,
            bottom: 5,
            flexDirection: 'column',
            justifyContent: 'center'
          }} region={{
            latitude: location.latitude,
            longitude: location.longitude,
            longitudeDelta: 0.15,
            latitudeDelta: 0.15
          }} showsMyLocationButton={false} showsUserLocation={false} showsCompass={false} mapType={'hybrid'}
            maxZoomLevel={20} onMapReady={() => { this.marker.showCallout() }}>
          <MapView.Marker ref={setMarkerRef} coordinate={location} description={descriptionMarker} title='Punto de encuentro'/>
        </MapView>
      </DialogContent>
    </Dialog>)
  }
  return <View></View>
}
export const setMarkerRef = (ref) => {
  this.marker = ref
}

export const goToExternalAppMap = (location) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
  const latLng = `${location.latitude},${location.longitude}`
  const label = 'Punto de encuentro de la ruta'
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });
  Linking.openURL(url)
}

const styles = StyleSheet.create({

});

export default MapLocationModal;
