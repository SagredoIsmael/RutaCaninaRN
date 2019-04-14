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
  Button
} from "react-native"
import Colors from "../../constants/Colors"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

const MapLocationModal = ({isOpenMapLocation, location, clickDismiss}) => {

  if (location != null) {
    return (<Dialog onDismiss={() => {}} width={0.8} height={0.8} style={{
        backgroundColor: '#F7F7F8'
      }} visible={isOpenMapLocation} actionsBordered="actionsBordered" onTouchOutside={() => clickDismiss()} dialogAnimation={new ScaleAnimation()} footer={<Button title = "Cerrar" color = {
        Colors.verdeOscuro
      }
      align = "center" onPress = {
        () => clickDismiss()
      } />}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8',
          height: '90%'
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
          }} showsMyLocationButton={false} showsUserLocation={false} showsCompass={false} mapType={'hybrid'} maxZoomLevel={20}>
        </MapView>
      </DialogContent>
    </Dialog>)
  }
  return <View></View>
}

const styles = StyleSheet.create({

});

export default MapLocationModal;
