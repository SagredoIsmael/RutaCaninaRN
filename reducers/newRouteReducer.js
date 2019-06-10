
import { RESET_NEW_ROUTE, SET_DATA_NEW_ROUTE, SET_EDITING_ROUTE } from '../actions/types';


const initialState = {isEditing: false, title:'', image:'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FdefectRoute.jpg?alt=media&token=86c6aedb-8a51-4e70-b42b-78cd4949613f',
description:'', date:'', time:'', coords:[]}

export default (state = initialState, action) => {

  switch(action.type){
    case SET_DATA_NEW_ROUTE:
      return action.payload
    case RESET_NEW_ROUTE:
      return initialState
    case SET_EDITING_ROUTE:
      return action.payload
    default:
      return state
  }
}
