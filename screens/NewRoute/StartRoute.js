import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import moment from 'react-moment'
import AutoTypingText from 'react-native-auto-typing-text'
import { Akira } from 'react-native-textinput-effects'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import DatePickerD from 'react-native-datepicker'
import TooltipCopilot from '../../components/TooltipComponent/TooltipCopilot'
import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot'
import { GiftedForm, GiftedFormModal, GiftedFormManager } from 'react-native-gifted-form'
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  withNavigation
} from '@expo/ex-navigation';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native'

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

const WalkthroughableView = walkthroughable(View)

@withNavigation
class StartRoute extends React.Component {

  state = {
    isTypingName: true,
    modalVisible:false,
    jeje: 'jeje'
  }

  setModalVisible(visible, params = null) {
    this.setState({
      modalVisible: visible,
      modalContent: params !== null ? params.renderScene(null) : <Text>Volver</Text> ,
      modalRight: params !== null ? params.renderRightButton(null) : <Text>Volver</Text> ,
      modalTitle: <Text>{params !== null ? params.getTitle() : 'Error al cargar'}</Text>
    })
  }

  handleValueChange(values) {
    if (values.date != null) this.setState({ jeje: 'oooo' })
    console.log('handleValueChange', values)
    this.setState({ form: values })
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
            <CopilotStep text="Primero rellena el formulario con la info de la ruta" order={1} name="dateRoute">
              <WalkthroughableView style={{marginTop:70, marginLeft:10, alignSelf:'flex-start', width: '85%', position:'absolute'}}>
                <GiftedForm
                  formName='signupForm'
                  openModal={(params) => {
                    this.setModalVisible(true, params)
                  }}
                  scrollEnabled={false}
                  onValueChange={this.handleValueChange.bind(this)}
                  closeModal={() => { this.setModalVisible(false) }}
                  clearOnClose={false}
                  validators={{
                    nameRoute: {
                      title: 'Nombre',
                      validate: [{
                        validator: 'isLength',
                        arguments: [1, 100],
                        message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                      }]
                    },


                    description: {
                      title: 'description',
                      validate: [{
                        validator: 'isLength',
                        arguments: [1, 3000],
                        message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                      }]
                    },
                    date: {
                      title: 'Fecha',
                      validate: [{
                        validator: 'isLength',
                        arguments: [2],
                        message: '{TITLE} is required'
                      }]
                    },
                  }}
                >
                <GiftedForm.TextInputWidget
                  name='nameRoute'
                  title='Nombre'
                  image={require('../../assets/images/formIcon/nameRoute.png')}
                  placeholder='Ruta por Cabo de Gata'
                  clearButtonMode='while-editing'
                />

                <GiftedForm.SeparatorWidget />
                <GiftedForm.SeparatorWidget />

                <GiftedForm.ModalWidget
                  title= {this.state.jeje}
                  displayValue= 'date'
                  image={require('../../assets/images/formIcon/date.png')}
                  scrollEnabled={false}
                >
                <GiftedForm.SeparatorWidget/>

                  <GiftedForm.DatePickerIOSWidget
                    name='date'
                    mode='date'
                    getDefaultDate={() => {
                      return new Date()
                    }}
                  />
                </GiftedForm.ModalWidget>

                <GiftedForm.ModalWidget
                  title='Hora'
                  image={require('../../assets/images/formIcon/time.png')}
                  displayValue='timeDate'
                  scrollEnabled={false}
                >
                <GiftedForm.SeparatorWidget/>

                  <GiftedForm.DatePickerIOSWidget
                    name='timeDate'
                    mode='time'
                    getDefaultDate={() => {
                      return new Date()
                    }}
                  />
                </GiftedForm.ModalWidget>

                <GiftedForm.ModalWidget
                  title='Duración aproximada'
                  image={require('../../assets/images/formIcon/duration.png')}
                  displayValue='duration'
                >

                <GiftedForm.SeparatorWidget />

                  <GiftedForm.SelectWidget name='duration' title='Duración aproximada' multiple={false}>
                    <GiftedForm.OptionWidget  title='1 hora' value='1'/>
                    <GiftedForm.OptionWidget  title='2 horas' value='2'/>
                    <GiftedForm.OptionWidget  title='3 horas' value='3'/>
                    <GiftedForm.OptionWidget  title='4 horas' value='4'/>
                    <GiftedForm.OptionWidget  title='Más de 5 horas..' value='5'/>
                  </GiftedForm.SelectWidget>
                </GiftedForm.ModalWidget>

                <GiftedForm.SeparatorWidget />
                <GiftedForm.SeparatorWidget />

                <GiftedForm.ModalWidget
                  title='Descripción'
                  displayValue='description'
                  image={require('../../assets/images/formIcon/description.png')}
                  scrollEnabled={true}
                >
                  <GiftedForm.SeparatorWidget/>

                  <GiftedForm.TextAreaWidget
                    name='description'
                    autoFocus={true}
                    placeholder='Ejemplo: Realizaremos una ruta muy divertida por la montaña, es recomendable llevar calzado adecuado. Nos encontraremos con dos fuentes de agua por el camino para poder hidratar a nuestros canes. Existe una zona de 2 kms en la que podremos soltar a nuestros canes y que disfruten jugando. ¡Cualquier duda podemos hablarla por el chat de la ruta! Será genial, animaros!'

                  />
                </GiftedForm.ModalWidget>

              </GiftedForm>

              <Modal
                  animationType={"slide"}
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                  style={{flex: 1, justifyContent: 'center', backgroundColor: Colors.pinkChicle}}
                  >
                  <Text>
                   {this.state.modalTitle}
                  </Text>
                  <View style={{flex: 1}}>
                    {this.state.modalContent}
                  </View>
                  <AwesomeButtonRick type="secondary"
                     style={{alignSelf:'center', marginTop:50, marginBottom:40}}
                     borderColor={Colors.pinkChicle}
                     raiseLevel={2}
                     textColor={Colors.pinkChicle}
                     backgroundDarker={Colors.pinkChicle}
                     backgroundShadow={Colors.pinkChicle}
                     backgroundActive={Colors.whiteCrudo}
                     onPress={value => this.setModalVisible(!this.state.modalVisible)}>
                      Aceptar
                    </AwesomeButtonRick>
                </Modal>
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
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    minHeight: 40,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  form: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
})

const formStyles = {
  fieldContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fieldText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
}


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
