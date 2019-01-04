import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import moment from 'react-moment'
import AutoTypingText from 'react-native-auto-typing-text'
import { Akira } from 'react-native-textinput-effects'
import DatePicker from 'react-native-datepicker'
import TooltipCopilot from '../../components/TooltipComponent/TooltipCopilot'
import PropTypes from 'prop-types'
import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native'

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

const WalkthroughableText = walkthroughable(Text)
const WalkthroughableView = walkthroughable(View)

class StartRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    isTypingName: true,
    secondStepActive: true,
  }

  static propTypes = {
    start: PropTypes.func.isRequired,
    copilotEvents: PropTypes.shape({
      on: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange)
    this.props.start()
    this.touchable.props.onPress()
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
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
        <ScrollView style={styles.container}>
          <View style={{marginTop:10, alignItems:'center'}}>
            <AutoTypingText
              text={'¿Creamos una ruta? ¡Genial!'}
              charMovingTime={40}
              delay={0}
              style={{
                fontSize: 20,
                color: Colors.verdeOscuro,
              }}
              onComplete={() => { this.setState({ isTypingName: false }) }}
            />
        </View>
        {this.state.isTypingName? (null) : (
          <CopilotStep text="Por último, desliza hacia la siguiente pantalla" order={4} name="newScreenRoute">
            <WalkthroughableView style={{height:20, top: screenHeight/3, left:screenWidth -50}}/>
          </CopilotStep>
        )
      }
        {this.state.isTypingName? (null) : (
          <CopilotStep text="Primero introduce el día y la hora exacta de la ruta" order={1} name="dateRoute">
            <WalkthroughableView style={{marginTop:50, alignItems:'center'}}>
              <DatePicker
                style={{width: '80%'}}
                mode="datetime"
                date={this.state.dateSelect}
                placeholder='Selecciona día y hora'
                borderColor={Colors.naranjaStrange}
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
            </WalkthroughableView>
          </CopilotStep>
        )
      }
      {this.state.isTypingName? (null) : (
         <CopilotStep text="A continuación introduce el nombre de la ruta" order={2} name="nameRoute">
             <WalkthroughableView style={{marginTop:50, alignItems:'center'}}>
               <Akira
                 style={{width: '80%',}}
                 label={'Nombre de la ruta'}
                 value={this.props.dataNewRoute.name}
                 onChangeText={(text) => { this.changeValueNewRoute('name', text) }}
                 borderColor={Colors.naranjaStrange}
                 labelStyle={Colors.naranjaStrange}
               />
             </WalkthroughableView>
           </CopilotStep>
         )
       }
       {this.state.isTypingName? (null) : (
          <CopilotStep text="Escribe una amplia descripción de la ruta" order={3} name="descriptionRoute">
              <WalkthroughableView style={{marginTop:60, alignItems:'center'}}>
                <TextInput
                   multiline = {true}
                   style={styles.textInput}
                   onChangeText={(text) => this.setState({text})}
                   value='hola que tal'
                   autoCapitalize='true'
                 />
              </WalkthroughableView>
            </CopilotStep>
          )
        }
        <TouchableOpacity onPress={() => this.props.start()} ref={component => this.touchable = component}/>
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
      flex: 1,
  },
  textInput:{
    backgroundColor: Colors.whiteCrudo,
    width:'80%',
    borderColor: Colors.naranjaStrange,
    borderWidth: 6,
  }
})


const mapStateToProps = state => {
  return {
    dataNewRoute : state.dataNewRoute,
  }
}

export default connect(mapStateToProps, actions)(copilot({
  tooltipComponent: TooltipCopilot,
  animated: true,
  overlay: 'svg',
})(StartRoute))
