import React from 'react'
import Colors from '../../constants/Colors'
import StepIndicator from 'react-native-step-indicator'
import Swiper from 'react-native-swiper'
import NameRoute from './NameRoute'
import DetailRoute from './DetailRoute'
import DateRoute from './DateRoute'
import PhotoRoute from './PhotoRoute'
import StartCoordRoute from './StartCoordRoute'
import EndCoordRoute from './EndCoordRoute'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
} from 'react-native'


class NewRouteScreen extends React.Component {

  constructor() {
    super()
    this.state = {
        currentPosition: 0,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Nueva ruta',
      headerTitleStyle: {
        color: Colors.verdeOscuro,
        fontSize: 28
      },
      headerStyle: {
        backgroundColor: Colors.background
      },
    }
  }

  changeIndex = (index) => {
    this.setState({
      currentPosition: index
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          style={{width: '100%', height: '100%'}}>
          <View style={{marginTop:10}}>
            <StepIndicator
               customStyles={customStyles}
               style={{position: 'absolute'}}
               stepCount={6}
               currentPosition={this.state.currentPosition}
               labels={labels}
            />
          </View>
          <Swiper style={styles.wrapper} showsButtons={true} loop={false} onIndexChanged={value => this.changeIndex(value)}>
            <View style={styles.slide1}>
              <NameRoute currentPosition={this.state.currentPosition}/>
            </View>
            <View style={styles.slide1}>
              <DateRoute currentPosition={this.state.currentPosition}/>
            </View>
            <View style={styles.slide1}>
              <DetailRoute currentPosition={this.state.currentPosition}/>
            </View>
            <View style={styles.slide1}>
              <PhotoRoute currentPosition={this.state.currentPosition}/>
            </View>
            <View style={styles.slide1}>
              <StartCoordRoute currentPosition={this.state.currentPosition}/>
            </View>
            <View style={styles.slide1}>
              <EndCoordRoute currentPosition={this.state.currentPosition}/>
            </View>
          </Swiper>
        </ImageBackground>
      </View>
    );
  }
}


export default NewRouteScreen

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteCrudo,
    height: '100%',
    flex: 1
  },
  wrapper: {
  },
  slide1: {
    justifyContent: 'center',
    flex: 1,
    marginTop:20
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

const labels = ["Nombre","Fecha","Detalle","Foto","Inicio","Fin"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
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
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.verdeOscuro,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: Colors.verdeOscuro
}
