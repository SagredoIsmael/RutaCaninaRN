import uuid from 'uuid';
import React from 'react';
import {
  Alert,
} from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../actions'
import getUserInfo from '../utils/getUserInfo';
import shrinkImageAsync from '../utils/shrinkImageAsync';
const firebase = require('firebase');
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


  registryUser = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)

  }

  loginUser (email, password){
    return firebase.auth().signInWithEmailAndPassword(email,password)
  }

  logOutUser () {
    return firebase.auth().signOut()
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

  getInfoMyUser = async () => {
    let ref = this.firestoreMyUser;
    try {
        const queryData = await ref.get()
          if (queryData.exists) {
            const post = queryData.data() || {};
            const title = post.title;
            const img = post.image;
            const { data } = await this.getDogsByUser();
            // Iteratively add dogs
            let dogs = {};
            for (let child of data) {
              dogs[child.key] = child;
            }
            const dataUser = {
              key: queryData.id,
              image: (img || "https://bootdey.com/img/Content/avatar/avatar6.png"),
              name: (title || 'Desconocido').trim(),
              dogs: (dogs || []),
              ...post,
            };
            return {dataUser}
          }else{
            console.log("No se puede obtener la infoMyUser");
          }

    } catch ({ message }) {
      console.log("No se puede obtener la infoMyUser");
      alert(message);
    }
  }

  // Download Data Dogs by User
   getDogsByUser = async () => {
     let ref = this.firestoreMysDogsByUser;
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



uploadImageUserAsync= async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child('usersPhotos').child(this.uid).child('photo')
    const snapshot = await ref.put(blob);
    const urlPhoto = await snapshot.ref.getDownloadURL()
  return this.updateURLPhotoUser(urlPhoto)
}

uploadImageDogAsync= async (uri, keyDog) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child('dogsPhotos').child(this.uid).child(keyDog)
    const snapshot = await ref.put(blob);
    const urlPhoto = await snapshot.ref.getDownloadURL()
  return this.updateURLPhotoDog(urlPhoto, keyDog)
}

updateURLPhotoUser = urlPhoto => {
  let ref = this.firestoreMyUser;
  var setAda = ref.set({
  image: urlPhoto
  }, { merge: true });
  return urlPhoto
}

updateURLPhotoDog = (urlPhoto, keyDog) => {
  let ref = firebase.firestore().collection('users').doc(this.uid).collection('dogs').doc(keyDog);
  var setAda = ref.set({
  avatar: urlPhoto
  }, { merge: true });
  return urlPhoto
}

updateNameUser = async (name) => {
  let ref = this.firestoreMyUser;
  var setAda = await ref.set({
  name: name
  }, { merge: true });
  return name
}

  // Helpers
  get collectionRoutes() {
    return firebase.firestore().collection('routes');
  }

  get collectionUsers() {
    return firebase.firestore().collection('users');
  }

  get firestoreMyUser() {
    return firebase.firestore().collection('users').doc(this.uid)
  }

  get firestoreMysDogsByUser() {
    return firebase.firestore().collection('users').doc(this.uid).collection('dogs');
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
