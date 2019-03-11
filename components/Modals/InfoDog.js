import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Button
} from "react-native"
import Colors from "../../constants/Colors"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

const InfoDogs = ({isOpenInfoDog, dogSelect, clickDismiss}) => {
  if (dogSelect != null) {
    return (<Dialog onDismiss={() => {}} width={0.8} style={{
        backgroundColor: '#F7F7F8'
      }} visible={isOpenInfoDog} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} footer={<View> < Button title = "Cerrar" color = {
        Colors.verdeOscuro
      }
      align = "center" onPress = {
        () => clickDismiss()
      } /> < /View>}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>
        <ScrollView>
          <ImageBackground source={require("../../assets/images/background.png")} style={{
              width: "100%"
            }}>
            <Image style={styles.avatarDogs} source={{
                uri: dogSelect.avatar
              }}/>
            <Text style={{
                fontFamily: "bold",
                fontSize: 20,
                color: "rgba(98,93,144,1)",
                marginTop: 5,
                textAlign: "center"
              }}>
              {"¡Hola soy " + dogSelect.name + "!"}
            </Text>
            <Text style={{
                fontFamily: "regular",
                fontSize: 15,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                textAlign: "center",
                color: "gray"
              }}>
              {"Soy " + dogSelect.gender + " de " + dogSelect.age + " años y mis padres dicen que parezco " + dogSelect.breed + ", aunque yo me veo más chic."}
            </Text>
            <Text style={{
                fontFamily: "regular",
                fontSize: 15,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                textAlign: "center",
                color: "gray"
              }}>
              {"Me considero " + dogSelect.conduct + ", a la vez que " + dogSelect.temperament + ". ¡Tendrías que conocerme!"}
            </Text>
          </ImageBackground>
        </ScrollView>
      </DialogContent>
    </Dialog>)
  }
  return <View></View>
}

const styles = StyleSheet.create({
  avatarDogs: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: Colors.verdeOscuro,
    marginTop: 10,
    alignSelf: "center",
    position: "relative"
  }
});

export default InfoDogs;
