import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

class DetailRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    if (this.props.currentPosition == 1){
      return (
        <ScrollView>
          <View style={styles.container}>

          </View>
        </ScrollView>
      )
    }
    return (
      <View/>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },
});


const mapStateToProps = state => {
  return {
    dataNewRoute : state.dataNewRoute,
  }
}

export default connect(mapStateToProps, actions)(DetailRoute)
