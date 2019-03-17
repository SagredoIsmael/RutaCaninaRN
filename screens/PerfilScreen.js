import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import Fire from '../api/Fire'
import Colors from '../constants/Colors'
import Login from '../components/Login.js'
import Profile from '../components/Profile.js'
import Loader from '../components/Modals/Loader'
import {ScrollView, View, AsyncStorage} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

class PerfilScreen extends React.Component {
  static ourself = null;
  constructor(props) {
    super(props)
    ourself = this
  }

  static navigationOptions = {
    title: 'Su perfil',
    headerTitleStyle: {
      color: 'white',
      fontSize: 20
    },
    headerStyle: {
      backgroundColor: Colors.profilegreen
    },
    headerLeft: (<Icon.Button name='md-arrow-back' backgroundColor="transparent" color={Colors.pinkChicle} underlayColor={Colors.whiteCrudo} size={32} onPress={() => ourself.props.navigation.goBack(null)}></Icon.Button>)
  }

  state = {
    isLoading: true,
    isMyProfile: true
  }

  async componentWillMount() {
    if (this.props.navigation != null) {
      const keyUser = this.props.navigation.getParam('keyUser', null)
      const {dataUser} = await Fire.shared.getInfoUser(keyUser)
      this.props.insert_dataUser(dataUser)
      this.setState({isMyProfile: false})
    } else {
      const {dataUser} = await Fire.shared.getInfoUser(this.props.keyUser)
      this.props.insert_dataMyUser(dataUser)
    }
    this.setState({isLoading: false})
  }

  render() {
    if (this.props.dataUser) 
      return (<View>
        <Profile nav={this.props.nav} isMyProfile={this.state.isMyProfile}/>
        <Loader loading={this.state.isLoading}/>
      </View>)
  }
}

const mapStateToProps = state => {
  return {dataUser: state.dataUser, dataMyUser: state.dataMyUser}
}

export default connect(mapStateToProps, actions)(PerfilScreen)
