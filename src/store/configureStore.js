import {createStore, combineReducers ,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import tweetsReducer from '../reducer/tweetsReducer'

const configureStore=()=>{
    const store=createStore(combineReducers({
        tweets:tweetsReducer
    }),applyMiddleware(thunk))
    return store
}
export default configureStore