import React from 'react'
import AutoTypingText from 'react-native-auto-typing-text'
import Colors from '../constants/Colors'
import StepIndicator from 'react-native-step-indicator'
import Swiper from 'react-native-swiper'
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
        indexScreen: 0,
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
      indexScreen: index,
      currentPosition: index
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/background.png')}
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
              <AutoTypingText
                text={'¿Te animas a crear una ruta? ¡Genial! \n Empecemos dándole un nombre..'}
                charMovingTime={50}
                delay={0}
                style={{
                  position: 'absolute',
                  width: '90%',
                  height: 100,
                  fontSize: 20,
                  color: Colors.verdeOscuro,
                  margin: 20,
                  marginTop: 20,
                }}
                onComplete={() => { console.log('done'); }}
              />
            </View>
            <View style={styles.slide1}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide1}>
              <Text style={styles.text}>And simple</Text>
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
