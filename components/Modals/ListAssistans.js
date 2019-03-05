import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Image,
  ImageBackground,
  Button,
  FlatList,
  TouchableHighlight
} from "react-native"
import ItemUser from '../ItemUser'
import Colors from "../../constants/Colors"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

const ListAssistans = ({isOpenListAssistans, clickDismiss, assistants, nav}) => {
  if (assistants != null) {
    console.log(assistants);
    return (<Dialog onDismiss={() => {
        console.log('click on dismiss');
      }} width={0.9} visible={isOpenListAssistans} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} dialogTitle={<DialogTitle
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
      />} footer={<View> < Button title = "Cerrar" color = {
        Colors.verdeOscuro
      }
      align = "center" onPress = {
        () => clickDismiss()
      } /> < /View>}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>
        <ImageBackground source={require("../../assets/images/background.png")} style={{
            width: "100%"
          }}>

          <TouchableHighlight width={145} height={145} activeOpacity={0.7} underlayColor="rgba(98,93,144,0)" overlayContainerStyle={{
              backgroundColor: "transparent"
            }} onPress={() => nav.navigate("Profile", {keyUser: assistants.keyCreator})}>

            <FlatList data={assistants} renderItem={({item}) => <ItemUser nameCreator={item.nameCreator} imageCreator={item.imageCreator}/>}/>

          </TouchableHighlight>

        </ImageBackground>
      </DialogContent>
    </Dialog>)
  }
  return (<Dialog onDismiss={() => {
      console.log('click on dismiss');
    }} width={0.9} visible={isOpenListAssistans} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} dialogTitle={<DialogTitle
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
    />} footer={<View> < Button title = "Cerrar" color = {
      Colors.verdeOscuro
    }
    align = "center" onPress = {
      () => clickDismiss()
    } /> < /View>}>
    <DialogContent style={{
        backgroundColor: '#F7F7F8'
      }}>
      <Text>Aún no hay ningún asistente. ¡Anímate y sé el primero!</Text>
    </DialogContent>
  </Dialog>)
}

const styles = StyleSheet.create({})

export default ListAssistans;
