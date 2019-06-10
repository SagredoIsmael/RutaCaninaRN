import React from 'react';
import {connect} from 'react-redux'
import Colors from '../constants/Colors'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import Fire from "../api/Fire"
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  BackHandler
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
      avatar: this.props.dataMyUser.image,
      keyRoute: this.props.navigation.state.params.keyRoute
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.goToBack()
      return true;
    });
    this._getMessages()
  }

  _getMessages = async() => {
    const messages = await Fire.shared.getMessages(this.props.navigation.state.params.keyRoute)
    if (messages.data) this._addMessagesToChat(messages.data)
  }

  goToBack() {
    this.props.navigation.goBack(null)
  }

  _sendMessage = (message) => {
    Fire.shared.sendMessage(message)
    this._addMessagesToChat(message)
  }

  _renderSend(props) {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 10, marginBottom: 5}}>
                  <Icon1 style={{marginRight: 5}} name="ios-send" color={Colors.pinkChicle} size={32}/>
                </View>
            </Send>
        )
    }

  _goToProfile = (user) => {
    if (user._id){
      if (user._id == Fire.shared.uid) {
        this.props.navigation.navigate('PerfilStack')
      } else {
        this.props.navigation.navigate("Profile", {keyUser: user._id})
      }
    }
  }

  _addMessagesToChat = (messages) => {
    if (messages) {
      const messagesSorted = [].concat(messages)
      .sort((a, b) => a.createdAt < b.createdAt)

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messagesSorted),
      }))
    }
  }


  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        placeholder={"Escribe tu mensaje.."}
        onSend={this._sendMessage}
        renderSend={this._renderSend}
        isAnimated={true}
        showUserAvatar={true}
        //inverted={false}
        onPressAvatar={this._goToProfile}
        user={this.user}
      />);
  }
}

const mapStateToProps = state => {
  return {dataRoutes: state.dataRoutes, dataMyUser: state.dataMyUser}
}

export default connect(mapStateToProps)(ChatRouteScreen)

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#bedce2',
    flex: 1,
  }
});
