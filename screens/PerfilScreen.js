import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import Fire from '../api/Fire'
import Colors from '../constants/Colors'
import Login from '../components/Login.js'
import Profile from '../components/Profile.js'
import Loader from '../components/Modals/Loader'
import {ScrollView, View, AsyncStorage} from 'react-native'

class PerfilScreen extends React.Component {
  static navigationOptions = {
    title: 'Su perfil',
    headerTitleStyle: {
      color: 'white',
      fontSize: 20
    },
    headerStyle: {
      backgroundColor: Colors.profilegreen
    }
  }

  constructor(props) {
    super(props);
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
        <Loader loading={this.state.isLoading} size={'large'} color="#ff66be"/>
      </View>)
  }
}

const mapStateToProps = state => {
  return {dataUser: state.dataUser, dataMyUser: state.dataMyUser}
}

export default connect(mapStateToProps, actions)(PerfilScreen)
