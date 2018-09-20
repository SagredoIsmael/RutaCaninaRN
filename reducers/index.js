import {combineReducers} from 'redux'
import getRoutes from './getRoutesReducer'
import getUserKey from './getKeyUser'

export default combineReducers({
  dataRoutes: getRoutes,
  keyUser : getUserKey
})
