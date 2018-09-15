import React from 'react';
import firebase from 'firebase';
import Fire from '../api/Fire';
import List from '../components/List';
import getPermission from '../utils/getPermission';
import {
  LayoutAnimation,
  RefreshControl,
  StyleSheet,
  ListView,
  View,
  TouchableHighlight,
  Text,
  StatusBar,
} from 'react-native';


export default class RutasScreen extends React.Component {
  static navigationOptions = {
   header:null
}

  state = {
    loading: false,
    posts:[],
    data:{},
  };

  componentDidMount() {
  // // Check if we are signed in...
  // if (Fire.shared.uid) {
  //   // If we are, then we can get the first 5 posts
  //   this.makeRemoteRequest();
  // } else {
  //   // If we aren't then we should just start observing changes. This will be called when the user signs in
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.makeRemoteRequest();
  //     }
  //   });
  // }
  this.makeRemoteRequest();
}


makeRemoteRequest = async lastKey => {
    // If we are currently getting posts, then bail out..
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const { data, cursor } = await Fire.shared.getRoutes({
      size: 20,
      start: lastKey,
    });

    this.lastKnownKey = cursor;

    // Iteratively add posts
    let posts = {};
    for (let child of data) {
      posts[child.key] = child;
    }
    this.addPosts(posts);

    // Finish loading, this will stop the refreshing animation.
    this.setState({ loading: false });
  };

  // Append the item to our states `data` prop
  addPosts = posts => {
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        ...posts,
      };
      return {
        data,
        // Sort the data by timestamp
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp),
      };
    });
  };


  // Because we want to get the most recent items, don't pass the cursor back.
  // This will make the data base pull the most recent items.
  _onRefresh = () => this.makeRemoteRequest();

  // If we press the "Load More..." footer then get the next page of posts
  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <List
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this._onRefresh}
          />
        }
        onPressFooter={this.onPressFooter}
        data={this.state.posts}
      />
    );
  }
}
