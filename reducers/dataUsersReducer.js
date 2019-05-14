import { SET_DATA_USERS } from '../actions/types'


export default (state = {name:'', image:'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FprofileAnonimous.jpg?alt=media&token=7db25a1d-fe41-46cd-bbbf-a19c9489a4cd'}, action) => {
  switch(action.type){
    case SET_DATA_USERS:
      return action.payload
    default:
      return state
  }
}
