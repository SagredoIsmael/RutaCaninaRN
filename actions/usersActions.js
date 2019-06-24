import Fire from '../api/Fire'
import { showLoadingSubscribeUserRoute, hiddenLoadingSubscribeUserRoute, showSuccessMessage, showErrorMessage } from './UI'
import { SET_DATA_MY_USER, RESET_DATA_MY_USER, SET_DATA_USERS, SET_DATA_NAME_USER, REQUEST_DATA_USER, REQUEST_ADD_ASSISTANT_ROUTE, REQUEST_DELETE_ASSISTANT_ROUTE, SUCCESS_ADD_ASSISTANT_ROUTE, SUCCESS_DELETE_ASSISTANT_ROUTE, ERROR_ADD_ASSISTANT_ROUTE, ERROR_DELETE_ASSISTANT_ROUTE } from './types'

export const requestDataUser = () => {
  return {
    type: REQUEST_DATA_USER
  }
}

export const successDataUser = dataUser => {
  return {
    type: SET_DATA_MY_USER,
    payload: dataUser
  }
}

export const insertDataMyUser = dataUser => {
  return {
    type: SET_DATA_MY_USER,
    payload: dataUser
  }
}

export const resetDataMyUser = () => {
  return {
    type: RESET_DATA_MY_USER
  }
}

export const insertDataUsers = dataUsers => {
  return {
    type: SET_DATA_USERS,
    payload: dataUsers
  }
}

//For update name user
export const insertDataNameUser = nameUser => {
  return {
    type: SET_DATA_NAME_USER,
    payload: nameUser
  }
}

export const requestAddAssistantRoute = () => {
  return {
    type: REQUEST_ADD_ASSISTANT_ROUTE
  }
}

export const successAddAssistantRoute = keyRoute => {
  return {
    type: SUCCESS_ADD_ASSISTANT_ROUTE,
    payload: keyRoute
  }
}

export const errorAddAssistantRoute = () => {
  return {
    type: ERROR_ADD_ASSISTANT_ROUTE
  }
}

export const requestDeleteAssistantRoute = () => {
  return {
    type: REQUEST_DELETE_ASSISTANT_ROUTE
  }
}

export const successDeleteAssistantRoute = keyRoute => {
  return {
    type: SUCCESS_DELETE_ASSISTANT_ROUTE,
    payload: keyRoute
  }
}

export const errorDeleteAssistantRoute = () => {
  return {
    type: ERROR_DELETE_ASSISTANT_ROUTE
  }
}

export const fetchUser = () => (dispatch, getState) => {
  _fetchUserFire(dispatch, getState)
}

const _fetchUserFire = async(dispatch, getState) => {
  if (getState().dataMyUser.key == '' && Fire.shared.uid && Fire.shared.uid != '') {
    dispatch(requestDataUser())
    const {dataUser} = await Fire.shared.getInfoUser(Fire.shared.uid)
    dispatch(successDataUser(dataUser))
  }
}

export const fetchAssistantsRoute = (action, keyRoute) => (dispatch, getState) => {
  switch (action) {
    case 'add':
      _addAsistantFire(dispatch, getState, keyRoute)
      break

    case 'delete':
      _deleteAsistantFire(dispatch, getState, keyRoute)
      break

    default:
      break
  }
}

const _addAsistantFire = async(dispatch, getState, keyRoute) => {
  const attributesSubscribe = {
    nameCreator: getState().dataMyUser.name,
    imageCreator: getState().dataMyUser.image
  }
  dispatch(showLoadingSubscribeUserRoute())
  dispatch(requestAddAssistantRoute())
  const response = await Fire.shared.addAssistantsRoute(attributesSubscribe, keyRoute, getState().dataMyUser.subscribedRoutes)
  if (response) {
    dispatch(successAddAssistantRoute(keyRoute))
    dispatch(showSuccessMessage("¡Te has apuntado a la ruta!"))
  }else{
    dispatch(showErrorMessage("Ha ocurrido un error al apuntarte. Inténtalo más tarde"))
    dispatch(errorAddAssistantRoute())
  }
  dispatch(hiddenLoadingSubscribeUserRoute())
}

const _deleteAsistantFire = async(dispatch, getState, keyRoute) => {
  dispatch(showLoadingSubscribeUserRoute())
  dispatch(requestDeleteAssistantRoute())
  const response = await Fire.shared.deleteAssistantsRoute(keyRoute, getState().dataMyUser.subscribedRoutes)
  if (response) {
    dispatch(successDeleteAssistantRoute(keyRoute))
    dispatch(showErrorMessage("Te has desapuntado de la ruta"))
  }else{
    dispatch(showErrorMessage("Ha ocurrido un error al desapuntarte. Inténtalo más tarde"))
    dispatch(errorDeleteAssistantRoute())
  }
  dispatch(hiddenLoadingSubscribeUserRoute())
}
