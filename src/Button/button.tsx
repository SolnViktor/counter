import React from "react";
import styles from './button.module.scss'

type ButtonType = {
    action: any
    disabled: boolean
    title: string
}


function Button (props: ButtonType) {

    return (

        <button
            disabled={props.disabled}
            onClick={props.action}
            className={props.disabled ? `${styles.button_active} ${styles.button_disable}`
                : styles.button_active}>{props.title}
        </button>

    )
}

export default Button;