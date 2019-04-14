import React from "react";
import {StyleSheet, View, Text, Button, DatePickerIOS} from "react-native"
import Colors from "../../constants/Colors"
import moment from 'moment'
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'


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
      <AwesomeButtonRick type="secondary" style={{
            alignSelf: 'center',
            marginTop: 0,
            marginBottom: 5
          }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => this._pressSelectPicker()}>
          Seleccionar
      </AwesomeButtonRick>
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
