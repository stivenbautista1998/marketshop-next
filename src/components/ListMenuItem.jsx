import React from 'react';
import { capitalize } from '@helpers/format';

const ListMenuItem = ({ name, selected, mobile, menuTab, handleHomeList }) => {
    let isMobile, isFrontTab;
    const isMenuTab = `menu-tab__main-list__item ${ selected ? "menu-tab-selected-item" : "" }`;
    
    if(!menuTab) {
        isMobile = mobile ? 'selected-item-mobile' : 'selected-item-desk';
        isFrontTab = `header-home-section__list-option ${selected ? isMobile : ''}`;   
    }
    
    return (
        <li onClick={handleHomeList} 
            className={menuTab ? isMenuTab : isFrontTab}
        >
            {capitalize(name)}
        </li>
    );
}

export { ListMenuItem };
