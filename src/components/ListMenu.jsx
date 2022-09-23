import React from 'react';

const ListMenu = ({ mobile, menuTab, listInfo, render, children }) => {
    let isFrontTab;
    const isMenuTab = `menu-tab__main-list`;

    if(!menuTab) {
        isFrontTab = `header-home-section__list ${mobile ? '' : 'hide-section'}`;
    }
    
    return (
        <ul id={`nav-list-${mobile ? 'mobile' : 'desk'}`} 
            className={menuTab ? isMenuTab : isFrontTab}
        >
            {listInfo.map(render || children)}
        </ul>
    );
}

export { ListMenu };

//