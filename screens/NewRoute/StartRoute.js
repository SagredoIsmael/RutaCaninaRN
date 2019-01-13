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
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  Alert,
} from 'react-native'

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

const WalkthroughableView = walkthroughable(View)

class StartRoute extends React.Component {

  state = {
    isTypingName: true,
  }

  static propTypes = {
    start: PropTypes.func.isRequired,
    copilotEvents: PropTypes.shape({
      on: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange)
    this.activateHelper()
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  activateHelper = () => {
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
      case 'description':
        this.props.dataNewRoute.description = value
        break;
      default:
        break;
    }
    this.props.insert_dataNewRoute(this.props.dataNewRoute)
  }

  render() {
    if (this.props.currentPosition == 0){
      return (
        <View style={styles.container}>
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
            <CopilotStep text="Primero introduce el día y la hora exacta de la ruta" order={1} name="dateRoute">
              <WalkthroughableView style={{marginTop:30, alignItems:'center', width: '90%'}}>
                <GiftedForm
                  formName='startForm'
                  openModal={(route) => {
                    navigator.push(route);
                  }}
                clearOnClose={false}
                >
                <GiftedForm.TextInputWidget
                name='nameRoute'
                title='Nombre de la ruta'
                placeholder='Ruta por la montaña de Montserrat'
                clearButtonMode='while-editing'
              />
              </GiftedForm>
              </WalkthroughableView>
            </CopilotStep>
          )
        }
          {this.state.isTypingName? (null) : (
            <CopilotStep text="Por último, desliza hacia la siguiente pantalla" order={4} name="newScreenRoute">
              <WalkthroughableView style={{height:screenHeight, left: screenWidth - 40, width:40, position: 'absolute'}}/>
            </CopilotStep>
            )
          }
          <TouchableOpacity onPress={() => this.props.start()} ref={component => this.touchable = component}/>
          </ScrollView>
        </View>
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
    borderColor: Colors.pinkChicle,
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
