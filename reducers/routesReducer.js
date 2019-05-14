import { SET_DATA_ROUTES } from '../actions/types';

export default (state = [], action) => {
  switch(action.type){
    case SET_DATA_ROUTES:
      return action.payload
    default:
      return state
  }
}
