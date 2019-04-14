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
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import Fire from "../../api/Fire"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

const ListAssistansModal = ({isOpenListAssistans, clickDismiss, nav, assistants, myKeyUser}) => {

  if (assistants != null && assistants.length > 0) {
    return (<Dialog onDismiss={() => {
        console.log('click on dismiss');
      }} width={0.9} visible={isOpenListAssistans} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} onTouchOutside={() => clickDismiss()} dialogTitle={<DialogTitle
      title = "Asistentes"
      style = {{
                  backgroundColor: '#F7F7F8',
                }}
      hasTitleBar = {
        false
      }
      align = "center"
      />} footer={
        <AwesomeButtonRick type="secondary" style={{
            alignSelf: 'center',
            marginTop: 0,
            marginBottom: 5
          }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => clickDismiss()}>
          Cerrar
      </AwesomeButtonRick>}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>
        <ImageBackground source={require("../../assets/images/background.png")} style={{
            width: "100%"
          }}>

          <FlatList data={assistants} renderItem={({item}) => <ItemUser keyCreator={item.key} nameCreator={item.name} imageCreator={item.image} myKeyUser={myKeyUser} nav={nav} dismissModal={clickDismiss}/>}/>

        </ImageBackground>
      </DialogContent>
    </Dialog>)
  }
  return (<Dialog onDismiss={() => {
      console.log('click on dismiss');
    }} width={0.9} visible={isOpenListAssistans} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} onTouchOutside={() => clickDismiss()} dialogTitle={<DialogTitle
    title = "Asistentes"
    style = {{
                backgroundColor: '#F7F7F8',
              }}
    hasTitleBar = {
      false
    }
    align = "center"
    />} footer={
      <AwesomeButtonRick type="secondary" style={{
        alignSelf: 'center',
        marginTop: 0,
        marginBottom: 5
      }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => clickDismiss()}>
      Cerrar
      </AwesomeButtonRick>
    }>
    <DialogContent style={{
        backgroundColor: '#F7F7F8'
      }}>
      <ImageBackground source={require("../../assets/images/background.png")} style={{
          width: "100%"
        }}>
        <Text>
          Aún no hay ningún asistente. ¡Anímate y sé el primero!
        </Text>
      </ImageBackground>
    </DialogContent>
  </Dialog>)
}

const styles = StyleSheet.create({})

export default ListAssistansModal;
