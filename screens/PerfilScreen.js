import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import Fire from '../api/Fire'
import Colors from '../constants/Colors'
import Login from '../components/Login.js'
import Profile from '../components/Profile.js'
import MenuOptions from '../components/MenuOptions/Menu.js'
import Loader from '../components/Loader'
import {
  ScrollView,
  View,
  AsyncStorage,
} from 'react-native'


class PerfilScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
  }

  state = {
    isLoading:true,
    isMyProfile: true,
  }

  userRequest = async (keyUser) => {
    const { dataUser } = await Fire.shared.getInfoUser(keyUser)
    this.props.insert_dataUser(dataUser)
    this.setState({ isLoading: false })
  }

  async componentWillMount() {
    if (this.props.navigation != null){
      const keyUser = this.props.navigation.getParam('keyUser', null)
      this.userRequest(keyUser)
      this.setState({ isMyProfile: false })
    }else{
      this.userRequest(this.props.keyUser)
    }
  }

  renderMenu(){
   if(this.state.isMyProfile)
      return <MenuOptions/>
   return null;
 }

  render() {
    if (this.props.dataUser)
    return (
      <View>
        <Profile nav={this.props.nav} isMyProfile={this.state.isMyProfile}/>
        { this.renderMenu() }
        <Loader loading={this.state.isLoading} size={'large'} color="#ff66be" />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataUser : state.dataUser,
  }
}

export default connect(mapStateToProps, actions)(PerfilScreen)
