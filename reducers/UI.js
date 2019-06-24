import {showMessage, hideMessage} from 'react-native-flash-message'
import { SHOW_LOADING_SUBSCRIBE_USER_ROUTE, HIDDEN_LOADING_SUBSCRIBE_USER_ROUTE, SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE } from '../actions/types'

const initialState = { loadingSubscribeUserRoute: false }

export default (state = initialState, action) => {
  switch (action.type) {

  case SHOW_LOADING_SUBSCRIBE_USER_ROUTE:
    return {...state, loadingSubscribeUserRoute: true}

  case HIDDEN_LOADING_SUBSCRIBE_USER_ROUTE:
    return {...state, loadingSubscribeUserRoute: false}

  case SHOW_SUCCESS_MESSAGE:
    showMessage({message: action.payload, type: "success", floating: true})
    return state

  case SHOW_ERROR_MESSAGE:
    showMessage({message: action.payload, type: "danger", floating: true})
    return state

  default:
    return state
  }
}
