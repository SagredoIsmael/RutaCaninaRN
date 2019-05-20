
import { RESET_NEW_ROUTE, SET_POSITION_SCROLL_LIST, RESET_POSITION_SCROLL_LIST, REQUEST_DATA_ROUTES, SUCCESS_DATA_ROUTES, ERROR_DATA_ROUTES } from './types';


export const resetNewRoute = () => {
  return {
    type: RESET_NEW_ROUTE
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
