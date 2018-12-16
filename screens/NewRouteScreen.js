import React from 'react'
import AutoTypingText from 'react-native-auto-typing-text'
import Colors from '../constants/Colors'
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
} from 'react-native';

 class NewRouteScreen extends React.Component {
  static navigationOptions = {
    title: 'Nueva ruta',
  };

  render() {
    return (
        <View style={styles.container}>
          <ImageBackground
            source={require('../assets/images/background.png')}
            style={{width: '100%', height: '100%'}}>
            <AutoTypingText
              text={'¿Te animas a crear una ruta?    \n   ¡Genial,  \n  vamos a ello...!'}
              charMovingTime={50}
              delay={0}
              style={{
                position: 'absolute',
                width: 300,
                fontSize: 30,
                color: Colors.verdeOscuro,
                margin: 20,
                top: 40,
                left: 0,
              }}
              onComplete={() => { console.log('done'); }}
            />

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
});
