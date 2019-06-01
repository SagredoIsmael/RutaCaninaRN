import { createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk';
import {rootReducer} from '../reducers'

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger))


export default store
