import React from 'react';
import { capitalize } from '@helpers/format';

import styles from './ListMenuItem.module.scss';

const ListMenuItem = ({ name, selected, mobile, menuTab, handleHomeList }) => {
  let isMobile, isFrontTab;
  const isMenuTab = `${styles.menuTab__mainList__item} ${ selected ? styles.menuTabSelectedItem : "" }`;

  if(!menuTab) {
    isMobile = mobile ? styles.selectedItemMobile : styles.selectedItemDesk;
    isFrontTab = `${styles.headerHomeSection__listOption} ${selected ? isMobile : ''}`;
  }

  return (
    <li onClick={handleHomeList}
      onKeyPress={handleHomeList}
      className={menuTab ? isMenuTab : isFrontTab}
      role="presentation"
    >
      {capitalize(name)}
    </li>
  );
};

export { ListMenuItem };
