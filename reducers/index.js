import {combineReducers} from 'redux'
import getRoutes from './getRoutesReducer'
import getUserKey from './getKeyUser'
import getDataUser from './getDataUser'
import getDataMyUser from './getDataMyUser'
import newRoute from './newRoute'


export default combineReducers({
  dataUser: getDataUser,
  dataMyUser: getDataMyUser,
  dataRoutes: getRoutes,
  dataNewRoute: newRoute,
  keyUser : getUserKey
}) 
