import React, { Component } from 'react';
import Image from 'next/image';
import { SearchProducts } from '@components/SearchProducts';
import { ListMenu } from '@components/ListMenu';
import { ListMenuItem } from '@components/ListMenuItem';
import { UserMenu } from '@components/UserMenu';
import { CartCircle } from "@components/CartCircle";
import { IconApp } from '@components/IconApp';
import { JustIcon } from '@components/JustIcon';

import menuSvg from "@icons/menu-icon.svg";
import shoppingIconSvg from "@icons/shopping-icon.svg";

import styles from './Header.module.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNav: false,
      showLogoApp: true,
      headerLoaded: false,
      searchValue: ''
    };

    this.handleHomeList = this.handleHomeList.bind(this);
    this.isCorrectPosition = this.isCorrectPosition.bind(this);
    this.getLeftPosition = this.getLeftPosition.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.handleMenuNav = this.handleMenuNav.bind(this);
    this.removeShoppingTabStyle = this.removeShoppingTabStyle.bind(this);
    this.showShoppingCard = this.showShoppingCard.bind(this);
  }

  componentDidMount() {
    this.setState({ headerLoaded: true });
  }

  handleHomeList(event) {
    if(!event.target.classList[1]) { // if the second class which is selected-item does not exist.
      const itemToSelect = event.target.innerText.toLowerCase();
      const idCategory = this.props.updateList(itemToSelect);
      this.props.updateProducts(idCategory);
      this.setState({ searchValue: '' });
    }
  }

  isCorrectPosition() {
    if(this.props.searchLeftPosition === "5%") {
      if(typeof window !== "undefined") {
        if(window.innerWidth < 1187) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }

    } else {
      return true;
    }
  }

  getLeftPosition() {
    if(this.props.refHeader.current !== undefined) {
      if(window.innerWidth >= 1187) {
        const leftMargin = (window.innerWidth - this.props.refHeader.current.offsetWidth) / 2;
        return leftMargin + "px";
      }
    } else {
      return "5%";
    }
  }

  showMenu() {
    this.props.setShowMenuTab(true);
    document.body.classList.add("no-scroll");
  }

  handleMenuNav() {
    this.setState({ showNav: !this.state.showNav });
  }

  removeShoppingTabStyle() {
    this.props.setShowShoppingCardTab(false);
    document.body.classList.remove("no-scroll");
    this.setState({ showLogoApp: true });
  }

  showShoppingCard() {
    console.log("has been clicked!!");
    if(window.innerWidth < 500) { // if the screen size is more less than 500px then work with the mobile class for menu.
      if(this.props.showShoppingCardTab === true) {
        this.removeShoppingTabStyle();
      } else {
        this.props.setShowShoppingCardTab(true);
        document.body.classList.add("no-scroll");
        this.setState({ showLogoApp: false });
      }
    } else { // if screen size >= 500px then work with the menu class for larger devices.
      if(this.props.showShoppingCardTab === true) {
        this.removeShoppingTabStyle();
      } else {
        this.props.setShowShoppingCardTab(true);
      }
    }
  }

  render() {
    // making sure the right position for larger devices is provided when the component is completely loaded.
    let leftPosition = "5%";
    if(typeof window !== "undefined") {
      console.log("inside!!");
      leftPosition = ((!this.isCorrectPosition() && this.state.headerLoaded) ?
      this.getLeftPosition() :
      this.props.searchLeftPosition);
    }

    return (
      <header className={styles.headerHomeSection}>
        <nav className={styles.navSection}>
          <div ref={this.props.refHeader} className={styles.headerHomeNav}>
            <div className={styles.menuIcon} onClick={this.showMenu}>
              <Image
                src={menuSvg}
                width={25}
                height={21}
                objectFit="fill"
                alt="menu icon"
              />
            </div>
            <div className={`${styles.leftNav} ${ this.state.showLogoApp ? "" : styles.hideLogo }`}>
              <IconApp size={48} />
              <ListMenu
                mobile={false}
                menuTab={false}
                listInfo={this.props.navListItems}
                render={(item, index) => (
                  <ListMenuItem
                    key={index}
                    {...item}
                    mobile={false}
                    menuTab={false}
                    handleHomeList={this.handleHomeList}
                  />
                )}
              />
            </div>
            <h2 className={ this.state.showLogoApp ? styles.hideLogo : styles.frontContainer }>
              <JustIcon size="small" />
              Shopping cart
            </h2>
            <div className={styles.rightNav}>
              <UserMenu
                userEmail={ this.props.userInfo?.username ? this.props.userInfo.username : "No selected" }
                showNav={this.state.showNav}
                setCurrentUser={this.props.setCurrentUser}
                handleMenuNav={this.handleMenuNav}
              />
              <CartCircle />
              <div className={styles.shoppingCart} onClick={this.showShoppingCard}>
                <Image
                  src={shoppingIconSvg}
                  width={25}
                  height={21}
                  objectFit="fill"
                  alt="shopping cart icon"
                />
              </div>
            </div>
          </div>
        </nav>
        <SearchProducts
          leftPosition={leftPosition}
          searchValue={this.state.searchValue}
          setSearchValue={(newValue) => this.setState({ searchValue: newValue })}
          filterBySearch={this.props.filterBySearch}
        />
        <ListMenu
          mobile={true}
          menuTab={false}
          listInfo={this.props.navListItems}
          render={(item, index) => (
            <ListMenuItem
              key={index}
              {...item}
              mobile={true}
              menuTab={false}
              handleHomeList={this.handleHomeList}
            />
          )}
        />
      </header>
    );
  }
}

export { Header };
