import uuid from 'uuid';
import React from 'react';
import {
  Alert,
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../actions'
import getUserInfo from '../utils/getUserInfo';
import shrinkImageAsync from '../utils/shrinkImageAsync';
import uploadPhoto from '../utils/uploadPhoto';
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

class Fire extends React.Component {

  constructor() {
    super()
    firebase.initializeApp({
      apiKey: "AIzaSyBN6ndtrkgfg4sDr3EVrAUWvd_fv7PVgj0",
      authDomain: "rutacaninarn.firebaseapp.com",
      databaseURL: "https://rutacaninarn.firebaseio.com",
      projectId: "rutacaninarn",
      storageBucket: "rutacaninarn.appspot.com",
      messagingSenderId: "242809173599"
    });
    // Some nonsense...
    firebase.firestore().settings({ timestampsInSnapshots: true });

    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
        console.log('UID user: anónimo');
      }else{
        console.log('UID user: ',user.uid);
      }
    });
  }


  registryUser (email, password, name){
    return firebase.auth().createUserWithEmailAndPassword(email,password)
  }

  loginUser (email, password){
    return firebase.auth().signInWithEmailAndPassword(email,password)
  }


  // Download Data Route
  getRoutes = async ({ size, start }) => {
    console.log('in getpage: ', 'Size:', size, 'start', start);
    //Get all users
    const users = await this.getUsers();
    let ref = this.collectionRoutes;
    try {
      // if (start) {
      //   ref = ref.startAfter(start);
      // }
      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const post = doc.data() || {};
          const title = post.title;
          const img = post.image;
          for (let userProp of users["data"]) {
            if (post.creatorUser == userProp.key){
              const route = {
                user: userProp,
                key: doc.id,
                image: (img || "https://www.mundoperro.net/wp-content/uploads/cachorros-de-Weimaraner-jugando.jpg"),
                name: (title || 'Desconocido').trim(),
                ...post,
              };
              data.push(route);
            }
          };
        }
      });
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };


 // Download Data User
  getUsers = async () => {
    let ref = this.collectionUsers;
    try {
      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const post = doc.data() || {};
          const title = post.title;
          const img = post.image;
          const route = {
            key: doc.id,
            image: (img || "https://www.mundoperro.net/wp-content/uploads/cachorros-de-Weimaraner-jugando.jpg"),
            name: (title || 'Desconocido').trim(),
            ...post,
          };
          data.push(route);
        }
      });
      return { data };
    } catch ({ message }) {
      alert(message);
    }
  };


  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${'routes'}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        localUri,
      );

      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      this.collectionRoutes.add({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        user: getUserInfo(),
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  // Helpers
  get collectionRoutes() {
    return firebase.firestore().collection('routes');
  }

  get collectionUsers() {
    return firebase.firestore().collection('users');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();


export default Fire;
