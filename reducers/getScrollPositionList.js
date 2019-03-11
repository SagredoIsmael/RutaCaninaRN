export default (state = {keyRoute: ''}, action) => {
  switch(action.type){
    case 'insert_scrollPositionList':
      return action.payload
    default:
      return state
  }
}
