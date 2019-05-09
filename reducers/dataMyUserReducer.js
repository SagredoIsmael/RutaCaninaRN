const initialState = {key: '', name:'', subscribedRoutes:[], image:'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FprofileAnonimous.jpg?alt=media&token=7db25a1d-fe41-46cd-bbbf-a19c9489a4cd'}

export default (state = initialState, action) => {
  switch(action.type){
    case 'insert_dataMyUser':
      return action.payload
    case 'CLEAR_KEY':
      return initialState
    default:
      return state
  }
}
