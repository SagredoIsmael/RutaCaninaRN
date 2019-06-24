import { SHOW_LOADING_SUBSCRIBE_USER_ROUTE, HIDDEN_LOADING_SUBSCRIBE_USER_ROUTE, SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE } from './types';

export const showLoadingSubscribeUserRoute = () => {
  return {
    type: SHOW_LOADING_SUBSCRIBE_USER_ROUTE
  }
}

export const hiddenLoadingSubscribeUserRoute = () => {
  return {
    type: HIDDEN_LOADING_SUBSCRIBE_USER_ROUTE
  }
}

export const showSuccessMessage = message => {
  return {
    type: SHOW_SUCCESS_MESSAGE,
    payload: message
  }
}

export const showErrorMessage = message => {
  return {
    type: SHOW_ERROR_MESSAGE,
    payload: message
  }
}
