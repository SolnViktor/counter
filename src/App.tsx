import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import Counter from "./Component/Counter/counter";
import SetCounter from "./Component/SetCounter/setCounter";


export type ButtonsType = {
    inc: { id: number, title: string, disabled: boolean }
    reset: { id: number, title: string, disabled: boolean }
    set: { id: number, title: string, disabled: boolean }
}

function App() {
    let [currentCount, setCurrentCount] = useState(0);
    let [maxCount, setMaxCount] = useState(5);
    let [startCount, setStartCount] = useState(0);
    let [status, setStatus] = useState<string | null>('active')

    let [buttons, setButtons] = useState<ButtonsType>({
        inc: {id: 1, title: 'INC', disabled: true},
        reset: {id: 2, title: 'RESET', disabled: true},
        set: {id: 3, title: 'SET', disabled: false}
    })

    const setCount = () => {
        setCurrentCount(startCount);
        setStatus('active')
        setButtons({
            ...buttons,
            set: {...buttons.set, disabled: true},
            inc: {...buttons.inc, disabled: false},
            reset: {...buttons.reset, disabled: true},
        });
        localStorage.setItem('startCount', startCount.toString());
        localStorage.setItem('maxCount', maxCount.toString());

    }
    useEffect(() => {
        setStartCount(Number(localStorage.getItem('startCount')));
        setMaxCount(Number(localStorage.getItem('maxCount')));
        setCurrentCount(Number(localStorage.getItem('currentCount')));
    }, [])

    useEffect(() => {
        if (currentCount === maxCount) {
            setButtons({...buttons, inc: {...buttons.inc, disabled: true}});
        }  else {
            setButtons({
                ...buttons,
                inc: {...buttons.inc, disabled: false}
            });
        }
        localStorage.setItem('currentCount', currentCount.toString());
    }, [currentCount])

    const changeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value
        if (value < 0 || value <= startCount) {
            setStatus('error')
            setMaxCount(value)
            setButtons({...buttons, set: {...buttons.set, disabled: true}})

        } else {
            setStatus('disable')
            setMaxCount(value)
            setButtons({
                ...buttons,
                set: {...buttons.set, disabled: false},
                inc: {...buttons.inc, disabled: true}
            })
        }
    }
    const changeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value
        if (value < 0 || value >= maxCount) {
            setStatus('error')
            setStartCount(value)
            setButtons({...buttons, set: {...buttons.set, disabled: true,}})

        } else {
            setStatus('disable')
            setStartCount(value)
            setButtons({
                ...buttons,
                set: {...buttons.set, disabled: false},
                inc: {...buttons.inc, disabled: true}
            })
        }
    }

    const addCount = () => {
        if (currentCount < maxCount) setCurrentCount(++currentCount);
        setButtons({...buttons,
            reset: {...buttons.reset, disabled: false}})
    }

    const resetCount = () => {
        setCurrentCount(startCount);
        setButtons({...buttons,
        reset: {...buttons.reset, disabled: true}})
    }

    return (
        <div className="content">
            <SetCounter
                startCount={startCount}
                maxCount={maxCount}
                status={status}
                buttons={buttons}
                setStartCount={changeMinValueHandler}
                setMaxCount={changeMaxValueHandler}
                setCount={setCount}
            />
            <Counter
                status={status}
                addCount={addCount}
                resetCount={resetCount}
                currentCount={currentCount}
                maxCount={maxCount}
                buttons={buttons}
            />

        </div>
    );


}

export default App;
