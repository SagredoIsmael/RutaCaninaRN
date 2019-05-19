import Fire from "../api/Fire"
import { SET_DATA_MY_USER, RESET_DATA_MY_USER, SET_DATA_NAME_USER } from '../actions/types'


const initialState = {key: '', name:'', subscribedRoutes:[], image:'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FprofileAnonimous.jpg?alt=media&token=7db25a1d-fe41-46cd-bbbf-a19c9489a4cd'}

export default (state = initialState, action) => {
  switch(action.type){

    case SET_DATA_MY_USER:
      return action.payload

    case RESET_DATA_MY_USER:
      return initialState

    case SET_DATA_NAME_USER:
      _updateAttributeUser({name: action.payload})
      const newState1 = { ...state }
      newState1.name = action.payload
      return newState1

    default:
      return state
  }
}

export const _updateAttributeUser = (attribute) => {
  Fire.shared.updateAttributeUser(attribute)
}
