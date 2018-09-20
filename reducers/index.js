import {combineReducers} from 'redux'
import getRoutes from './getRoutesReducer'

export default combineReducers({
  dataRoutes: getRoutes
})
