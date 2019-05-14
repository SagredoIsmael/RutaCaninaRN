import { SET_POSITION_SCROLL_LIST, RESET_POSITION_SCROLL_LIST } from '../actions/types';

const initialState = { keyRoute: '' }

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_POSITION_SCROLL_LIST:
    return action.payload
  case RESET_POSITION_SCROLL_LIST:
    return {initialState}
  default:
    return state
  }
}
