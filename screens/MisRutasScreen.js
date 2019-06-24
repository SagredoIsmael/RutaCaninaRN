import React from 'react'
import {connect} from 'react-redux'
import {resetNewRoute, fetchRoutes} from '../actions/routesActions'
import List from '../components/List'
import ActionButton from 'react-native-action-button'
import Colors from '../constants/Colors'
import FlashMessage from 'react-native-flash-message'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import {
  LayoutAnimation,
  RefreshControl,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  StatusBar,
  Alert,
  BackHandler,
  Dimensions
} from 'react-native'

let widthScreen = Dimensions.get('window').width;

class MisRutasScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this._confiBackButtonAndroid()
  }

  _confiBackButtonAndroid = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('RutasStack')
      return true
    })
  }

  render() {
    LayoutAnimation.easeInEaseOut()
    const { loading, routes, dataMyUser, navigation } = this.props
    var myRoutes = []

    if (dataMyUser.subscribedRoutes != null ){
      myRoutes = routes.filter(route => {return dataMyUser.subscribedRoutes.includes(route.key)})
    }

    if (this.props.dataMyUser.key != '' && myRoutes.length > 0){
      return (
        <View style={styles.containerList}>
        <List data={myRoutes} myKey={dataMyUser.key} nav={navigation}/>
        <FlashMessage position="top"/>
      </View>)
    }

    if (this.props.dataMyUser.key != '' && myRoutes.length == 0){
      return (
        <View style={styles.container}>
        <Text style={styles.text}>Aún no estás apuntad@ a ninguna ruta. ¡Anímate!
        </Text>
      </View>)
    }

    return (
      <View style={styles.container}>
      <Text style={styles.text}>¡Regístrate o inicia sesión para ver las rutas a las que estás apuntad@!
      </Text>
      <AwesomeButtonRick type="secondary" style={{
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 10
        }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => this.props.navigation.navigate('PerfilStack')}>
        Iniciar sesión
      </AwesomeButtonRick>

      <AwesomeButtonRick type="secondary" style={{
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 10
        }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => this.props.navigation.navigate('PerfilStack')}>
        Registrarse
      </AwesomeButtonRick>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  containerList: {
    height: '100%',
    flex: 1,
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#bedce2',
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color:Colors.pinkChicle,
    alignSelf: 'center',
    paddingVertical: 20,
    fontWeight: 'bold',
    fontSize: widthScreen/18,
    marginLeft: 2,
    marginRight: 2,
  },
})

const mapStateToProps = state => {
  return {routes: state.dataRoutes.items, loading: state.dataRoutes.loading, error: state.dataRoutes.error, dataMyUser: state.dataMyUser}
}


export default connect(mapStateToProps)(MisRutasScreen)
