import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import Counter from './Component/Counter/counter';
import SetCounter from './Component/SetCounter/setCounter';
import {connect} from 'react-redux';
import {
    CounterReducerType,
} from './redux/counter-reducer';
import {AppDispatch, RootState} from './redux/redux-store';
import {actions} from './redux/counter-reducer'

type AppPropsType = {
    counter: CounterReducerType
    setCurrentCount: (payload:number) => void
    setStartCount: (payload:number) => void
    setMaxCount: (payload:number) => void
    setCounterStatus: (payload:'error' | 'disable' | 'active') => void
    setIsIncButtonDisabled: (payload:boolean) => void
    setIsResetButtonDisabled: (payload:boolean) => void
    setIsSetButtonDisabled: (payload:boolean) => void
    isMaxCountInputError: (payload:boolean) => void
    isMinCountInputError: (payload:boolean) => void
}


const App: React.FC<AppPropsType> = ({counter, ...props}) => {
    let [localstorageData, setLocalstorageData] = useState({})
    let [isFirstLoad, setIsFirstLoad] = useState(true)

    const setCount = () => {
        props.setCurrentCount(counter.startCount)
        props.setCounterStatus('active')
        props.setIsResetButtonDisabled(true)
        props.setIsIncButtonDisabled(false)
        props.setIsSetButtonDisabled(true)
        let temp = {
            ...localstorageData,
            startCount: counter.startCount,
            maxCount: counter.maxCount
        }
        setLocalstorageData(temp)
        localStorage.setItem('counterValues', JSON.stringify(temp));
    }


    useEffect(() => {
        const prewCounterValues = localStorage.getItem('counterValues');
        // @ts-ignore
        const parsedPrewCounterValues = JSON.parse(prewCounterValues)
        let {startCount, maxCount, currentCount} = parsedPrewCounterValues
        if (isFirstLoad) {
            if(prewCounterValues) {
                if (startCount !== undefined) props.setStartCount(startCount)
                if (maxCount !== undefined) props.setMaxCount(maxCount)
                if (currentCount !== undefined) {
                    props.setCurrentCount(currentCount)
                    props.setIsIncButtonDisabled(false)
                    props.setCounterStatus('active')
                }
            }
            setIsFirstLoad(false)
        }
        if(counter.currentCount || counter.currentCount === 0) {
            if (counter.currentCount >= counter.maxCount) {
                props.setIsIncButtonDisabled(true)
            } else {
                props.setIsIncButtonDisabled(false)
            }
            if(parsedPrewCounterValues) {
                let temp = {...localstorageData, ...parsedPrewCounterValues, currentCount: counter.currentCount}
                setLocalstorageData(temp)
                localStorage.setItem('counterValues', JSON.stringify(temp));
            }
        }
    }, [isFirstLoad, counter.currentCount])



    const changeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value
        if (value < 0 || value <= counter.startCount) {
            props.isMaxCountInputError(true)
            props.setCounterStatus('error')
            props.setMaxCount(value)
            props.setIsSetButtonDisabled(true)

        } else {
            props.isMaxCountInputError(false)
            props.setCounterStatus('disable')
            props.setMaxCount(value)
            props.setIsIncButtonDisabled(true)
            props.setIsSetButtonDisabled(false)
        }
    }
    const changeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value
        if (value < 0 || value >= counter.maxCount) {
            props.isMinCountInputError(true)
            props.setCounterStatus('error')
            props.setStartCount(value)
            props.setIsSetButtonDisabled(true)

        } else {
            props.isMinCountInputError(false)
            props.setCounterStatus('disable')
            props.setStartCount(value)
            props.setIsIncButtonDisabled(true)
            props.setIsSetButtonDisabled(false)
        }
    }

    const addCount = () => {
        let copyCurrentCount = counter.currentCount
        if (counter.currentCount < counter.maxCount) {
            props.setCurrentCount(++copyCurrentCount);
        }
        props.setIsResetButtonDisabled(false)
    }

    const resetCount = () => {
        props.setCurrentCount(counter.startCount);
        props.setIsResetButtonDisabled(true)
    }

    return (
        <div className="content">
            <SetCounter
                isMaxCountInputError={counter.isMaxCountInputError}
                isMinCountInputError={counter.isMinCountInputError}
                startCount={counter.startCount}
                maxCount={counter.maxCount}
                buttons={counter.buttons}
                setStartCount={changeMinValueHandler}
                setMaxCount={changeMaxValueHandler}
                setCount={setCount}
            />
            <Counter
                status={counter.counterStatus}
                addCount={addCount}
                resetCount={resetCount}
                currentCount={counter.currentCount}
                maxCount={counter.maxCount}
                buttons={counter.buttons}
            />

        </div>
    );
}

let mapStateToProps = (state: RootState) => ({
    counter: state.counter
})
let mapDispatchToProps  = (dispatch: AppDispatch) => ({
    setCurrentCount: (payload:number) => {dispatch(actions.setCurrentCount(payload))},
    setStartCount: (payload:number) => {dispatch(actions.setStartCount(payload))},
    setMaxCount: (payload:number) => {dispatch(actions.setMaxCount(payload))},
    setCounterStatus: (payload:'error' | 'disable' | 'active') => {dispatch(actions.setCounterStatus(payload))},
    setIsIncButtonDisabled: (payload:boolean) => {dispatch(actions.setIsIncButtonDisabled(payload))},
    setIsResetButtonDisabled: (payload:boolean) => {dispatch(actions.setIsResetButtonDisabled(payload))},
    setIsSetButtonDisabled: (payload:boolean) => {dispatch(actions.setIsSetButtonDisabled(payload))},
    isMaxCountInputError: (payload:boolean) => {dispatch(actions.isMaxCountInputError(payload))},
    isMinCountInputError: (payload:boolean) => {dispatch(actions.isMinCountInputError(payload))},
    })



export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

