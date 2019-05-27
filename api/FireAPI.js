import uuid from "uuid";
import React from "react";
import {connect} from 'react-redux'
import {Alert} from "react-native";
import {ImageManipulator} from "expo";
import getUserInfo from "../utils/getUserInfo";
import shrinkImageAsync from "../utils/shrinkImageAsync"
import {successDataRoutes} from '../actions/routesActions'
const firebase = require("firebase");
require("firebase/firestore");

class Fire extends React.Component {

      componentWillMount() {
        firebase.initializeApp({
          apiKey: "AIzaSyBN6ndtrkgfg4sDr3EVrAUWvd_fv7PVgj0",
          authDomain: "rutacaninarn.firebaseapp.com",
          databaseURL: "https://rutacaninarn.firebaseio.com",
          projectId: "rutacaninarn",
          storageBucket: "rutacaninarn.appspot.com",
          messagingSenderId: "242809173599"
        })
      }

      // Download Data Route
      static getRoutes = async () => {
        try {
          const querySnapshot = await firebase.firestore().collection("routes").get()
          const data = []
          querySnapshot.forEach(function(doc) {
            if (doc.exists) {
              const post = doc.data() || {}
              const title = post.title
              const img = post.image
              const route = {
                key: doc.id,
                image: img || "https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FdefectRoute.jpg?alt=media&token=86c6aedb-8a51-4e70-b42b-78cd4949613f",
                name: (title || "Desconocido").trim(),
                ...post
              };
              data.push(route)
            }
          })
        } catch ({message}) {
          alert(message)
        }
      }
  }

  const mapStateToProps = state => {
    return {routes: state.dataRoutes.items}
  }

  const mapDispatchToProps = dispatch => {
    return {
      successDataRoutes: (routes) => {
        dispatch(successDataRoutes(routes))
      },
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Fire)
