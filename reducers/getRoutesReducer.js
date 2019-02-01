export default (state = [], action) => {
  switch(action.type){
    case 'insert_dataRoutes':
      return action.payload
    default:
      return state
  }
}
 
