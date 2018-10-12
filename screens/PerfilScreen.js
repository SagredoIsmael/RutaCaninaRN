import React from 'react';
import { Avatar } from 'react-native-elements'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Fire from '../api/Fire'
import Colors from '../constants/Colors'
import Login from '../components/Login.js'
import Profile from '../components/Profile.js'
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
      <View>
        <Profile></Profile>
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

export default connect(mapStateToProps, actions)(PerfilScreen)
