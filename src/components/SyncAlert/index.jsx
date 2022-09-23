import React from 'react';
import Image from 'next/image';
import withStorageListener from './withStorageListener';
import { Modal } from '../Modal';
import styles from './SyncAlert.module.scss';

import refreshIconSvg from '@icons/refresh-icon.svg';

const SyncAlert = ({ showElement, onCLickHandler }) => {
    if(showElement) {
        return (
            <Modal>
                <div className={styles.syncAlertWrapper}>
                    <div className={styles.syncAlertText}>There are new changes.</div>
                    <button onClick={onCLickHandler} className={styles.syncAlertWrapperButton}>
                        <Image
                          src={refreshIconSvg}
                          width={18}
                          height={18}
                          objectFit="fill"
                          alt="refresh icon"
                        />
                        <span className={styles.refreshIcon}>Synchronize</span>
                    </button>
                </div>
            </Modal>
        );
    } else {
        return null;
    }
};

const SyncAlertWithProps = withStorageListener(SyncAlert);

export { SyncAlertWithProps }; // <br />
