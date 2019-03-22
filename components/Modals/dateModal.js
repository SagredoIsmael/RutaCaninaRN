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
  TouchableHighlight,
  Button,
  Platform
} from "react-native"
import {connect} from "react-redux"
import * as actions from "../../actions"
import Colors from "../../constants/Colors"
import moment from 'moment'
import {Calendar, LocaleConfig} from 'react-native-calendars'
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.'
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ],
  dayNamesShort: [
    'Dom.',
    'Lun.',
    'Mar.',
    'Mie.',
    'Juev.',
    'Vie.',
    'Sab.'
  ]
};

LocaleConfig.defaultLocale = 'es';

class dateModal extends React.Component {

  state = {
    dateSelected: moment(new Date()).format('YYYY-MM-DD')
  }

  _pressSelectDate = () => {
    this.props.changeValueDate("date", this.state.dateSelected)
    this.props.clickDismiss()
  }

  _buttonsDialogModal() {
    return (<View>
      <Button title="Seleccionar" color={Colors.verdeOscuro} align="center" onPress={() => this._pressSelectDate()}/>
    </View>)
  }

  render() {
    var esLocale = require('moment/locale/es')
    moment.locale('es', esLocale)
    var date = moment(this.state.dateSelected, 'YYYY-MM-DD')

    return (<Dialog onDismiss={() => {}} width={1} onTouchOutside={() => this.props.clickDismiss()} style={{
        backgroundColor: '#F7F7F8'
      }} visible={this.props.isOpenDateModal} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} footer={this._buttonsDialogModal()}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>

        <Calendar current={new Date(date)} minDate={new Date()} onDayPress={(day) => {
            this.setState({dateSelected: day["dateString"]})
          }}/>
        <Text style={{
            marginTop: 40,
            fontSize: 20,
            alignSelf: "center",

            color: Colors.verdeOscuro,
            marginLeft: -15
          }}>
          Fecha de la ruta:
        </Text>
        <Text style={{
            marginTop: 10,
            fontSize: 20,
            alignSelf: "center",
            color: Colors.verdeOscuro,
            marginLeft: -15
          }}>
          {moment(this.state.dateSelected, 'YYYY-MM-DD').format("dddd DD MMM")}

        </Text>
      </DialogContent>
    </Dialog>)
  }
}
const styles = StyleSheet.create({});
const mapStateToProps = state => {
  return {scrollPositionList: state.scrollPositionList};
};

export default connect(mapStateToProps, actions)(dateModal);
