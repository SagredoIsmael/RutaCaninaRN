import React from 'react'
import Fire from '../api/Fire'
import {connect} from 'react-redux'
import {resetNewRoute, fetchRoutes} from '../actions/routesActions'
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
    this.props.fetchRoutes()
    this.userRequest() //TODO: hacer lo mismo que con las rutas
  }

  userRequest = async () => {
    console.log('killo', Fire.shared.uid);  //TODO : AHORA NO SE QUE PASA QUE NO PIDE ESTO (CREO QUE LO PIDE ANTES DE TIEMPO), OPTO POR QUITARLO Y QUE LO PIDA CUANDO CLICKA EN PERFIL (PARA ESO ANTES HAY QUE PONERLO IGUAL QUE RUTAS)
    if (Fire.shared.uid) {
      const {dataUser} = await Fire.shared.getInfoUser(Fire.shared.uid)
      this.props.insertDataMyUser(dataUser)
    }
  }

  _confiBackButtonAndroid = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('RutasStack')
      return true;
    })
  }

  refreshList = () => {
    showMessage({message: "¡Tu ruta se ha creado correctamente!", type: "success", floating: true})
    //this.routesRequest()  //TODO: quitar esto de parametros a pasar y refrescarla desde el otro lado
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

  _onRefresh = () => this.props.fetchRoutes()

  render() {
    const { loading, routes, dataMyUser, navigation } = this.props
    LayoutAnimation.easeInEaseOut()
    return (
      <View style={styles.container}>
      <List refreshControl = {
        <RefreshControl refreshing = {loading} onRefresh = {this._onRefresh} />
      }
      onPressFooter={this._onRefresh} data={routes} myKey={dataMyUser.key} nav={navigation}/>
      <ActionButton buttonColor={Colors.verdeOscuro} onPress={() => {this.goToNewRoute()}} size={loading? 0: 50}/>
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
    fetchRoutes: () => {
      dispatch(fetchRoutes())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RutasScreen)
