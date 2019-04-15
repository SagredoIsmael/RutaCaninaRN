import uuid from "uuid";
import React from "react";
import {Alert} from "react-native";
import {ImageManipulator} from "expo";
import getUserInfo from "../utils/getUserInfo";
import shrinkImageAsync from "../utils/shrinkImageAsync";
const firebase = require("firebase");
require("firebase/firestore");

class Fire extends React.Component {
  constructor() {
    super();
    firebase.initializeApp({
      apiKey: "AIzaSyBN6ndtrkgfg4sDr3EVrAUWvd_fv7PVgj0",
      authDomain: "rutacaninarn.firebaseapp.com",
      databaseURL: "https://rutacaninarn.firebaseio.com",
      projectId: "rutacaninarn",
      storageBucket: "rutacaninarn.appspot.com",
      messagingSenderId: "242809173599"
    });

    firebase.firestore().settings( { timestampsInSnapshots: true })



    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
        console.log("UID user: anónimo");
      } else {
        console.log("UID user: ", user.uid);
      }
    });
  }

  registryUser = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  loginUser(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logOutUser() {
    return firebase.auth().signOut();
  }


  //API MESSAGES Chat

  sendMessage = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        userId: user._id,
        userName: user.name,
        userAvatar: user.avatar,
        timestamp: this.timestamp,
      }

      this.append(message, user.keyRoute);
    }
  }

   append = (message, keyRoute) => {
     let randomStringID =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
     let ref = firebase.firestore().collection("routes").doc(keyRoute).collection("chat").doc(randomStringID)
     ref.set(message, {merge: false});
   }

   getMessages = async (keyRoute) => {
     let ref = firebase.firestore().collection("routes").doc(keyRoute).collection("chat")
     try {
       const querySnapshot = await ref.get();
       const data = [];
       querySnapshot.forEach(function(doc) {
         if (doc.exists) {
           const post = doc.data() || {};
           const _id = doc.id
           const text = post.text
           const createdAt = new Date(post.timestamp);
           const user = {
             _id : post.userId,
             name : post.userName,
             avatar : post.userAvatar
           }
           const message = {
             _id,
             text,
             createdAt,
             user,
           };
           data.push(message);
         }
       });
       return {data};
     } catch ({message}) {
       alert(message);
     }
   };


  //API ROUTES///////////////////

  // Download Data Route
  getRoutes = async ({size, start}) => {
    console.log("in getpage: ", "Size:", size, "start", start);
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
          const route = {
            key: doc.id,
            image: img || "https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FdefectRoute.jpg?alt=media&token=86c6aedb-8a51-4e70-b42b-78cd4949613f",
            name: (title || "Desconocido").trim(),
            ...post
          };
          data.push(route);
        }
      });
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return {data, cursor: lastVisible};
    } catch ({message}) {
      alert(message);
    }
  }

  createNewRouteWithAttributes = async (attributesDicc, newValuePhotoPathRoute) => {
    let ref = firebase.firestore().collection("routes")
    var newIdRoute = -1
    await ref.add(attributesDicc).then(data => {
      if (newValuePhotoPathRoute != null)
        this.uploadImageRouteAsync(newValuePhotoPathRoute, data.id)
        newIdRoute = data.id
    }).catch(function(error) {
      console.error("Error adding new route: ", error);
    })
    return newIdRoute
  }

  uploadImageRouteAsync = async (uri, keyRoute) => {
    const ref = firebase.storage().ref().child("routesPhotos").child(keyRoute).child("photo");

    const resultFetch = await this._fetchUploadImage(ref, uri)

    if (resultFetch){
      const attributesDicc = {
        image: resultFetch
      };
      return this.updateAttributeRoute(attributesDicc, keyRoute);
    }else{
      return false
    }
  }

  updateAttributeRoute = async (attributesDicc, keyRoute) => {
    let ref = firebase.firestore().collection("routes").doc(keyRoute);
    await ref.set(attributesDicc, {merge: true});
    return true
  }

  addAssistantsRoute = async (attributesDicc, keyRoute, subscribedRoutes) => {
    let ref = firebase.firestore().collection("routes").doc(keyRoute).collection("assistants").doc(this.uid);

    try {
      await ref.set(attributesDicc, {merge: true})

      subscribedRoutes
        ? subscribedRoutes.push(keyRoute)
        : subscribedRoutes = [keyRoute]

      const newSubscribedRoutes = {
        subscribedRoutes: subscribedRoutes
      }
      return this.updateAttributeUser(newSubscribedRoutes);
    } catch ({message}) {
      console.log(message);
      return false
    }
  }

  deleteAssistantsRoute = async (keyRoute, subscribedRoutes) => {
    let ref = firebase.firestore().collection("routes").doc(keyRoute).collection("assistants").doc(this.uid);

    try {

      await ref.delete()
      var index = subscribedRoutes.indexOf(keyRoute);
      subscribedRoutes.splice(index, 1);

      const newSubscribedRoutes = {
        subscribedRoutes: subscribedRoutes
      }
      return this.updateAttributeUser(newSubscribedRoutes);

    } catch ({message}) {
      console.log(message);
      return false
    }
  }

  getUserAssistants = async keyRoute => {
    let ref = firebase.firestore().collection("routes").doc(keyRoute).collection("assistants")
    try {
      const queryData = await ref.get()
      const data = [];
      queryData.forEach(function(doc) {

        if (doc.exists) {
          const post = doc.data() || {};
          const assistant = {
            key: doc.id,
            image: post.imageCreator,
            name: post.nameCreator
          };
          data.push(assistant);
        }
      });
      return {data};
    } catch ({message}) {
      console.log("Error. No se puede obtener la infoMyUser");
      alert(message);
    }
  }

  //API USER/////////////////////

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
          const user = {
            key: doc.id,
            image: img || "https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FprofileAnonimous.jpg?alt=media&token=7db25a1d-fe41-46cd-bbbf-a19c9489a4cd",
            name: (title || "Desconocido").trim(),
            ...post
          };
          data.push(user);
        }
      });
      return {data};
    } catch ({message}) {
      alert(message);
    }
  };

  getInfoUser = async keyUser => {
    let ref = firebase.firestore().collection("users").doc(keyUser);
    try {
      const queryData = await ref.get();
      if (queryData.exists) {
        const post = queryData.data() || {};
        const title = post.title;
        const img = post.image;
        const {data} = await this.getDogsByUser(keyUser);
        // Iteratively add dogs
        let dogs = {};
        for (let child of data) {
          dogs[child.key] = child;
        }
        const dataUser = {
          key: queryData.id,
          image: img || "https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FprofileAnonimous.jpg?alt=media&token=7db25a1d-fe41-46cd-bbbf-a19c9489a4cd",
          name: (title || "Desconocido").trim(),
          dogs: dogs || [],
          ...post
        };
        return {dataUser};
      } else {
        console.log("Error", message);
        alert("Error en la identificación de tu usuario. Por favor inicia sesión")
      }
    } catch ({message}) {
      console.log("Error", message);
      alert("Error en la identificación de tu usuario. Por favor inicia sesión")
    }
  }

  resizeImage = async uri => {
    const manipResult = await ImageManipulator.manipulateAsync(uri, [
      {
        resize: {
          width: 200,
          height: 200
        }
      }
    ], {format: "jpeg"});
    return manipResult.uri;
  }

  _fetchUploadImage = async (ref, uri) => {
    const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
              resolve(xhr.response)
          };
          xhr.onerror = (e) => {
              reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
      });

      const metadata = {
        contentType: 'image/jpeg',
      }

      return (downloadURL = await new Promise((resolve, reject) => {
      try {
        ref.put(blob, metadata).then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve(downloadURL);
          });
        });
      } catch (err) {
        reject(err);
      }
      }));
  }

  uploadImageUserAsync = async uri => {

    //const uriImageResize = this.resizeImage(uri)

    const ref = firebase.storage().ref().child("usersPhotos").child(this.uid).child("photo");

    const resultFetch = await this._fetchUploadImage(ref, uri)

    if (resultFetch){
      const attributesDicc = {
        image: resultFetch
      };
      return this.updateAttributeUser(attributesDicc);
    }else{
      return false
    }
  }

  ////////DOGS API///////////////////

  // Download Data Dogs by User
  getDogsByUser = async keyUser => {
    let ref = firebase.firestore().collection("users").doc(keyUser).collection("dogs");
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
            image: img || "https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FavatarDog.png?alt=media&token=821fdff6-ad3d-4547-b7cf-2dd21230f0df",
            name: (title || "Desconocido").trim(),
            ...post
          };
          data.push(route);
        }
      });
      return {data};
    } catch ({message}) {
      alert(message);
    }
  };

  uploadImageDogAsync = async (uri, keyDog) => {

    //const uriImageResize = this.resizeImage(uri)

    const ref = firebase.storage().ref().child("dogsPhotos").child(this.uid).child(keyDog);

    const resultFetch = await this._fetchUploadImage(ref, uri)

    if (resultFetch){
      const attributesDicc = {
        avatar: resultFetch
      };
      return this.updateAttributeDog(attributesDicc, keyDog);
    }else{
      return false
    }
  }

  updateAttributeDog = async (attributesDicc, keyDog) => {
    let ref = firebase.firestore().collection("users").doc(this.uid).collection("dogs").doc(keyDog);
    await ref.set(attributesDicc, {merge: true});
    return true;
  }

  updateAttributeUser = async attributesDicc => {
    try {
      let ref = this.firestoreMyUser;
      await ref.set(attributesDicc, {merge: true});
      return true;
    } catch ({message}) {
      console.log('Error', message);
      alert(message);
    }
  }

  createNewDogWithAttributes = async (attributesDicc, newValuePhotoPathDog) => {
    let ref = firebase.firestore().collection("users").doc(this.uid).collection("dogs");
    await ref.add(attributesDicc).then(data => {
      if (newValuePhotoPathDog){
        return this.uploadImageDogAsync(newValuePhotoPathDog, data.id);
      }else{
        return true
      }
    }).catch(function(error) {
      console.error("Error adding new dog: ", error);
    })
  }

  deleteCompletDog = async keyDog => {
    let ref = firebase.firestore().collection("users").doc(this.uid).collection("dogs").doc(keyDog);
    await ref.delete();
  }

  // Helpers
  get collectionRoutes() {
    return firebase.firestore().collection("routes");
  }

  get collectionUsers() {
    return firebase.firestore().collection("users");
  }

  get firestoreMyUser() {
    return firebase.firestore().collection("users").doc(this.uid);
  }

  get firestoreMysDogsByMyUser() {
    return firebase.firestore().collection("users").doc(this.uid).collection("dogs");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();

export default Fire
