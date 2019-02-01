export default (state = '', action) => {
  switch(action.type){
    case 'insert_user':
      return action.payload
    default:
      return state
  }
}
 
