import React from 'react';

import styles from './ListMenu.module.scss';

const ListMenu = ({ mobile, menuTab, listInfo, render, children }) => {
  let isFrontTab;

  if(!menuTab) {
    isFrontTab = `${styles.headerHomeSection__list} ${mobile ? styles.hideOnDesk : styles.hideSection}`;
  }

  return (
    <ul id={`nav-list-${mobile ? 'mobile' : 'desk'}`}
      className={menuTab ? styles.menuTab__mainList : isFrontTab}
    >
      {listInfo.map(render || children)}
    </ul>
  );
}

export { ListMenu };
