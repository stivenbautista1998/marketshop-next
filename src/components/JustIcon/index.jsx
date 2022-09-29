import React from 'react';
import Image from 'next/image';
import appIcon from "@icons/app-icon.png";

import styles from './JustIcon.module.scss';

const iconSize = {
  "small": 41,
  "normal": 55
}

const JustIcon = ({ size = null/* , responsiveSize = null */ }) => {
  /* { size !== null ? `` : "" } */
  return (
    <Image
      src={appIcon}
      className={styles.iconLogo}
      /* className={ responsiveSize !== null ? "logo-icon-small" : "" } */
      width={ size !== null ? iconSize[size] : iconSize["small"] }
      height={ size !== null ? iconSize[size] : iconSize["small"] }
      objectFit="fill"
      alt="logo app"
    />
  );
};

export { JustIcon };
