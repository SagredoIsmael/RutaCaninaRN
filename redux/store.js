import { createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from '../api/firebaseConfig.js'
import {rootReducer} from '../reducers'

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })


const store = createStore(rootReducer, applyMiddleware(logger))


export default store
