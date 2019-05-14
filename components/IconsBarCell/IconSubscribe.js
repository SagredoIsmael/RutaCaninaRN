import React from 'react';
import {connect} from 'react-redux'
import {insertDataMyUser} from '../../actions/usersActions'
import Colors from "../../constants/Colors"
import {Ionicons} from "@expo/vector-icons"
import Fire from "../../api/Fire"
import {showMessage, hideMessage} from 'react-native-flash-message'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';

class IconSubscribe extends React.Component {

  state = {
    isSubscribe: false,
    isLoadingSubscribe: false
  }

  componentDidMount() {
    this.userRequest(false)
  }

  render() {
    return (<View>
      {
        this.state.isLoadingSubscribe
          ? (<ActivityIndicator size="small" color={Colors.pinkChicle}/>)
          : (<TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => {
              this._pressSubscribe()
            }}>
            {
              this.state.isSubscribe
                ? this.renderIcon("ios-heart")

                : this.renderIcon("ios-person-add")

            }
          </TouchableHighlight>)
      }
    </View>);
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

  comprobeSubscribe = async () => {
    if (this.props.dataMyUser.subscribedRoutes) {
      for (let assistant of this.props.dataMyUser.subscribedRoutes) {
        if (assistant == this.props.keyRoute) {
          this.setState({isSubscribe: true})
        }
      }
    }
  }

  userRequest = async (force) => {
    if (!this.props.dataMyUser.name || this.props.dataMyUser.key == '' || this.props.dataMyUser.name == '' || force) {
      const {dataUser} = await Fire.shared.getInfoUser(this.props.dataMyUser.key)
      this.props.insertDataMyUser(dataUser)
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

  renderIcon(name) {
    return (<Ionicons style={{
        marginRight: 5
      }} name={name} size={40} color={Colors.pinkChicle}/>)
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

}

const mapStateToProps = state => {
  return {dataMyUser: state.dataMyUser}
}


const mapDispatchToProps = dispatch => {
  return {
    insertDataMyUser: (user) => {
      dispatch(insertDataMyUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconSubscribe)
