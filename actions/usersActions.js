
import { SET_DATA_MY_USER } from './types';



export const insertDataMyUser = dataUser => {
  return {
    type: SET_DATA_MY_USER,
    payload: dataUser
  }
}
