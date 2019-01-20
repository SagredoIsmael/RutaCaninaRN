import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import moment from 'react-moment'
import AutoTypingText from 'react-native-auto-typing-text'
import { Akira } from 'react-native-textinput-effects'
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
Is
  state = {
    isTypingName: true,
    modalVisible: false,
    modalContent: <Text>Foo</Text>
  }

  setModalVisible(visible, params = null) {
    this.setState({
      modalVisible: visible,
      modalContent: params !== null ? params.renderScene(null) : <Text>Volver</Text> ,
      modalRight: params !== null ? params.renderRightButton(null) : <Text>Volver</Text> ,
      modalTitle: <Text>{params !== null ? params.getTitle() : 'Error al cargar'}</Text>
    })
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

  handleValueChange(values) {
    console.log('handleValueChange', values)
    this.setState({ form: values })
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
              <WalkthroughableView style={{marginTop:50, alignSelf:'center', width: '90%', position:'absolute'}}>
                <GiftedForm
                  formName='signupForm' // GiftedForm instances that use the same name will also share the same states
                  openModal={(params) => {
                    this.setModalVisible(true, params)
                  }}
                  onValueChange={this.handleValueChange.bind(this)}
                  closeModal={() => { this.setModalVisible(false) }}
                  clearOnClose={false}
                >

                <GiftedForm.TextInputWidget
                  name='name'
                  title='Nombre'
                  placeholder='Ruta por Cabo de Gata'
                  clearButtonMode='while-editing'
                />

                <GiftedForm.SeparatorWidget />
                <GiftedForm.SeparatorWidget />

                <GiftedForm.ModalWidget
                  title='Fecha de la ruta'
                  displayValue='Fecha de la ruta'
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
                  title='Duración aproximada'
                  displayValue='Duración aproximada'
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
                  displayValue='Descripción'
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
                  style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}
                  >
                 <View style={{marginTop: 22, height: 40, backgroundColor: '#ccc', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                     <View>
                      <TouchableHighlight onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                      }}>
                        <Text>Cancelar</Text>
                      </TouchableHighlight>
                     </View>
                     <Text>
                      {this.state.modalTitle}
                     </Text>
                     <View>
                      <TouchableHighlight onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                      }}>
                        <Text>Aceptar</Text>
                      </TouchableHighlight>
                     </View>
                   </View>
                  <View style={{flex: 1}}>
                    {this.state.modalContent}
                  </View>
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
