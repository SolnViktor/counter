import React, {ChangeEvent, useEffect} from 'react';
import './App.css';
import Counter from './Component/Counter/counter';
import SetCounter from './Component/SetCounter/setCounter';
import {connect} from 'react-redux';
import {
    isMaxCountInputError, isMinCountInputError,
    setCounterStatus,
    setCurrentCount, setCurrentCountWithPromise,
    setIsIncButtonDisabled, setIsResetButtonDisabled, setIsSetButtonDisabled,
    setMaxCount,
    setStartCount
} from './redux/counter-reducer';
import {RootState} from './redux/redux-store';


function App({counter, ...props}: any) {


    const setCount = () => {
        props.setCurrentCount(counter.startCount);
        props.setCounterStatus('active')
        props.setIsResetButtonDisabled(true)
        props.setIsIncButtonDisabled(false)
        props.setIsSetButtonDisabled(true)

        localStorage.setItem('startCount', counter.startCount.toString());
        localStorage.setItem('maxCount', counter.maxCount.toString());

    }
    useEffect(() => {
        const prewStartCount = localStorage.getItem('startCount');
        if (prewStartCount !== null) props.setStartCount(JSON.parse(prewStartCount))

        const prewMaxCount = localStorage.getItem('maxCount');
        if (prewMaxCount !== null) props.setMaxCount(JSON.parse(prewMaxCount))

        const prewCurrentCount = localStorage.getItem('currentCount');
        if (prewCurrentCount !== null) {
            props.setCurrentCountWithPromise(JSON.parse(prewCurrentCount))
                .then(() => props.setIsIncButtonDisabled(false))

            // props.setCurrentCount(JSON.parse(prewCurrentCount))
            // props.setIsIncButtonDisabled(false)

            props.setCounterStatus('active')
        }
    }, [])

    useEffect(() => {
        if (counter.currentCount === counter.maxCount) {
            props.setIsIncButtonDisabled(true)
        } else {
            props.setIsIncButtonDisabled(false)
        }
        localStorage.setItem('currentCount', counter.currentCount.toString());
    }, [counter.currentCount])

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
        if (counter.currentCount < counter.maxCount) props.setCurrentCount(++counter.currentCount);
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


export const AppContainer = connect(mapStateToProps,
    {
        setCurrentCount, setStartCount, setMaxCount, setCurrentCountWithPromise,
        setCounterStatus, setIsIncButtonDisabled, setIsResetButtonDisabled,
        setIsSetButtonDisabled, isMaxCountInputError, isMinCountInputError
    })(App)

