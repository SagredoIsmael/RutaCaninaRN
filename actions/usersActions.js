import Fire from '../api/Fire'
import { SET_DATA_MY_USER, RESET_DATA_MY_USER, SET_DATA_USERS, SET_DATA_NAME_USER, REQUEST_DATA_USER } from './types'

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

export const fetchUser = () => (dispatch, getState) => {
  _fetchUserFire(dispatch, getState)
}

const _fetchUserFire = async(dispatch, getState) => {
  if (getState().dataMyUser.key == '' && Fire.shared.uid) {
    dispatch(requestDataUser())
    const {dataUser} = await Fire.shared.getInfoUser(Fire.shared.uid)
    dispatch(successDataUser(dataUser))
  }
}
