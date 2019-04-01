import React from "react";
import {StyleSheet, View, Text, Button, DatePickerIOS} from "react-native"
import Colors from "../../constants/Colors"
import moment from 'moment'
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

class TimePickerIosModal extends React.Component {

  state = {
    time: new Date()
  }

  _pressSelectPicker = () => {
    this.props.changeValueDate("time", moment(this.state.time).format('HH:mm'))
    this.props.clickDismiss()
  }

  _buttonsDialogModal() {
    return (<View>
      <Button title="Seleccionar" color={Colors.verdeOscuro} align="center" onPress={() => this._pressSelectPicker()}/>
    </View>)
  }

  _selectedTime = (time) => {
    this.setState({time: time})
  }

  render() {

    return (<Dialog onDismiss={() => {}} width={1} onTouchOutside={() => this.props.clickDismiss()} style={{
        backgroundColor: '#F7F7F8'
      }} visible={this.props.isOpenTimePickerIosModal} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} footer={this._buttonsDialogModal()}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>

        <Text style={{
            marginTop: 5,
            fontSize: 20,
            alignSelf: "center",

            color: Colors.verdeOscuro,
            marginLeft: -15
          }}>
          Hora de la ruta
        </Text>
        <DatePickerIOS date={this.state.time} mode={'time'} onDateChange={(time) => this._selectedTime(time)}/>
      </DialogContent>
    </Dialog>)
  }
}

export default TimePickerIosModal
