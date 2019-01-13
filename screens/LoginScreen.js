import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import Fire from '../api/Fire'
import Colors from '../constants/Colors'
import Login from '../components/Login.js'
import Profile from '../components/Profile.js'
import PerfilScreen from './PerfilScreen.js'
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

class LoginScreen extends React.Component {
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
            <Login/>
          </View>
        </ScrollView>
      );
    }
    return (
      <View>
        <PerfilScreen nav={this.props.navigation} keyUser={this.props.keyUser}/>
      </View>
    );
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

export default connect(mapStateToProps, actions)(LoginScreen)
