import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

const Modal = ({ children }) => {
    return ReactDOM.createPortal(
        <div className={styles.centerPosition}>
            {children}
        </div>,
        document.getElementById("modal")
    );
};

export { Modal };
