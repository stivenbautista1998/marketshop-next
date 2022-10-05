import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ListMenu } from '@components/ListMenu';
import { ListMenuItem } from '@components/ListMenuItem';

import closeIconSvg from "@icons/x-icon.svg";
import styles from './MenuTab.module.scss';

const MenuTab = ({
    userEmail,
    showMenuTab,
    setShowMenuTab,
    navListItems,
    updateList,
    updateProducts,
    setCurrentUser
  }) => {

  const router = useRouter();

  const singOut = () => {
    setCurrentUser(null);
    router.push("/login");
  };

  const goToMyOrders = () => {
    document.body.classList.remove("no-scroll");
    router.push("/my-orders");
  };

  const goToMyAccount = () => {
    document.body.classList.remove("no-scroll");
    router.push("/my-account");
  };

  function hideMenu() {
    setShowMenuTab(false);
    document.body.classList.remove("no-scroll");
  }

  function changeFilterSinceNav(event) {
    console.log(event.target.innerText);

    if(event.target.classList[1] !== "menu-tab-selected-item") {
      const itemToSelect = event.target.innerText.toLowerCase();
      const idCategory = updateList(itemToSelect);
      updateProducts(idCategory);
      hideMenu();
    }
  }

  function keyDownHideMenu(event) {
    if(event.keyCode === 13) {
      hideMenu();
    }
  }

  function keyDownGoToMyOrders(event) {
    if(event.keyCode === 13) {
      goToMyOrders();
    }
  }

  function keyDownGoToMyAccount(event) {
    if(event.keyCode === 13) {
      goToMyAccount();
    }
  }

  return (
    <div className={`${styles.menuTab} ${showMenuTab ? styles.menuActive : ""}`}>
      <div className={styles.closeIcon}
        onClick={hideMenu}
        onKeyDown={keyDownHideMenu}
        role="presentation"
      >
        <Image
          src={closeIconSvg}
          width={12}
          height={12}
          objectFit="fill"
          alt="close icon"
        />
      </div>
      <div>
        <h2 className={styles.menuTab__tittle}>CATEGORIES</h2>
        <ListMenu
          menuTab={true}
          listInfo={navListItems}
          render={(item, index) => (
            <ListMenuItem
              key={index}
              menuTab={true}
              {...item}
              handleHomeList={changeFilterSinceNav}
            />
          )}
        />
        <ul className={styles.menuTab__logged}>
          <li className={styles.menuTab__logged__item}
            onClick={goToMyOrders}
            onKeyDown={keyDownGoToMyOrders}
            role="presentation"
          >
            My orders
          </li>
          <li className={styles.menuTab__logged__item}
            onClick={goToMyAccount}
            onKeyDown={keyDownGoToMyAccount}
            role="presentation"
          >
            My account
          </li>
        </ul>
      </div>
      <div>
        <span className={styles.menuTab__email}>{userEmail}</span>
        <button onClick={singOut} className={styles.menuTab__logging}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export { MenuTab };
