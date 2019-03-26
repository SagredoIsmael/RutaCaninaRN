import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Picker
} from "react-native"
import Colors from "../../constants/Colors"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

class PickerModal extends React.Component {

  state = {
    services: [
      'one', 'two', 'three', 'four', 'five'
    ],
    pickerSelected: ""
  }

  _pressSelectPicker = () => {
    this.props.changeValueDate("time", this.state.PickerSelected)
    this.props.clickDismiss()
  }

  _buttonsDialogModal() {
    return (<View>
      <Button title="Seleccionar" color={Colors.verdeOscuro} align="center" onPress={() => this._pressSelectPicker()}/>
    </View>)
  }

  render() {
    let serviceItems = this.state.services.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s}/>
    });

    return (<Dialog onDismiss={() => {}} width={1} onTouchOutside={() => this.props.clickDismiss()} style={{
        backgroundColor: '#F7F7F8'
      }} visible={this.props.isOpenPickerModal} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} footer={this._buttonsDialogModal()}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>

        <Text style={{
            marginTop: 40,
            fontSize: 20,
            alignSelf: "center",

            color: Colors.verdeOscuro,
            marginLeft: -15
          }}>
          Hora de la ruta:
        </Text>
        <Picker selectedValue={this.state.language} style={{
            height: 200,
            width: 100,
            alignSelf: "center"
          }} onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})
}>
          {serviceItems}
        </Picker>
      </DialogContent>
    </Dialog>)
  }
}

export default PickerModal
