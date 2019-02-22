import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Image,
  ImageBackground
} from "react-native"
import Colors from "../../constants/Colors"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

const InfoDogs = ({isOpenInfoDog}) => {
  return (<Dialog onDismiss={() => {
      console.log('click on dismiss');
    }} width={0.9} visible={isOpenInfoDog} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} dialogTitle={<DialogTitle
    title = "Asistentes" onTouchOutside = {
      () => {
        console.log('click en title');
      }
    }
    style = {{
            backgroundColor: '#F7F7F8',
          }}
    hasTitleBar = {
      false
    }
    align = "center"
    />} footer={<DialogFooter> < DialogButton text = "OK" bordered = "bordered" onPress = {
      () => console.log('press OK')
    }
    key = "button-2" /> </DialogFooter>}>
    <DialogContent style={{
        backgroundColor: '#F7F7F8'
      }}>
      <ImageBackground source={require("../../assets/images/background.png")} style={{
          width: "100%"
        }}>

        <Text>Default Animation</Text>
        <Text>No onTouchOutside handler. will not dismiss when touch overlay.</Text>
      </ImageBackground>
    </DialogContent>
  </Dialog>)
}

const styles = StyleSheet.create({});

export default InfoDogs;
