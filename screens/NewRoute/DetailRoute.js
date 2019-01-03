import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import AutoTypingText from 'react-native-auto-typing-text'
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native'

class DetailRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    if (this.props.currentPosition == 1){
      return (
        <ScrollView>
          <AutoTypingText
            text={'Añade una descripción de la ruta'}
            charMovingTime={40}
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
          <View style={styles.container}>
           <TextInput
              multiline = {true}
              style={styles.textInput}
              onChangeText={(text) => this.setState({text})}
              value='hola que tal'
            />
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
  textInput:{
    backgroundColor: Colors.whiteCrudo,
    marginTop: 80,
    width:'80%',
    borderColor: '#db786d',
    borderWidth: 3,
  }

});


const mapStateToProps = state => {
  return {
    dataNewRoute : state.dataNewRoute,
  }
}

export default connect(mapStateToProps, actions)(DetailRoute)
