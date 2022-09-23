import React from 'react';
import Image from 'next/image';
import appIcon from "@icons/app-icon.png";

const iconSize = {
  "small": 41,
  "normal": 55
}

const JustIcon = ({ size = null/* , responsiveSize = null */ }) => {
  /* { size !== null ? `` : "" } */
  return (
    <Image
      src={appIcon}
      /* className={ responsiveSize !== null ? "logo-icon-small" : "" } */
      width={ size !== null ? { height: iconSize[size] } : iconSize["small"] }
      height={ size !== null ? { height: iconSize[size] } : iconSize["small"] }
      objectFit="fill"
      alt="logo app"
    />
  );
};

export { JustIcon };
