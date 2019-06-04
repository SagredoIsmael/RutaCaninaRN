import React from 'react';
import {connect} from 'react-redux'
import {Permissions, ImagePicker, Font, Constants} from "expo";
import {setEditingRoute} from '../../actions/routesActions'
import Colors from '../../constants/Colors'
import moment from 'moment'
import AutoTypingText from 'react-native-auto-typing-text'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import TooltipCopilot from '../../components/TooltipComponent/TooltipCopilot'
import {copilot, walkthroughable, CopilotStep} from '@okgrow/react-native-copilot'
import {createRouter, NavigationProvider, StackNavigation, withNavigation} from '@expo/ex-navigation'
import {Fumi} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import DateModal from '../../components/Modals/dateModal'
import TimePickerIosModal from '../../components/Modals/TimePickerIosModal'
import TextInputModal from '../../components/Modals/TextInputModal'
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
  TimePickerAndroid,
  Platform
} from 'react-native'

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

const WalkthroughableView = walkthroughable(View)

@withNavigation
class StartRoute extends React.Component {

  state = {
    isIOS: false,
    time: "12:30",
    hasCameraPermission: false,
    isTypingName: true,
    modalVisible: false,
    isOpenTimePickerIosModal: false,
    isOpenDateModal: false,
    isOpenDescriptionModal: false
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

    if (Platform.OS === 'ios')
      this.setState({isIOS: true})
  }

  changeValueFromComponent = (type, value) => {
    this.handleValueChange(type, value)
  }

  handleValueChange = (type, value) => {

    switch (type) {
      case "name":
        this.props.dataNewRoute.title = value
        break;

      case "date":
        const dateFormat = moment(value).format('YYYY-MM-DD')
        this.props.dataNewRoute.date = dateFormat
        this.setState({
          date: moment(dateFormat, 'YYYY-MM-DD').format("dddd DD MMM")
        })
        break;

      case "time":
        this.props.dataNewRoute.time = value
        this.setState({time: value})
        break;

      case "description":
        this.props.dataNewRoute.description = value
        this.setState({description: value})
        break;

      case "duration":
        this.props.dataNewRoute.duration = value[0]
        this.setState({duration: value})
        break;
    }
    this.props.setEditingRoute(this.props.dataNewRoute)
  }

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange)
    this.props.onRef(this)
    if (this.props.dataNewRoute.isEditing) this.setState({isTypingName: false, photoStatus: "Foto cargada", description: this.props.dataNewRoute.description})
    console.log('eeeekillo', this.props.dataNewRoute)
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

  _timePickerAndroid = async () => {

    const {action, hour, minute} = await TimePickerAndroid.open({
      hour: parseFloat(this.state.time.substring(0, 2)),
      minute: parseFloat(this.state.time.substring(3, 5)),
      is24Hour: true
    });

    if (action === TimePickerAndroid.timeSetAction) {
      var min = minute
      if (min == "0")
        min = "00"
      var time = hour + ":" + min

      this.handleValueChange("time", time)
    }
    if (action === TimePickerAndroid.dismissedAction) {
      console.log("Dismissed");
    }
  }

  _pressDismissModals = () => {
    this.setState({isOpenDateModal: false, isOpenTimePickerIosModal: false, isOpenDescriptionModal: false})
  }

  render() {
    if (this.props.currentPosition == 0) {
      return (<View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={{
              alignItems: 'center'
            }}>
            {!this.props.dataNewRoute.isEditing?
              <AutoTypingText text={'¿Creamos una ruta? ¡Genial!'} charMovingTime={40} delay={0} style={{
                fontSize: 20,
                color: Colors.verdeOscuro
              }} onComplete={() => {
                this.setState({isTypingName: false})
              }}/>
              :
              null
            }

          </View>
          {
            this.state.isTypingName
              ? (null)
              : (<CopilotStep text="Primero rellena el formulario con la info de la ruta" order={1} name="dateRoute">
                <WalkthroughableView style={{
                    marginTop: 10,
                    marginLeft: 10,
                    alignSelf: 'flex-start',
                    width: '85%',
                    height: '85%'
                  }}>

                  <Fumi label={'Nombre de la ruta'} style={{
                      marginTop: 5
                    }} iconClass={MaterialCommunityIcons} iconName={'routes'} iconColor={Colors.pinkChicle} onChangeText={(text) => {
                      this.handleValueChange('name', text)
                    }} value={this.props.dataNewRoute.title} iconSize={20} iconWidth={40} inputPadding={16}/>

                  <TouchableOpacity onPress={() => this.setState({isOpenDateModal: true})}>
                    <View pointerEvents='none'>
                      <Fumi label={'Fecha de la ruta'} style={{
                          marginTop: 5
                        }} iconClass={MaterialCommunityIcons} iconName={'calendar-today'} iconColor={Colors.pinkChicle} value={this.state.date} iconSize={20} iconWidth={40} inputPadding={16}/>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={async () => {
                      this.state.isIOS
                        ? (this.setState({isOpenTimePickerIosModal: true}))
                        : (this._timePickerAndroid())
                    }}>
                    <View pointerEvents='none'>
                      <Fumi label={'Hora de la ruta'} style={{
                          marginTop: 5
                        }} iconClass={Ionicons} iconName={'md-time'} iconColor={Colors.pinkChicle} value={this.props.dataNewRoute.time} iconSize={20} iconWidth={40} inputPadding={16}/>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.setState({isOpenDescriptionModal: true})}>
                    <View pointerEvents='none'>
                      <Fumi label={'Descripción'} style={{
                          marginTop: 5
                        }} iconClass={SimpleLineIcons} iconName={'note'} iconColor={Colors.pinkChicle} value={this.state.description} iconSize={20} iconWidth={40} inputPadding={16}/>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this._pickImage()}>
                    <View pointerEvents='none'>
                      <Fumi label={'Foto de la ruta'} style={{
                          marginTop: 5
                        }} iconClass={FontAwesomeIcon} iconName={'photo'} iconColor={Colors.pinkChicle} value={this.state.photoStatus} iconSize={20} iconWidth={40} inputPadding={16}/>
                    </View>
                  </TouchableOpacity>

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
        <DateModal isOpenDateModal={this.state.isOpenDateModal} clickDismiss={this._pressDismissModals} changeValueDate={this.changeValueFromComponent}/>
        <TimePickerIosModal isOpenTimePickerIosModal={this.state.isOpenTimePickerIosModal} clickDismiss={this._pressDismissModals} changeValueDate={this.changeValueFromComponent}/>
        <TextInputModal isOpenDescriptionModal={this.state.isOpenDescriptionModal} clickDismiss={this._pressDismissModals} changeValueDate={this.changeValueFromComponent}/>
      </View>)
    }
    return (<View/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30
  },
  form: {
    borderTopWidth: 1,
    borderTopColor: Colors.pinkChicle
  }
})

const mapDispatchToProps = dispatch => {
  return {
    setEditingRoute: (route) => {
      dispatch(setEditingRoute(route))
    }
  }
}

const mapStateToProps = state => {
  return {dataNewRoute: state.dataNewRoute}
}

export default connect(mapStateToProps, mapDispatchToProps)(copilot({tooltipComponent: TooltipCopilot, animated: true, overlay: 'svg'})(StartRoute))
