import {AppDispatch} from './redux-store';

export type ButtonsType = {
    inc: { id: number, title: string, disabled: boolean }
    reset: { id: number, title: string, disabled: boolean }
    set: { id: number, title: string, disabled: boolean }
}
export type CounterReducerType = {
    currentCount: number
    startCount: number
    maxCount: number
    counterStatus: 'disable'| 'error' | 'active'
    buttons: ButtonsType
    isMaxCountInputError: boolean
    isMinCountInputError: boolean
}

type SetCurrentCountActionType = {
    type: 'SET-CURRENT-COUNT'
    payload: number
}
type SetStartCountActionType = {
    type: 'SET-START-COUNT'
    payload: number
}
type SetMaxCountActionType = {
    type: 'SET-MAX-COUNT'
    payload: number
}
type SetCounterStatusActionType = {
    type: 'SET-COUNTER-STATUS'
    payload: 'error' | 'disable' | 'active'
}
export type SetIsIncButtonDisabledActionType = {
    type: 'SET-IS-INC-BUTTON-DISABLED'
    payload: boolean
}
type SetIsResetButtonDisabledActionType = {
    type: 'SET-IS-RESET-BUTTON-DISABLED'
    payload: boolean
}
type SetIsSetButtonDisabledActionType = {
    type: 'SET-IS-SET-BUTTON-DISABLED'
    payload: boolean
}
type IsMaxCountInputErrorActionType = {
    type: 'IS-MAX-COUNT-INPUT-ERROR'
    payload: boolean
}
type IsMinCountInputErrorActionType = {
    type: 'IS-MIN-COUNT-INPUT-ERROR'
    payload: boolean
}
type ActionsType = SetCurrentCountActionType | SetStartCountActionType | SetMaxCountActionType
    | SetCounterStatusActionType | SetIsIncButtonDisabledActionType | SetIsResetButtonDisabledActionType
| SetIsSetButtonDisabledActionType | IsMaxCountInputErrorActionType | IsMinCountInputErrorActionType

let initialState:CounterReducerType = {
    currentCount: 0,
    startCount: 0,
    maxCount: 0,
    counterStatus: 'disable',
    buttons: {
        inc: {id: 1, title: 'INC', disabled: true},
        reset: {id: 2, title: 'RESET', disabled: true},
        set: {id: 3, title: 'SET', disabled: false}
    },
    isMaxCountInputError: false,
    isMinCountInputError: false,
}

export function counterReducer(state = initialState, action:ActionsType): CounterReducerType {
    switch (action.type) {
        case 'SET-CURRENT-COUNT':
            return {...state,
                currentCount: action.payload
            }
        case 'SET-START-COUNT':
            return {...state,
                startCount: action.payload
            }
        case 'SET-MAX-COUNT':
            return {...state,
                maxCount: action.payload
            }
        case 'SET-COUNTER-STATUS':
            return {...state,
                counterStatus: action.payload
            }
        case 'SET-IS-INC-BUTTON-DISABLED':
            return {...state,
                buttons: {...state.buttons,
                inc: {...state.buttons.inc, disabled: action.payload}
                }
            }
        case 'SET-IS-RESET-BUTTON-DISABLED':
            return {...state,
                buttons: {...state.buttons,
                    reset: {...state.buttons.reset, disabled: action.payload}
                }
            }
        case 'SET-IS-SET-BUTTON-DISABLED':
            return {...state,
                buttons: {...state.buttons,
                    set: {...state.buttons.set, disabled: action.payload}
                }
            }
        case 'IS-MAX-COUNT-INPUT-ERROR':
            return {...state,
                isMaxCountInputError: action.payload
            }
        case 'IS-MIN-COUNT-INPUT-ERROR':
            return {...state,
                isMinCountInputError: action.payload
            }

        default:
            return state
    }
}

export const setCurrentCount = (payload:number) => ({type: 'SET-CURRENT-COUNT', payload})
export const setStartCount = (payload:number) => ({type: 'SET-START-COUNT', payload})
export const setMaxCount = (payload:number) => ({type: 'SET-MAX-COUNT', payload})
export const setCounterStatus = (payload:string) => ({type: 'SET-COUNTER-STATUS', payload})
export const setIsIncButtonDisabled = (payload:boolean) => ({type: 'SET-IS-INC-BUTTON-DISABLED', payload})
export const setIsResetButtonDisabled = (payload:boolean) => ({type: 'SET-IS-RESET-BUTTON-DISABLED', payload})
export const setIsSetButtonDisabled = (payload:boolean) => ({type: 'SET-IS-SET-BUTTON-DISABLED', payload})
export const isMaxCountInputError = (payload: boolean) => ({type: 'IS-MAX-COUNT-INPUT-ERROR', payload})
export const isMinCountInputError = (payload: boolean) => ({type: 'IS-MIN-COUNT-INPUT-ERROR', payload})

export const setCurrentCountWithPromise = (payload:number) => (dispatch: any) => {
    dispatch(setCurrentCount(payload))
    return Promise.resolve()
}