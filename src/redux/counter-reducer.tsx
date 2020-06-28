import {AppDispatch, InferActionsType} from './redux-store';

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

type ActionsType = InferActionsType<typeof actions>

export const actions = {
setCurrentCount: (payload:number) => ({type: 'SET-CURRENT-COUNT', payload} as const),
setStartCount: (payload:number) => ({type: 'SET-START-COUNT', payload} as const),
setMaxCount: (payload:number) => ({type: 'SET-MAX-COUNT', payload} as const),
setCounterStatus: (payload:'error' | 'disable' | 'active') => ({type: 'SET-COUNTER-STATUS', payload} as const),
setIsIncButtonDisabled: (payload:boolean) => ({type: 'SET-IS-INC-BUTTON-DISABLED', payload} as const),
setIsResetButtonDisabled: (payload:boolean) => ({type: 'SET-IS-RESET-BUTTON-DISABLED', payload} as const),
setIsSetButtonDisabled: (payload:boolean) => ({type: 'SET-IS-SET-BUTTON-DISABLED', payload} as const),
isMaxCountInputError: (payload: boolean) => ({type: 'IS-MAX-COUNT-INPUT-ERROR', payload} as const),
isMinCountInputError: (payload: boolean) => ({type: 'IS-MIN-COUNT-INPUT-ERROR', payload} as const),

}


