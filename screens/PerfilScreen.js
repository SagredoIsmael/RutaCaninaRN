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
} from 'react-native';

class PerfilScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

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
          onPress={this.onButtonPress}
        />
        <Button
          title={'Ver props'}
          onPress={() => console.log(this.props)}
        />
        </View>
      </ScrollView>
    );

  }

  onButtonPress = () => {
    this.props.insert_user('')
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
