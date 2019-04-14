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
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import Colors from "../../constants/Colors"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

const InfoDogModal = ({isOpenInfoDog, dogSelect, clickDismiss}) => {
  if (dogSelect != null) {
    return (<Dialog onDismiss={() => {}} width={0.8} style={{
        backgroundColor: '#F7F7F8'
      }} visible={isOpenInfoDog} actionsBordered="actionsBordered" onTouchOutside={() => clickDismiss()} dialogAnimation={new ScaleAnimation()}
      footer={
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
        <ScrollView>
          <ImageBackground source={require("../../assets/images/background.png")} style={{
              width: "100%"
            }}>

            <Image style={styles.avatarDogs} source={dogSelect.avatar
                ? {
                  uri: dogSelect.avatar
                }
                : {
                  uri: 'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FavatarDog.png?alt=media&token=821fdff6-ad3d-4547-b7cf-2dd21230f0df'
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

export default InfoDogModal;
