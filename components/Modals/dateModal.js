import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
} from "react-native"
import Colors from "../../constants/Colors"
import moment from 'moment'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
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

class DateModal extends React.Component {

  state = {
    dateSelected: moment(new Date()).format('YYYY-MM-DD')
  }

  _pressSelectDate = () => {
    this.props.changeValueDate("date", this.state.dateSelected)
    this.props.clickDismiss()
  }

  _buttonsDialogModal() {
    return (<View>
      <AwesomeButtonRick type="secondary" style={{
            alignSelf: 'center',
            marginTop: 0,
            marginBottom: 15
          }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => this._pressSelectDate()}>
          Seleccionar
      </AwesomeButtonRick>

    </View>)
  }

  render() {
    var esLocale = require('moment/locale/es')
    moment.locale('es', esLocale)
    var date = moment(this.state.dateSelected, 'YYYY-MM-DD')

    return (<Dialog onDismiss={() => {}} width={1} onTouchOutside={() => this.props.clickDismiss()} style={{
        backgroundColor: '#F7F7F8'
      }} visible={this.props.isOpenDateModal} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()}
      footer={this._buttonsDialogModal()}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>
        <Calendar current={new Date(date)} minDate={new Date()} onDayPress={(day) => {
            this.setState({dateSelected: day["dateString"]})
          }}/>
        <Text style={{
            marginTop: 10,
            fontSize: 20,
            alignSelf: "center",
            color: Colors.pinkChicle,
            marginLeft: -15
          }}>
          {moment(this.state.dateSelected, 'YYYY-MM-DD').format("dddd DD MMM")}
        </Text>

      </DialogContent>
    </Dialog>)
  }
}

export default DateModal
