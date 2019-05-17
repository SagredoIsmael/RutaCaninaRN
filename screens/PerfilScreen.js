import React from 'react';
import {connect} from 'react-redux'
import {insertDataMyUser, insertDataUsers} from '../actions/usersActions'
import Fire from '../api/Fire'
import Colors from '../constants/Colors'
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
      this.props.insertDataUsers(dataUser)
      this.setState({isMyProfile: false})
    } else {
      const {dataUser} = await Fire.shared.getInfoUser(this.props.keyUser)
      this.props.insertDataMyUser(dataUser)
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

const mapDispatchToProps = dispatch => {
  return {
    insertDataMyUser: (user) => {
      dispatch(insertDataMyUser(user))
    },
    insertDataUsers: (users) => {
      dispatch(insertDataUsers(users))
    }
  }
}

const mapStateToProps = state => {
  return {dataUser: state.dataUser, dataMyUser: state.dataMyUser}
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen)
