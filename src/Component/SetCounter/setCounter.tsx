import React, {ChangeEvent, useState} from "react";
import styles from './setCounter.module.scss'
import {ButtonsType} from "../../App";
import Button from "../../Button/button";

type CounterType = {
    status: string | null
    buttons: ButtonsType
    setCount: () => void
    setStartCount: any
    setMaxCount: any
    startCount: number
    maxCount: number
}


function SetCounter(props: CounterType) {



    const onClickSetCount = () => {
        props.setCount();
    }
    const changeInputMaxCountStyle = (props.maxCount <= props.startCount || props.maxCount < 0)
        ? `${styles.input} ${styles.input_error}`
        : styles.input;
    const changeInputMinCountStyle = (props.startCount >= props.maxCount || props.startCount < 0)
        ? `${styles.input} ${styles.input_error}`
        : styles.input;


    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <div className={styles.value}>
                    <span>max value:</span>
                    <input className={changeInputMaxCountStyle}
                           onChange={props.setMaxCount} type="number" value={props.maxCount}/>
                </div>
                <div className={styles.value}>
                    <span>min value:</span>
                    <input className={changeInputMinCountStyle}
                           onChange={ props.setStartCount} type="number" value={props.startCount}/>
                </div>
            </div>

            <Button title={props.buttons.set.title}
                    action={onClickSetCount}
                    disabled={props.buttons.set.disabled}
            />

        </div>
    )
}

export default SetCounter;
