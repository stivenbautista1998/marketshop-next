import React from 'react';
import styles from './GeneralButton.module.scss';

const GeneralButton = ({ buttonText, color, clickHandler }) => {
    return (
        <button
            onClick={clickHandler}
            className={`${styles.generalButton} ${color === "white" ? styles.whiteBtn : styles.greenBtn}`}>
            {buttonText}
        </button>
    );
}

export { GeneralButton };
