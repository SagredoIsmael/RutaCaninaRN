import React from 'react'
import Fire from '../api/Fire'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {insertDataRoutes} from '../actions/routesActions'
import List from '../components/List'
import getPermission from '../utils/getPermission'
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

  state = {
    loading: false,
    posts: [],
    data: {}
  };

  componentDidMount() {
    this._confiBackButtonAndroid()
    this.makeRemoteRequest()
  }

  userRequest = async () => {
    if (Fire.shared.uid) {
      const {dataUser} = await Fire.shared.getInfoUser(Fire.shared.uid)
      //this.props.insert_dataMyUser(dataUser)  //TODO redux (ya esta creada la accion y el reducer (revisar))
    }
  }

  makeRemoteRequest = async lastKey => {
    if (this.state.loading) {
      return;
    }
    this.setState({loading: true});

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const {data, cursor} = await Fire.shared.getRoutes({size: 5, start: lastKey});

    this.lastKnownKey = cursor;

    // Iteratively add posts
    let posts = {};
    for (let child of data) {
      posts[child.key] = child;
    }
    await this.userRequest()

    this.addPosts(posts)

    // Finish loading, this will stop the refreshing animation.
    this.setState({loading: false})
  }

  addPosts = posts => {
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        ...posts
      };
      return {
        data,
        // Sort the data by timestamp
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp)
      }
    })
    this.props.insertDataRoutes(this.state.posts)

  }

  _confiBackButtonAndroid = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('RutasStack')
      return true;
    });
  }

  refreshList = () => {
    showMessage({message: "¡Tu ruta se ha creado correctamente!", type: "success", floating: true})
    this.makeRemoteRequest()
  };

  goToNewRoute = () => {
    if (Fire.shared.uid != undefined) {
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

  // Because we want to get the most recent items, don't pass the cursor back.
  // This will make the data base pull the most recent items.
  _onRefresh = () => this.makeRemoteRequest();

  // If we press the "Load More..." footer then get the next page of posts
  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

  render() {
    LayoutAnimation.easeInEaseOut();
    return (<View style={styles.container}>
      <List refreshControl={<RefreshControl
        refreshing = {
          this.state.loading
        }
        onRefresh = {
          this._onRefresh
        }
        />} onPressFooter={this.onPressFooter} data={this.props.dataRoutes} myKey={this.props.dataMyUser.key} nav={this.props.navigation}/>
      <ActionButton buttonColor={Colors.verdeOscuro} onPress={() => {
          this.goToNewRoute()
        }} size={this.state.loading
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
  return {dataRoutes: state.dataRoutes, dataMyUser: state.dataMyUser}
}

const mapDispatchToProps = dispatch => {
  return {
    insertDataRoutes: (routes) => {
      dispatch(insertDataRoutes(routes))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RutasScreen)
