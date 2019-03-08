import React from 'react'
import Fire from '../api/Fire'
import {connect} from 'react-redux'
import * as actions from '../actions'
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
  Alert
} from 'react-native';

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
    this.makeRemoteRequest()
  }

  userRequest = async () => {
    const {dataUser} = await Fire.shared.getInfoUser(Fire.shared.uid)
    this.props.insert_dataMyUser(dataUser)
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
  };

  // Append the item to our states `data` prop
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
    this.props.insert_dataRoutes(this.state.posts)

  }

  refreshList = () => {
    showMessage({message: "¡Tu ruta se ha creado correctamente!", type: "success", floating: true})
    this.makeRemoteRequest()
  };

  goToNewRoute = () => {
    if (Fire.shared.uid != undefined) {
      this.props.navigation.navigate('NewRoute', {onResfresh: this.refreshList})
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
        />} onPressFooter={this.onPressFooter} data={this.props.dataRoutes} nav={this.props.navigation}/>
      <ActionButton buttonColor={Colors.pinkChicle} onPress={() => {
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
  return {dataRoutes: state.dataRoutes}
}

export default connect(mapStateToProps, actions)(RutasScreen)
