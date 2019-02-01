import React from 'react'
import Fire from '../api/Fire'
import {connect} from 'react-redux'
import * as actions from '../actions'
import List from '../components/List'
import getPermission from '../utils/getPermission'
import ActionButton from 'react-native-action-button'
import Colors from '../constants/Colors'
import {
  LayoutAnimation,
  RefreshControl,
  StyleSheet,
  ListView,
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
    //  Check if we are signed in...
    // if (Fire.shared.uid) {
    //    If we are, then we can get the first 5 posts
    //   this.makeRemoteRequest();
    // } else {
    //    If we aren't then we should just start observing changes. This will be called when the user signs in
    //   firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //       this.makeRemoteRequest();
    //     }
    //   });
    // }
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async lastKey => {
    if (this.state.loading) {
      return;
    }
    this.setState({loading: true});

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const {data, cursor} = await Fire.shared.getRoutes({size: 20, start: lastKey});

    this.lastKnownKey = cursor;

    // Iteratively add posts
    let posts = {};
    for (let child of data) {
      posts[child.key] = child;
    }
    this.addPosts(posts);

    // Finish loading, this will stop the refreshing animation.
    this.setState({loading: false});
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
      };
    });
    this.props.insert_dataRoutes(this.state.posts)
  };

  goToNewRoute = () => {
    if (Fire.shared.uid != undefined) {
      this.props.insert_user(Fire.shared.uid)
      this.props.navigation.navigate('NewRoute')
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
        />} onPressFooter={this.onPressFooter} data={this.state.posts} nav={this.props.navigation}/>
      <ActionButton buttonColor={Colors.pinkChicle} onPress={() => {
          this.goToNewRoute()
        }} size={this.state.loading
          ? 0
          : 50}/>
    </View>);
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
  return {dataRoutes: state.dataRoutes, keyUser: state.keyUser}
}

export default connect(mapStateToProps, actions)(RutasScreen)
