import React from 'react'
import Colors from '../../constants/Colors'
import StepIndicator from 'react-native-step-indicator'
import * as actions from '../../actions'
import Swiper from 'react-native-swiper'
import StartRoute from './StartRoute'
import MapRoute from './MapRoute'
import EndRoute from './EndRoute'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'

import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground
} from 'react-native'

class NewRouteScreen extends React.Component {

  static ourself = null;

  constructor() {
    super();
    ourself = this;
    this.state = {
      currentPosition: 0
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Nueva ruta',
      headerTitleStyle: {
        color: Colors.verdeOscuro,
        fontSize: 28
      },
      headerStyle: {
        backgroundColor: Colors.background
      },
      headerRight: (<Icon.Button name='info' backgroundColor="transparent" size={32} color={Colors.verdeOscuro} underlayColor={Colors.whiteCrudo} onPress={() => ourself.activateHelper()}></Icon.Button>),
      headerLeft: (<Icon1.Button name='md-arrow-back' backgroundColor="transparent" size={28} color={Colors.pinkChicle} underlayColor={Colors.whiteCrudo} onPress={() => ourself.showAlert()}></Icon1.Button>)
    }
  }

  changeIndex = (index) => {
    this.setState({currentPosition: index})
  }

  showAlert = (title, text) => {
    Alert.alert('¡Wuau!', '¿Seguro que quiere salir sin guardar?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Salir',
        onPress: () => {
          this.goToBack()
        }
      }
    ], {cancelable: true})
  }

  goToBack() {
    this.props.navigation.goBack(null)
  }

  activateHelper = () => {
    switch (this.state.currentPosition) {
      case 0:
        this.childStart.activateHelper()
        break;
      case 1:
        this.childMap.activateHelper()
        break;
      case 2:
        this.childEnd.activateHelper()
        break;
    }
  }

  refreshList = () => {
    const {navigation} = this.props
    navigation.state.params.onResfresh();
  }

  render() {
    return (<View style={styles.container}>
      <ImageBackground source={require('../../assets/images/background.png')} style={{
          width: '100%',
          height: '100%'
        }}>
        <View style={{
            marginTop: 10
          }}>
          <StepIndicator customStyles={customStyles} style={{
              position: 'absolute'
            }} stepCount={3} currentPosition={this.state.currentPosition} labels={labels}/>
        </View>
        <Swiper style={styles.wrapper} showsButtons={true} loop={false} onIndexChanged={value => this.changeIndex(value)}>
          <View style={styles.slide1}>
            <StartRoute currentPosition={this.state.currentPosition} onRef={ref => (this.childStart = ref)} nav={this.props.navigation}/>
          </View>

        </Swiper>
      </ImageBackground>
    </View>);
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteCrudo,
    height: '100%',
    flex: 1
  },
  wrapper: {},
  slide1: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 20
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

const labels = ["Inicio", "Mapa", "¡Crear!"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.verdeOscuro,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: Colors.verdeOscuro,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Colors.verdeOscuro,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Colors.verdeOscuro,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#f7e4e4',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.verdeOscuro,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: Colors.verdeOscuro
}

const mapStateToProps = state => {
  return {dataNewRoute: state.dataNewRoute}
}

export default connect(mapStateToProps, actions)(NewRouteScreen)
