const initialState = {title:'', photo:'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FdefectRoute.jpg?alt=media&token=86c6aedb-8a51-4e70-b42b-78cd4949613f',
description:'', date:'', time:'', duration:'', coords:[]}

export default (state = initialState, action) => {

  switch(action.type){
    case 'insert_dataNewRoute':
      return action.payload
    case 'reset_newRoute': //not working
      return initialState
    default:
      return state
  }
}
