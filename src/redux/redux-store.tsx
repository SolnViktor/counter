import {applyMiddleware, combineReducers, createStore} from 'redux'
import {counterReducer} from './counter-reducer'
import thunk from 'redux-thunk';



let state = combineReducers({
    counter: counterReducer
})
export type RootState = ReturnType<typeof state>
export type AppDispatch = typeof store.dispatch

export const store = createStore(state, applyMiddleware(thunk))