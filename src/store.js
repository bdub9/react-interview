import { createStore, combineReducers, applyMiddleware } from 'redux'
import comics from './comics'
import thunk from 'redux-thunk';
export default createStore(combineReducers({
    comics
}), applyMiddleware(thunk))