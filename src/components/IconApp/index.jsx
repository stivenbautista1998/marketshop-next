import React from 'react';
import appIcon from '@icons/app-icon.png';
import Image from 'next/image';

import styles from './IconApp.module.scss';

// className={ bigSize ? styles.logoIcon : styles.logoIconSmall }
const IconApp = ({ bigSize = false, size = 85 }) => {
    return (
      <div className={ bigSize ? styles.logoIcon : styles.logoIconSmall}>
          <Image
            className={styles.iconCursor}
            src={appIcon} width={size}
            height={size}
            objectFit="fill"
            alt="logo of the webpage"
          />
          <span className={ bigSize ? `${styles.textLogo} ${styles.mainBlue} ${styles.bigLogoText}` : `${styles.textLogo} ${styles.mainBlue} ${styles.normalLogoText}`}>
              <span className={styles.green__message}>Market </span>
              Shop
          </span>
      </div>
    );
};

export { IconApp };
