import { REQUEST_DATA_ROUTES, SUCCESS_DATA_ROUTES, ERROR_DATA_ROUTES } from '../actions/types'

const initialState = {
  items: [],
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type){

    case REQUEST_DATA_ROUTES:
      return {
        ...state,
        loading: true,
        error: null
      }

    case SUCCESS_DATA_ROUTES:
      return {
        ...state,
        loading: false,
        items: action.payload.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
      }

    case ERROR_DATA_ROUTES:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: []
      }

    default:
      return state
  }
}
