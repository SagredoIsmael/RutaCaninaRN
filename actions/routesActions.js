
import { RESET_NEW_ROUTE, SET_DATA_ROUTES, SET_DATA_NEW_ROUTE, SET_POSITION_SCROLL_LIST, RESET_POSITION_SCROLL_LIST } from './types';


export const resetNewRoute = () => {
  return {
    type: RESET_NEW_ROUTE
  }
}

export const insertDataRoutes = dataRoutes => {
  return {
    type: SET_DATA_ROUTES,
    payload: dataRoutes
  }
}


export const insertDataNewRoute = dataNewRoute => {
  return {
    type: SET_DATA_NEW_ROUTE,
    payload: dataNewRoute
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
