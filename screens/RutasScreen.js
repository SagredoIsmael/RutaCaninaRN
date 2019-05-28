import React from 'react'
import Fire from '../api/Fire'
import {connect} from 'react-redux'
import {resetNewRoute, requestDataRoutes, successDataRoutes} from '../actions/routesActions'
import {insertDataMyUser} from '../actions/usersActions'
import List from '../components/List'
import ActionButton from 'react-native-action-button'
import Colors from '../constants/Colors'
import FlashMessage from 'react-native-flash-message'
import {showMessage, hideMessage} from 'react-native-flash-message'
import {
  LayoutAnimation,
  RefreshControl,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  StatusBar,
  Alert,
  BackHandler
} from 'react-native'

class RutasScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this._confiBackButtonAndroid()
    this.routesRequest()
  }

  userRequest = async () => {
    if (Fire.shared.uid) {
      const {dataUser} = await Fire.shared.getInfoUser(Fire.shared.uid)
      this.props.insertDataMyUser(dataUser)
    }
  }

  routesRequest = async () => {
    if (this.props.loading) {
      return
    }
    this.props.requestDataRoutes()
    const data = await Fire.shared.getRoutes()
    this.props.successDataRoutes(data)
    await this.userRequest()
  }

  _confiBackButtonAndroid = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('RutasStack')
      return true;
    })
  }

  refreshList = () => {
    showMessage({message: "¡Tu ruta se ha creado correctamente!", type: "success", floating: true})
    this.routesRequest()
  }

  goToNewRoute = () => {
    if (Fire.shared.uid != undefined) {
      this.props.resetNewRoute()
      this.props.navigation.navigate('NewRoute', {onResfresh: this.refreshList, restoreBackButton: this._confiBackButtonAndroid})
    } else {
      this.showAlertLogIn()
    }
  }

  showAlertLogIn = () => {
    Alert.alert('Nueva ruta', 'Es necesario iniciar sesión previamente', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Iniciar sesión',
        onPress: () => this.props.navigation.navigate('PerfilStack')
      }
    ], {cancelable: true})
  }

  _onRefresh = () => this.routesRequest()

  render() {
    LayoutAnimation.easeInEaseOut()
    return (<View style={styles.container}>
      <List refreshControl={<RefreshControl
        refreshing = {
          this.props.loading
        }
        onRefresh = {
          this._onRefresh
        }
        />} onPressFooter={this._onRefresh} data={this.props.routes} myKey={this.props.dataMyUser.key} nav={this.props.navigation}/>
      <ActionButton buttonColor={Colors.verdeOscuro} onPress={() => {
          this.goToNewRoute()
        }} size={this.props.loading
          ? 0
          : 50}/>
      <FlashMessage position="top"/>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {routes: state.dataRoutes.items, loading: state.dataRoutes.loading, error: state.dataRoutes.error, dataMyUser: state.dataMyUser}
}

const mapDispatchToProps = dispatch => {
  return {
    insertDataMyUser: (user) => {
      dispatch(insertDataMyUser(user))
    },
    resetNewRoute: () => {
      dispatch(resetNewRoute())
    },
    requestDataRoutes: () => {
      dispatch(requestDataRoutes())
    },
    successDataRoutes: (routes) => {
      dispatch(successDataRoutes(routes))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RutasScreen)
