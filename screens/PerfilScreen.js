import React from 'react';
import { Avatar } from 'react-native-elements';
import {connect} from 'react-redux'
import * as actions from '../actions'
import Fire from '../api/Fire';
import Colors from '../constants/Colors';
import Login from '../components/Login.js';
import List from '../components/List';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';

class PerfilScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    if (Fire.shared.uid != undefined){
        this.props.insert_user(Fire.shared.uid)
    }
  }

  render() {
    if (this.props.keyUser == ''){
      return (
        <ScrollView style={styles.container}>
          <View>
            <Login></Login>
          </View>
        </ScrollView>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View>
        <Button
          title={'Desconectar'}
          onPress={this.LogOutOnButtonPress}
        />
        <Button
          title={'Ver props'}
          onPress={() => console.log(this.props)}
        />
        </View>
      </ScrollView>
    );
  }


  LogOutOnButtonPress = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Esta seguro?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Aceptar', onPress: () => this.logOut() },
      ],
      { cancelable: false }
    )
  }


  logOut = () => {
    this.props.insert_user('')
    Fire.shared.logOutUser()
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteCrudo,
  },

});


const mapStateToProps = state => {
  return {
    dataRoutes : state.dataRoutes,
    keyUser : state.keyUser,
  }
}

export default connect(mapStateToProps, actions)(PerfilScreen)
