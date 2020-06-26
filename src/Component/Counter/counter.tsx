import React, {useState} from "react";
import styles from './counter.module.scss'
import {ButtonsType} from "../../App";
import Button from "../../Button/button";

type CounterType = {
    addCount: (count: number, maxCount: number, minCount: number) => void
    resetCount: (count: number, maxCount: number, minCount: number) => void
    currentCount: number
    maxCount: number
    buttons: ButtonsType
    status: string | null
}


function Counter(props: CounterType) {


    return (
        <div className={styles.container}>
            {props.status === "disable"
                ? (<div
                    className={`${styles.field} ${styles.field_disabled}`}> enter values and press 'set'
                </div>)
                : props.status === "error"
                ? <div
                        className={`${styles.field} ${styles.field_error}`}> incorrect value!
                    </div>
                : <div
                    className={props.currentCount === props.maxCount
                        ? `${styles.field} ${styles.field_red}`
                        : styles.field}> {props.currentCount}
                </div>
            }


            <Button
                title={props.buttons.inc.title}
                action={props.addCount}
                disabled={props.buttons.inc.disabled}
            />
            <Button
                title={props.buttons.reset.title}
                action={props.resetCount}
                disabled={props.buttons.reset.disabled}
            />
        </div>
    )
}

export default Counter;