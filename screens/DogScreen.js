import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
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

  render() {
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
    backgroundColor: '#e2bebe',
    paddingHorizontal: 10,
    paddingTop: 70,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
});
