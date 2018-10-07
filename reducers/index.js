import {combineReducers} from 'redux'
import getRoutes from './getRoutesReducer'
import getUserKey from './getKeyUser'
import getDataUser from './getDataUser'


export default combineReducers({
  dataUser: getDataUser,
  dataRoutes: getRoutes,
  keyUser : getUserKey
})
