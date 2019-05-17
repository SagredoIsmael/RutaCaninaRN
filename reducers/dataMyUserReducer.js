import { SET_DATA_MY_USER, RESET_DATA_MY_USER } from '../actions/types'

const initialState = {key: '', name:'', subscribedRoutes:[], image:'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FprofileAnonimous.jpg?alt=media&token=7db25a1d-fe41-46cd-bbbf-a19c9489a4cd'}

export default (state = initialState, action) => {
  switch(action.type){
    case SET_DATA_MY_USER:
      return action.payload
    case RESET_DATA_MY_USER:
      return initialState
    default:
      return state
  }
}
