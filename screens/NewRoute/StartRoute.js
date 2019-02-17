import React from 'react';
import {connect} from 'react-redux'
import {Permissions, ImagePicker, Font, Constants} from "expo";
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import moment from 'moment'
import AutoTypingText from 'react-native-auto-typing-text'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import TooltipCopilot from '../../components/TooltipComponent/TooltipCopilot'
import {copilot, walkthroughable, CopilotStep} from '@okgrow/react-native-copilot'
import {GiftedForm, GiftedFormModal, GiftedFormManager} from 'react-native-gifted-form'
import {createRouter, NavigationProvider, StackNavigation, withNavigation} from '@expo/ex-navigation';
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
  TouchableHighlight
} from 'react-native'

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

const WalkthroughableView = walkthroughable(View)

@withNavigation
class StartRoute extends React.Component {

  state = {
    hasCameraPermission: false,
    isTypingName: true,
    modalVisible: false,
    date: 'Fecha',
    time: 'Hora',
    description: 'Descripción'
  }

  setModalVisible(visible, params = null) {
    this.setState({
      modalVisible: visible,
      modalContent: params !== null
        ? params.renderScene(null)
        : <Text>Volver</Text>
    })

    const {props} = this.state.modalContent;

    this.setState({
      modalTitle: <Text>{
            props !== null
              ? props.displayValue
              : 'Error al cargar'
          }</Text>
    })
  }

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    this.setState({
      hasCameraPermission: status === "granted"
    })
  }

  handleValueChange(values) {

    if (values.nameRoute != null) 
      this.props.dataNewRoute.title = values.nameRoute

    if (values.dateRoute != null) {
      const dateFormat = moment(values.dateRoute).format('DD-MM-YYYY')
      this.props.dataNewRoute.date = dateFormat
      this.setState({date: dateFormat})
    }

    if (values.timeRoute != null) {
      const timeFormat = moment(values.timeRoute).format('HH:mm')
      this.props.dataNewRoute.time = timeFormat
      this.setState({time: timeFormat})
    }

    if (values.descriptionRoute != null) {
      this.props.dataNewRoute.description = values.descriptionRoute
      this.setState({description: values.descriptionRoute})
    }

    if (values.duration != null) {
      this.props.dataNewRoute.duration = values.duration[0]
    }

    this.props.insert_dataNewRoute(this.props.dataNewRoute)
    this.setState({form: values})
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

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.props.dataNewRoute.photo = result.uri
      this.setState({photoStatus: "Foto cargada"})
    }
  }

  nowDate = () => {
    var today = new Date()
    date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes()
    return date
  }

  render() {
    if (this.props.currentPosition == 0) {
      return (<View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={{
              marginTop: 10,
              alignItems: 'center'
            }}>
            <AutoTypingText text={'¿Creamos una ruta? ¡Genial!'} charMovingTime={40} delay={0} style={{
                fontSize: 20,
                color: Colors.verdeOscuro
              }} onComplete={() => {
                this.setState({isTypingName: false})
              }}/>
          </View>
          {
            this.state.isTypingName
              ? (null)
              : (<CopilotStep text="Primero rellena el formulario con la info de la ruta" order={1} name="dateRoute">
                <WalkthroughableView style={{
                    marginTop: 70,
                    marginLeft: 10,
                    alignSelf: 'flex-start',
                    width: '85%',
                    height: '100%'
                  }}>
                  <GiftedForm formName='signupForm' openModal={(params) => {
                      this.setModalVisible(true, params)
                    }} scrollEnabled={false} onValueChange={(values) => this.handleValueChange(values)} closeModal={() => {
                      this.setModalVisible(false)
                    }} clearOnClose={false} validators={{
                      nameRoute: {
                        title: 'Nombre',
                        validate: [
                          {
                            validator: 'isLength',
                            arguments: [
                              1, 100
                            ],
                            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                          }
                        ]
                      },
                      photoRoute: {
                        title: 'Foto',
                        validate: [
                          {
                            validator: 'isLength',
                            arguments: [
                              1, 100
                            ],
                            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                          }
                        ]
                      }
                    }}>
                    <GiftedForm.TextInputWidget name='nameRoute' title='Nombre' value={this.props.dataNewRoute.title} image={require('../../assets/images/formIcon/nameRoute.png')} placeholder='Ruta por Cabo de Gata' clearButtonMode='while-editing'/>

                    <GiftedForm.SeparatorWidget/>

                    <GiftedForm.ModalWidget title={this.state.date} displayValue='Fecha' image={require('../../assets/images/formIcon/date.png')} scrollEnabled={false}>
                      <GiftedForm.SeparatorWidget/>

                      <GiftedForm.DatePickerIOSWidget name='dateRoute' mode='date' getDefaultDate={() => {
                          return new Date()
                        }} minimumDate={new Date()} style={{
                          height: '1000%'
                        }}/>
                    </GiftedForm.ModalWidget>

                    <GiftedForm.ModalWidget title={this.state.time} image={require('../../assets/images/formIcon/time.png')} displayValue='Hora' scrollEnabled={false}>
                      <GiftedForm.SeparatorWidget/>

                      <GiftedForm.DatePickerIOSWidget name='timeRoute' mode='time' getDefaultDate={() => {
                          return new Date()
                        }} style={{
                          height: '1000%'
                        }}/>
                    </GiftedForm.ModalWidget>

                    <GiftedForm.ModalWidget title='Duración aprox.' image={require('../../assets/images/formIcon/duration.png')} displayValue='Duración aprox.'>

                      <GiftedForm.SeparatorWidget/>

                      <GiftedForm.SelectWidget name='duration' title='Duración aproximada' multiple={false}>
                        <GiftedForm.OptionWidget title='1 hora' value='1 hora'/>
                        <GiftedForm.OptionWidget title='1 hora y media' value='1h y media'/>
                        <GiftedForm.OptionWidget title='2 horas' value='2 horas'/>
                        <GiftedForm.OptionWidget title='2 horas y media' value='2h y media'/>
                        <GiftedForm.OptionWidget title='3 horas' value='3 horas'/>
                        <GiftedForm.OptionWidget title='3 horas y media' value='3h y media'/>
                        <GiftedForm.OptionWidget title='4 horas' value='4 horas'/>
                        <GiftedForm.OptionWidget title='4 horas y media' value='4h y media'/>
                        <GiftedForm.OptionWidget title='Más de 5 horas..' value='5 horas'/>
                      </GiftedForm.SelectWidget>
                    </GiftedForm.ModalWidget>

                    <GiftedForm.SeparatorWidget/>

                    <GiftedForm.ModalWidget title={this.state.description} name='descriptionRoute' displayValue='Descripción' image={require('../../assets/images/formIcon/description.png')} scrollEnabled={true}>
                      <GiftedForm.SeparatorWidget/>

                      <GiftedForm.TextAreaWidget name='descriptionRoute' style={{
                          height: '300%',
                          width: '120%',
                          marginTop: 20,
                          paddingLeft: 70,
                          paddingRight: 70,
                          backgroundColor: 'white'
                        }} autoFocus={true} placeholder='Ejemplo: Realizaremos una ruta muy divertida por la montaña, es recomendable llevar calzado adecuado. Nos encontraremos con dos fuentes de agua por el camino para poder hidratar a nuestros canes. Existe una zona de 2 kms en la que podremos soltar a nuestros canes y que disfruten jugando. ¡Cualquier duda podemos hablarla por el chat de la ruta! Será genial, animaros!'/>
                    </GiftedForm.ModalWidget>

                    <GiftedForm.SeparatorWidget/>

                    <GiftedForm.RowValueWidget name='photoRoute' title='Foto de la ruta' value={this.state.photoStatus} image={require('../../assets/images/formIcon/photo.png')} placeholder='Selecciona foto' onPress={() => {
                        this._pickImage()
                      }}></GiftedForm.RowValueWidget>

                  </GiftedForm>

                  <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible} onRequestClose={() => {
                      alert("Modal has been closed.")
                    }} style={{
                      flex: 1
                    }}>
                    <View style={{
                        height: '100%',
                        justifyContent: 'center',
                        backgroundColor: Colors.whiteCrudo
                      }}>
                      <Text style={{
                          fontSize: 35,
                          color: Colors.pinkChicle,
                          marginTop: 30,
                          textAlignVertical: "center",
                          textAlign: "center"
                        }}>
                        {this.state.modalTitle}
                      </Text>
                      {this.state.modalContent}
                      <AwesomeButtonRick type="secondary" style={{
                          alignSelf: 'center',
                          marginTop: 50,
                          marginBottom: 40
                        }} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.background} onPress={value => this.setModalVisible(!this.state.modalVisible)}>
                        Aceptar
                      </AwesomeButtonRick>
                    </View>
                  </Modal>
                </WalkthroughableView>
              </CopilotStep>)
          }
          {
            this.state.isTypingName
              ? (null)
              : (<CopilotStep text="Por último, desliza hacia la siguiente pantalla" order={4} name="newScreenRoute">
                <WalkthroughableView style={{
                    height: screenHeight,
                    left: screenWidth - 40,
                    width: 40,
                    position: 'absolute'
                  }}/>
              </CopilotStep>)
          }
          <TouchableOpacity onPress={() => this.props.start()} ref={component => this.touchable = component}/>
        </ScrollView>
      </View>)
    }
    return (<View/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    borderTopWidth: 1,
    borderTopColor: Colors.pinkChicle
  }
})

const mapStateToProps = state => {
  return {dataNewRoute: state.dataNewRoute}
}

export default connect(mapStateToProps, actions)(copilot({tooltipComponent: TooltipCopilot, animated: true, overlay: 'svg'})(StartRoute))
