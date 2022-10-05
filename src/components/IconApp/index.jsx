import React from 'react';
import appIcon from '@icons/app-icon.png';
import Image from 'next/image';

import styles from './IconApp.module.scss';
import Link from 'next/link';

const IconApp = ({ bigSize = false, size = 85, redirect = null }) => {
  const ContentIcon = () => (
    <>
      <Image
        className={styles.iconCursor}
        src={appIcon} width={size}
        height={size}
        objectFit="fill"
        alt="logo of the webpage"
      />
      <span className={
        bigSize ?
        `${styles.textLogo} ${styles.mainBlue} ${styles.bigLogoText}`
        : `${styles.textLogo} ${styles.mainBlue} ${styles.normalLogoText}`
      }>
        <span className={styles.green__message}>Market </span>
        Shop
      </span>
    </>
  );

  if(redirect) {
    return (
      <Link href={redirect}>
        <div className={`${styles.styleNoLink} ${bigSize ? styles.logoIcon : styles.logoIconSmall}`}>
          <ContentIcon />
        </div>
      </Link>
    );
  }

  return (
    <div className={ bigSize ? styles.logoIcon : styles.logoIconSmall}>
      <ContentIcon />
    </div>
  );
};

export { IconApp };
