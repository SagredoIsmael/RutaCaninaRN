
import { RESET_NEW_ROUTE, SET_DATA_ROUTES } from './types';


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
