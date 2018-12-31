import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import AutoTypingText from 'react-native-auto-typing-text'
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

class DateRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    if (this.props.currentPosition == 1){
      return (
        <ScrollView>
          <AutoTypingText
            text={'¿Te animas a crear una ruta? ¡Genial! \n Empecemos dándole un nombre..'}
            charMovingTime={50}
            delay={0}
            style={{
              position: 'absolute',
              width: '90%',
              height: 100,
              fontSize: 20,
              color: Colors.verdeOscuro,
              margin: 20,
              marginTop: 20,
            }}
            onComplete={() => { console.log('done'); }}
          />
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
    flex: 1,
    backgroundColor: Colors.whiteCrudo,
  },

});


const mapStateToProps = state => {
  return {
    dataNewRoute : state.dataNewRoute,
  }
}

export default connect(mapStateToProps, actions)(DateRoute)
