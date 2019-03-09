import {Ionicons} from "@expo/vector-icons"
import React from "react"
import Colors from "../constants/Colors"
import moment from 'moment'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {showMessage, hideMessage} from 'react-native-flash-message'
import ListAssistans from './Modals/ListAssistans'
import ItemUser from './ItemUser'
import Fire from "../api/Fire"
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator
} from "react-native"

const profileImageSize = 36
const padding = 12

class Item extends React.Component {
  state = {
    isSubscribe: false,
    isOpenListAssistans: false,
    isLoadingAssistants: false,
    isLoadingSubscribe: false
  }

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({width, height})
      });
    }
    this.userRequest(false)
  }

  renderIconBar() {
    return (<View style={styles.row}>

      {
        this.state.isLoadingSubscribe
          ? (<ActivityIndicator size="small" color={Colors.pinkChicle}/>)
          : (<TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => {
              this._pressSubscribe()
            }}>
            {
              this.state.isSubscribe
                ? this.renderIcon("ios-happy-outline")

                : this.renderIcon("ios-person-add-outline")

            }
          </TouchableHighlight>)
      }
      < TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={this._pressChat
}>
        {this.renderIcon("ios-chatbubbles-outline")}
      </TouchableHighlight>

      <TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={this._pressMap}>
        {this.renderIcon("ios-send-outline")}</TouchableHighlight>

      {
        this.state.isLoadingAssistants
          ? (<ActivityIndicator size="small" color={Colors.pinkChicle}/>)
          : (<TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => {
              this.requestAssistants()
            }}>
            {this.renderIcon("ios-people-outline")}
          </TouchableHighlight>)
      }</View>)
  }

  comprobeSubscribe = async () => {
    if (this.props.dataMyUser.subscribedRoutes) {
      for (let assistant of this.props.dataMyUser.subscribedRoutes) {
        if (assistant == this.props.keyRoute) {
          this.setState({isSubscribe: true})
        }
      }
    }
  }

  renderBarOptions() {
    return (<View style={styles.paddingView}>

      {this.renderIconBar()}

      <Text style={styles.text}>{this.props.title}</Text>
      <View style={styles.rowDate}>
        {
          this.props.date != ''
            ? <Text style={styles.time}>{moment(this.props.date, 'DD-MM-YYYY').format("dddd DD MMM")}
              </Text>
            : null
        }
        {
          this.props.time != ''
            ? <Text style={styles.time}>
                a las {this.props.time}{' '}
              </Text>
            : null
        }
        {
          this.props.duration != ''
            ? <Text style={styles.time}>
                ({this.props.duration})
              </Text>

            : null
        }
      </View>
      <Text style={styles.subtitle}>{this.props.description}</Text>
    </View>)
  }

  renderIcon(name) {
    return (<Ionicons style={{
        marginRight: 5
      }} name={name} size={40} color={Colors.pinkChicle}/>)
  }

  _pressSubscribe = () => {
    if (this.props.dataMyUser.key == '') {
      this.showAlertLogIn()
    } else {
      this.setState({isLoadingSubscribe: true})
      this.state.isSubscribe
        ? this.unSubscribeRoute()
        : this.subscribeRoute()
    }
  }

  showAlertLogIn = () => {
    Alert.alert('Apuntarse a la ruta', 'Es necesario iniciar sesión previamente', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Iniciar sesión',
        onPress: () => this.props.nav.navigate('PerfilStack')
      }
    ], {cancelable: true})
  }

  userRequest = async (force) => {
    if (!this.props.dataMyUser.name || this.props.dataMyUser.key == '' || this.props.dataMyUser.name == '' || force) {
      const {dataUser} = await Fire.shared.getInfoUser(this.props.dataMyUser.key)
      this.props.insert_dataMyUser(dataUser)
    }
    this.comprobeSubscribe()
  }

  subscribeRoute = async () => {
    if (this.props.dataMyUser.name != '') {
      const attributesSubscribe = {
        nameCreator: this.props.dataMyUser.name,
        imageCreator: this.props.dataMyUser.image
      }

      if (await Fire.shared.addAssistantsRoute(attributesSubscribe, this.props.keyRoute, this.props.dataMyUser.subscribedRoutes)) {
        this.userRequest(true)
        showMessage({message: "¡Te has apuntado a la ruta!", type: "success", floating: true})
      } else {
        showMessage({message: "Ha ocurrido un error al apuntarte. Inténtalo más tarde", type: "danger", floating: true})
      }
    } else {
      showMessage({message: "Ha ocurrido un error al apuntarte. Inténtalo más tarde", type: "danger", floating: true})
    }
    this.setState({isLoadingSubscribe: false})
  }

  unSubscribeRoute = async () => {
    if (this.props.dataMyUser.name != '') {
      if (await Fire.shared.deleteAssistantsRoute(this.props.keyRoute, this.props.dataMyUser.subscribedRoutes)) {
        this.userRequest(true)
        showMessage({message: "Te has desapuntado de la ruta", type: "danger", floating: true})
        this.setState({isSubscribe: false})
      } else {
        showMessage({message: "Ha ocurrido un error al apuntarte. Inténtalo más tarde", type: "danger", floating: true})
      }
    } else {
      showMessage({message: "Ha ocurrido un error al apuntarte. Inténtalo más tarde", type: "danger", floating: true})
    }
    this.setState({isLoadingSubscribe: false})
  }

  _pressChat = () => {
    console.log('chat');
  }

  _pressMap = () => {
    console.log('eeeeee');
  }

  _pressDismissAssistantsList = () => {
    this.setState({isOpenListAssistans: false})
  }

  requestAssistants = async () => {
    this.setState({isLoadingAssistants: true})
    const {data} = await Fire.shared.getUserAssistants(this.props.keyRoute)
    this.setState({assistants: data, isOpenListAssistans: true, isLoadingAssistants: false})
  }

  render() {
    const imgW = this.props.imageWidth || this.state.width;
    const imgH = this.props.imageHeight || this.state.height;
    const aspect = imgW / imgH || 1

    var esLocale = require('moment/locale/es');
    moment.locale('es', esLocale);

    return (<View>
      <ImageBackground source={require("../assets/images/background.png")} style={{
          width: "100%"
        }}>
        <View style={{
            marginTop: 10
          }}>

          <ItemUser keyCreator={this.props.keyCreator} nameCreator={this.props.nameCreator} imageCreator={this.props.imageCreator} myKeyUser={this.props.dataMyUser.key} nav={this.props.nav}></ItemUser>

        </View>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image resizeMode="contain" style={{
              backgroundColor: Colors.whiteCrudo,
              width: "98%",
              aspectRatio: aspect,
              borderRadius: 20
            }} source={{
              uri: this.props.image
            }}/>
        </View>
        {this.renderBarOptions()}
        <ListAssistans isOpenListAssistans={this.state.isOpenListAssistans} nav={this.props.nav} clickDismiss={this._pressDismissAssistantsList} myKeyUser={this.props.dataMyUser.key} assistants={this.state.assistants}/>
      </ImageBackground>
    </View>)
  }
}
const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
    fontSize: 15
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 10,
    marginTop: 5
  },
  time: {
    opacity: 0.9,
    fontSize: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowDate: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    marginTop: 5
  },
  column: {
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "center"
  },
  padding: {
    padding
  },
  paddingView: {
    padding,
    marginBottom: 10
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: Colors.whiteCrudo,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.pinkChicle,
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: "cover",
    marginRight: padding
  }
})
const mapStateToProps = state => {
  return {dataMyUser: state.dataMyUser}
}

export default connect(mapStateToProps, actions)(Item)
