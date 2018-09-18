import {combineReducers} from 'redux'
import superheroesReducer from './superheroesReducers'

export default combineReducers({
  superheroes: superheroesReducer
})
