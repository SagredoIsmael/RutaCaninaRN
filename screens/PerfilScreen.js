import React from 'react';
import { Avatar } from 'react-native-elements';
import Fire from '../api/Fire';
import Colors from '../constants/Colors';
import Login from '../components/Login.js'
import List from '../components/List';
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
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = Fire.shared.getUid();
    this.setState = currentUser
    console.log('soy el perfil..y tengo uid:', currentUser);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          if
          <Login></Login>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteCrudo,
  },

});
