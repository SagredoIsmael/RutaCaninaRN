import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import moment from 'react-moment'
import AutoTypingText from 'react-native-auto-typing-text'
import { Akira } from 'react-native-textinput-effects'
import DatePicker from 'react-native-datepicker'
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

class StartRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    isTypingName: true,
    isTypingDate: true,
  }

  nowDate = () => {
    var today = new Date()
    date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes()
    return date
  }

  changeValueNewRoute = (type, value) => {
    switch (type) {
      case 'name':
        this.props.dataNewRoute.name = value
        break;
      case 'date':
        this.props.dataNewRoute.date = value
        this.setState({ dateSelect: value })
        break;
      default:
        break;
    }
    this.props.insert_dataNewRoute(this.props.dataNewRoute)
  }

  render() {
    if (this.props.currentPosition == 0){
      return (
        <ScrollView>
          <AutoTypingText
            text={'¿Te animas a crear una ruta? ¡Genial! \nEmpecemos dándole un nombre'}
            charMovingTime={40}
            delay={0}
            style={{
              position: 'absolute',
              width: '80%',
              fontSize: 20,
              color: Colors.verdeOscuro,
              margin: 20,
              marginTop: 20,
            }}
            onComplete={() => { this.setState({ isTypingName: false }) }}
          />
        {this.state.isTypingName? (null) : (
          <View style={styles.container}>
            <Akira
              label={'Nombre de la ruta'}
              value={this.props.dataNewRoute.name}
              onChangeText={(text) => { this.changeValueNewRoute('name', text) }}
              style={{fontSize: 20, width: '80%', marginTop: 150, marginLeft: 20, marginRight: 20}}
              borderColor={'#db786d'}
              labelStyle={'#db786d'}
            />
          </View>
        )}
        {this.state.isTypingName? (null) : (
          <AutoTypingText
            text={'Después indica el día y la hora del inicio de la ruta'}
            charMovingTime={40}
            delay={0}
            style={{
              position: 'absolute',
              width: '80%',
              fontSize: 20,
              color: Colors.verdeOscuro,
              margin: 20,
              marginTop: 70,
            }}
            onComplete={() => { this.setState({ isTypingDate: false }) }}
          />
        )}
        {this.state.isTypingDate? null : (
          <View style={styles.container}>
            <DatePicker
              style={styles.datePicker}
              mode="datetime"
              date={this.state.dateSelect}
              placeholder='Selecciona día y hora'
              format="DD-MM-YYYY HH:mm"
              minDate={this.nowDate()}
              confirmBtnText="Aceptar"
              cancelBtnText="Cancelar"
              is24Hour={true}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => { this.changeValueNewRoute('date', date)}}
            />
          </View>
        )}
        </ScrollView>
      )
    }
    return (
      <View/>
    )
  }
}


const styles = StyleSheet.create({
  container: {
      height: '100%',
      flex: 1,
      alignItems: 'center',
  },
  datePicker:{
    height: '100%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 150,
    marginBottom: 100,
    width: '80%',
  },
})


const mapStateToProps = state => {
  return {
    dataNewRoute : state.dataNewRoute,
  }
}

export default connect(mapStateToProps, actions)(StartRoute)
