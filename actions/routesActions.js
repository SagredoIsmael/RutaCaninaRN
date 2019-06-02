import Fire from '../api/Fire'
import { RESET_NEW_ROUTE, SET_POSITION_SCROLL_LIST, RESET_POSITION_SCROLL_LIST, REQUEST_DATA_ROUTES, SUCCESS_DATA_ROUTES, ERROR_DATA_ROUTES, SET_EDITING_ROUTE } from './types';
import {fetchUser} from './usersActions'

export const resetNewRoute = () => {
  return {
    type: RESET_NEW_ROUTE
  }
}

export const setEditingRoute = (route) => {
  return {
    type: SET_EDITING_ROUTE,
    payload: route
  }
}

export const insertScrollPositionList = scrollPositionList => {
  return {
    type: SET_POSITION_SCROLL_LIST,
    payload: scrollPositionList
  }
}

export const resetScrollPositionList = () => {
  return {
    type: RESET_POSITION_SCROLL_LIST
  }
}

export const requestDataRoutes = () => {
  return {
    type: REQUEST_DATA_ROUTES
  }
}

export const successDataRoutes = (dataRoutes) => {
  return {
    type: SUCCESS_DATA_ROUTES,
    payload: dataRoutes
  }
}

export const errorDataRoutes = (error) => {
  return {
    type: ERROR_DATA_ROUTES,
    payload: error
  }
}

export const fetchRoutes = () => (dispatch, getState) => {
  _fetchRoutesFire(dispatch, getState)
}

const _fetchRoutesFire = async(dispatch, getState) => {
  if (getState().dataRoutes.loading) {
    return
  }
  dispatch(requestDataRoutes())
  const data = await Fire.shared.getRoutes()
  dispatch(successDataRoutes(data))
  dispatch(fetchUser())
}
