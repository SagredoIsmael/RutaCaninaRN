import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import Colors from '../constants/Colors'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from "../api/Fire"
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

class ChatRouteScreen extends React.Component {

  static ourself = null;


  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chat de la ruta',
      headerTitleStyle: {
        color: Colors.verdeOscuro,
        fontSize: 20
      },
      headerStyle: {
        backgroundColor: Colors.background
      },
      headerLeft: (<Icon1.Button name='md-arrow-back' backgroundColor="transparent" size={32} color={Colors.pinkChicle} underlayColor={Colors.whiteCrudo} onPress={() => ourself.goToBack()}></Icon1.Button>)
    }
  }

  constructor() {
    super();
    ourself = this;
  }

  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.dataMyUser.name,
      _id: Fire.shared.uid,
      user: this.props.dataMyUser.image,
      keyRoute: this.props.navigation.state.params.keyRoute
    };
  }

  componentDidMount() {
    this._getMessages()
  }

  _getMessages = async() => {
    const messages = await Fire.shared.getMessages(this.props.navigation.state.params.keyRoute)
    console.log('jibiri, ', messages.data)
    if (messages.data) this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages.data, messages.data),
    }))
  }

  goToBack() {
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        placeholder={"Escribe tu mensaje.."}
        onSend={Fire.shared.sendMessage}
        isAnimated={true}
        showUserAvatar={true}
        //onPressAvatar={} //Go to pprofile avatar
        user={this.user}
      />);
  }
}

const mapStateToProps = state => {
  return {dataRoutes: state.dataRoutes, dataMyUser: state.dataMyUser}
}

export default connect(mapStateToProps, actions)(ChatRouteScreen)

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#bedce2',
    flex: 1,
  }
});
