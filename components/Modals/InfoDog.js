import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Image,
  ImageBackground,
  ScrollView
} from "react-native"
import Colors from "../../constants/Colors"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

const InfoDogs = ({
  isOpenInfoDog,
  avatar,
  name,
  gender,
  age,
  breed,
  conduct,
  temperament
}) => {
  return (<Dialog onDismiss={() => {
      console.log('click on dismiss');
    }} width={0.9} visible={isOpenInfoDog} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} dialogTitle={<DialogTitle
    onTouchOutside = {
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
      <ScrollView>
        <ImageBackground source={require("../../assets/images/background.png")} style={{
            width: "100%"
          }}>
          <Image style={styles.avatarDogs} source={{
              uri: avatar
            }}/>
          <Text style={{
              fontFamily: "bold",
              fontSize: 20,
              color: "rgba(98,93,144,1)",
              marginTop: 5,
              textAlign: "center"
            }}>
            {
              "¡Hola soy " + {
                name
              } + "!"
            }
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
            {
              "Soy " + {
                gender
              } + " de " + {
                age
              } + " años y mis padres dicen que parezco " + {
                breed
              } + ", aunque yo me veo más chic."
            }
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
            {
              "Me considero " + {
                conduct
              } + ", a la vez que " + {
                temperament
              } + ". ¡Tendrías que conocerme!"
            }
          </Text>
        </ImageBackground>
      </ScrollView>
    </DialogContent>
  </Dialog>)
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
