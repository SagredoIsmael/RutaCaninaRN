export default (state = {name:'', photo:'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FdefectRoute.jpg?alt=media&token=86c6aedb-8a51-4e70-b42b-78cd4949613f',
detail:'', date:'', coords:[]}, action) => {
  switch(action.type){
    case 'insert_newRoute':
      return action.payload
    default:
      return state
  }
}
