import {combineReducers} from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import routes from './routesReducer'
import dataUser from './dataUsersReducer'
import dataMyUser from './dataMyUserReducer'
import newRoute from './newRouteReducer'
import routesScrollPos from './routesScrollPositionReducer'
import modals from './modalsReducer'



export default combineReducers({
  dataUser: dataUser,
  dataMyUser: dataMyUser,
  dataRoutes: routes,
  dataNewRoute: newRoute,
  scrollPositionList: routesScrollPos,
  modals: modals
})

export const initialState = {}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})
