import {applyMiddleware, combineReducers, createStore} from 'redux'
import {counterReducer} from './counter-reducer'
import thunk from 'redux-thunk';



let state = combineReducers({
    counter: counterReducer
})
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsType<T extends {[key: string]: (...args:any)=>any}> = ReturnType<PropertiesType<T>>

export type RootState = ReturnType<typeof state>
export type AppDispatch = typeof store.dispatch

export const store = createStore(state, applyMiddleware(thunk))