import Fire from "../api/Fire"
import { SET_DATA_ROUTES, REQUEST_DATA_ROUTES } from '../actions/types';

export default (state = [], action) => {
  switch(action.type){

    case SET_DATA_ROUTES:
      return action.payload

    case REQUEST_DATA_ROUTES:
      return _routesRequest()

    default:
      return state
  }
}


export const _routesRequest = async() => {
  const {data} = await Fire.shared.getRoutes()

  let posts = {};
  for (let child of data) {
    posts[child.key] = child;
  }

  return Object.values(posts).sort((a, b) => a.timestamp < b.timestamp)
}
