import {combineReducers} from 'redux'
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
