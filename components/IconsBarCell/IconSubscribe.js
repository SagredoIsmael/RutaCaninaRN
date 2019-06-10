import React from 'react';
import {connect} from 'react-redux'
import {fetchUser} from '../../actions/usersActions'
import Colors from "../../constants/Colors"
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import IconOcticons from "react-native-vector-icons/Octicons"
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
          : (<TouchableHighlight underlayColor="rgba(98,93,144,0)"  onPress={() => {this._pressSubscribe() }}>
            {
              this.comprobeSubscribe()
                ? <View style={styles.row}>
                    <IconOcticons style={{marginRight: 5}} name={'heart'} size={40} color={Colors.pinkChicle}/>
                    <Text style={styles.textSmall}>¡Estás apuntad@!</Text>
                  </View>

                : <View style={styles.row}>
                    <IconSimpleLineIcons style={{marginRight: 5}} name={'heart'} size={30} color={Colors.pinkChicle}/>
                    <Text style={styles.text}>¡Apúntate!</Text>
                  </View>
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
      this.comprobeSubscribe()
        ? this.unSubscribeRoute()
        : this.subscribeRoute()
    }
  }

  comprobeSubscribe = () => {
    if (this.props.dataMyUser.subscribedRoutes)
      return this.props.dataMyUser.subscribedRoutes.includes(this.props.keyRoute)
    return false
  }

  userRequest = async (force) => {
    if (!this.props.dataMyUser.name || this.props.dataMyUser.key == '' || this.props.dataMyUser.name == '' || force) {
      fetchUser
    }
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
      } else {
        showMessage({message: "Ha ocurrido un error al desapuntarte. Inténtalo más tarde", type: "danger", floating: true})
      }
    } else {
      showMessage({message: "Ha ocurrido un error al desapuntarte. Inténtalo más tarde", type: "danger", floating: true})
    }
    this.setState({isLoadingSubscribe: false})
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
    fetchUser: () => {
      dispatch(fetchUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconSubscribe)


const styles = StyleSheet.create({
  text: {
    opacity: 0.9,
    fontSize: 14,
    color: Colors.pinkChicle,
  },
  textSmall :{
    opacity: 0.9,
    fontSize: 12,
    color: Colors.pinkChicle,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
})
