import {combineReducers} from 'redux'
import getRoutes from './getRoutesReducer'
import getDataUser from './getDataUser'
import getDataMyUser from './getDataMyUser'
import getNewRoute from './getNewRoute'
import scrollPositionList from './getScrollPositionList'


export default combineReducers({
  dataUser: getDataUser,
  dataMyUser: getDataMyUser,
  dataRoutes: getRoutes,
  dataNewRoute: getNewRoute,
  scrollPositionList: scrollPositionList
})
