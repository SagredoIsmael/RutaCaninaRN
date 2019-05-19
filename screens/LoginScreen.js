import React from 'react';
import {connect} from 'react-redux'
import Fire from '../api/Fire'
import Colors from '../constants/Colors'
import Login from '../components/Login.js'
import Profile from '../components/Profile.js'
import PerfilScreen from './PerfilScreen.js'
import {ScrollView, StyleSheet, View, BackHandler} from 'react-native'

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('RutasStack')
      return true
    })
  }

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.dataMyUser.key == '') {
      return (<ScrollView style={styles.container}>
        <View>
          <Login/>
        </View>
      </ScrollView>)
    }
    return (<View>
      <PerfilScreen nav={this.props.navigation} keyUser={this.props.dataMyUser.key}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteCrudo
  }
});

const mapStateToProps = state => {
  return {dataRoutes: state.dataRoutes, dataMyUser: state.dataMyUser}
}

export default connect(mapStateToProps)(LoginScreen)
