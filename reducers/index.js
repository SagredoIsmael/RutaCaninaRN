import {combineReducers} from 'redux'
import getRoutes from './getRoutesReducer'
import getDataUser from './getDataUser'
import getDataMyUser from './getDataMyUser'
import newRoute from './newRoute'
import scrollPositionList from './getScrollPositionList'


export default combineReducers({
  dataUser: getDataUser,
  dataMyUser: getDataMyUser,
  dataRoutes: getRoutes,
  dataNewRoute: newRoute,
  scrollPositionList: scrollPositionList
})
