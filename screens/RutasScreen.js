import React from 'react'
import {connect} from 'react-redux'
import {resetNewRoute, fetchRoutes} from '../actions/routesActions'
import List from '../components/List'
import ActionButton from 'react-native-action-button'
import Colors from '../constants/Colors'
import FlashMessage from 'react-native-flash-message'
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
  }

  _confiBackButtonAndroid = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('RutasStack')
      return true
    })
  }

  goToNewRoute = () => {
    if (this.props.dataMyUser.key != '') {
      this.props.resetNewRoute()
      this.props.navigation.navigate('NewRoute', {restoreBackButton: this._confiBackButtonAndroid, titleHeader: 'Nueva ruta'})
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
      data={routes.items} myKey={dataMyUser.key} nav={navigation}/>
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
  return {routes: state.dataRoutes, loading: state.dataRoutes.loading, error: state.dataRoutes.error, dataMyUser: state.dataMyUser}
}

const mapDispatchToProps = dispatch => {
  return {
    resetNewRoute: () => {
      dispatch(resetNewRoute())
    },
    fetchRoutes: () => {
      dispatch(fetchRoutes())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RutasScreen)
