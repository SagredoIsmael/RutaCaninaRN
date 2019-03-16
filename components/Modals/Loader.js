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

const icons = [require("../../assets/images/loader/dog.png"), require("../../assets/images/loader/bone.png"), require("../../assets/images/loader/paws.png"), require("../../assets/images/loader/toys.png")];
const Loader = ({loading}) => {
  return (<Dialog onDismiss={() => {}} width={0.8} style={{
      backgroundColor: '#F7F7F8'
    }} visible={loading} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()}>
    <DialogContent style={{
        backgroundColor: '#F7F7F8'
      }}>
      <View>
        <ImageBackground source={require("../../assets/images/background.png")} style={{
            width: "100%"
          }}>
          <Text style={styles.text}>
            Cargando..
          </Text>
          <Image style={styles.image} source={icons[Math.floor(Math.random() * 3) + 1]} resizeMode="contain"/>
          <ActivityIndicator animating={loading} color={Colors.verdeOscuro} size={"large"}/>
        </ImageBackground>
      </View>
    </DialogContent>
  </Dialog>)
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
    width: 40,
    paddingVertical: 20,
    alignSelf: "center"
  },
  text: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
    paddingVertical: 20,
    fontWeight: "bold",
    fontSize: 16
  }
});

export default Loader;
