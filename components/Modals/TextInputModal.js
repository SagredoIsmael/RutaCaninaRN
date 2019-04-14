import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TextInput,
  Dimensions,
} from "react-native"
import Colors from "../../constants/Colors"
import { Keyboard } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

const SCREEN_HEIGHT = Dimensions.get("window").height;


class TextInputModal extends React.Component {

  state = {
  }

  _pressSelectPicker = () => {
    this.props.changeValueDate("description", this.state.text)
    this.props.clickDismiss()
  }

  _buttonsDialogModal() {
    return (<View>
      <AwesomeButtonRick type="secondary" style={{
            alignSelf: 'center',
            marginTop: 0,
            marginBottom: 15
          }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => this._pressSelectPicker()}>
          Aceptar
      </AwesomeButtonRick>
    </View>)
  }

  _writedText = (text) => {
    this.setState({text: text})
  }


  render() {

    return (<Dialog onDismiss={() => {}} width={1} onTouchOutside={() => Keyboard.dismiss()} style={{
        backgroundColor: '#F7F7F8',

      }} dialogStyle={{ position: 'absolute', top: 10 }}

 visible={this.props.isOpenDescriptionModal} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} footer={this._buttonsDialogModal()}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>

        <Text style={{
            marginTop: 5,
            fontSize: 20,
            alignSelf: "center",
            marginBottom: 15,
            color: Colors.verdeOscuro,
            marginLeft: -15
          }}>
          Descripción de la ruta
        </Text>

        <ScrollView>

          <TextInput
          style={{borderColor: Colors.pinkChicle, fontSize: 16, borderWidth: 0.6, padding:10, marginBottom:10, height:SCREEN_HEIGHT/3}}
          onChangeText={(text) => this._writedText(text)}
          maxLength = {1000}
          multiline={true}
          onSubmitEditing={()=>Keyboard.dismiss()}
          placeholder= {"Ejemplo: Realizaremos una ruta muy divertida por la montaña, con una duración aprox. de 2 horas. Existe una zona donde podremos soltar a nuestros canes y que disfruten jugando. ¡Estamos en contacto por el chat de la ruta! Será genial, animaros!"}
          value={this.state.text}
          returnKeyType="done"
          autoFocus={true}
          autoCapitalize="sentences"
          autoCorrect={true}
        />

      </ScrollView>
      </DialogContent>
    </Dialog>)
  }
}

export default TextInputModal
