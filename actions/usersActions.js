
import { SET_DATA_MY_USER, RESET_DATA_MY_USER, SET_DATA_USERS } from './types'




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
