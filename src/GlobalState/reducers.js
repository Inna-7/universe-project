import { combineReducers } from 'redux'
import user from './UserReducer'
import logState from './LoginStateReducer'

export const rootReducer = combineReducers({
    user,
    logState
})
