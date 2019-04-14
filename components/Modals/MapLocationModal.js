import React from "react";
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
    return (<Dialog onDismiss={() => {}} width={0.8} style={{
        backgroundColor: '#F7F7F8'
      }} visible={isOpenMapLocation} actionsBordered="actionsBordered" onTouchOutside={() => clickDismiss()} dialogAnimation={new ScaleAnimation()} footer={<Button title = "Cerrar" color = {
        Colors.verdeOscuro
      }
      align = "center" onPress = {
        () => clickDismiss()
      } />}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>
        <View>
        <Text style={{
            fontSize: 15,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            textAlign: "center",
            color: "gray"
          }}>
          {"Mis coordenadas son: ", location.latitude}
        </Text>
        </View>
      </DialogContent>
    </Dialog>)
  }
  return <View></View>
}

const styles = StyleSheet.create({

});

export default MapLocationModal;
