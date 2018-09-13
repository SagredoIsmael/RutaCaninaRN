import React from 'react';
import { Avatar } from 'react-native-elements';
import List from '../components/List';
import {RkButton, RkText, RkTextInput, RkSeparator} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class PerfilScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.container}>
          <View>
            <Image style={styles.logoImg} source={require('../assets/images/logo.png')}/>
            <RkText style={styles.title}><RkText style={styles.extraBold}>React</RkText> Native</RkText>
            <RkText style={styles.subTitle}>Essentials</RkText>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={styles.widthLimit}>
                <RkTextInput
                  rkType='rounded'
                  containerStyle={styles.inputContainer}
                  label={<Icon name='ios-person-outline'/>}
                  labelStyle={styles.inputIcon}
                  style={styles.input}
                  placeholder={'Login'}
                  placeholderTextColor={'white'}/>
                <RkTextInput
                  rkType='rounded'
                  containerStyle={styles.inputContainer}
                  label={<Icon name='ios-lock-outline'/>}
                  labelStyle={[styles.inputIcon, styles.inputIconLock]}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={'Password'}
                  placeholderTextColor={'white'}/>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={styles.widthLimit}>
              <RkButton innerStyle={styles.buttonInner}
                        style={styles.buttonContainer}
                        rkType='circle shadow'
                        onPress={() => super._renderMainScreen()}>
                <RkText>Log In</RkText>
              </RkButton>
            </View>
          </View>
          <RkText style={styles.footText}>
            Don have account? <Text style={styles.extraBold}>Sign up</Text>.
          </RkText>
        </View>
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 70,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  widthLimit: {
    flex: 1,
    maxWidth: 275,
    minHeight: 120,
  },
  logoImg: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  title: {
    marginTop: 5,
    fontSize: 42,
    textAlign: 'center',
    fontWeight: '500'
  },
  subTitle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 30
  },
  inputContainer: {
    backgroundColor: 'white',
    marginTop: 15,
    paddingLeft: 15,
  },
  inputIcon: {
    color: 'white',
    fontSize: 28,
    fontWeight: '300'
  },
  inputIconLock: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    color: 'white',
    fontWeight: '300',
    fontSize: 20,
    textAlign: 'left',
    height: 40,
    marginHorizontal: 10
  },
  footText: {
    marginVertical: 30,
    alignSelf: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    backgroundColor: 'white',
    shadowColor: 'white',
    paddingVertical: 12,
    shadowRadius: 12,
    shadowOpacity: 0.4,
    marginTop: 40,
  },
  buttonInner: {
    fontSize: 22,
    color: 'white',
  },
  extraBold: {
    fontWeight: '700'
  }
});
