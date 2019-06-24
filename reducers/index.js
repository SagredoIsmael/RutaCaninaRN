import {combineReducers} from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import routes from './routesReducer'
import dataUser from './dataUsersReducer'
import dataMyUser from './dataMyUserReducer'
import newRoute from './newRouteReducer'
import routesScrollPos from './routesScrollPositionReducer'
import modals from './modalsReducer'
import UI from './UI'

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  dataUser: dataUser,
  dataMyUser: dataMyUser,
  dataRoutes: routes,
  dataNewRoute: newRoute,
  scrollPositionList: routesScrollPos,
  modals: modals,
  UI: UI,
})
