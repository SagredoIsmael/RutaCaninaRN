import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import Colors from '../constants/Colors';
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

class DogScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('titleHeader', 'joo'),
    };
  };



  render() {
    const { navigation } = this.props;
    const userInfo = navigation.getParam('userInfo', 'NoInfo');
    return (
        <View style={styles.container}>

        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataRoutes : state.dataRoutes,
    keyUser : state.keyUser,
  }
}

export default connect(mapStateToProps, actions)(DogScreen)

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.pinkChicle,
    paddingHorizontal: 10,
    paddingTop: 70,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
});
