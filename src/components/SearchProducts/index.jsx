import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import searchSvg from "@icons/search-icon.svg";
import xIconSvg from "@icons/x-icon.svg";

import styles from './SearchProducts.module.scss';

const SearchProducts = ({ leftPosition = null, searchValue, setSearchValue, filterBySearch }) => {
  const [ showSearch, setShowSearch ] = useState(true);
  const [ showCloseBtn, setShowCloseBtn ] = useState(false);
  const styleElement = (leftPosition !== null ? { left: leftPosition } : null);

  const inputRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const scrollHandler = () => {
      if(lastScrollY < window.scrollY) {
        setShowSearch(false);
      } else {
        setShowSearch(true);
      }
      lastScrollY = window.scrollY;
    }

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  },[]);

  function cleanSearchInput() {
    if(searchValue.length > 0) setSearchValue('');
    setShowCloseBtn(false);
    inputRef.current.focus();
  }

  function searchHandler(event) {
    const { value } = event.target;
    if(event.type === "change") {
      setSearchValue(value);
      ((value.length > 0) ? setShowCloseBtn(true) : setShowCloseBtn(false));
    }

    if(event.type === "keyup") {
      if(value.length > 3) {
        if(event.keyCode === 13) { // enter key code
          filterBySearch(value);
          console.log(value);
        }
      }
    }
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={`${styles.generalInput} ${styles.centerSearch} ${styles.searchHomeSection} ${showSearch ? '' : styles.searchHidden }`}
        style={styleElement}>
        <div className={`${styles.searchHomeIcon} ${styles.searchIcon}`}>
          <Image
            src={searchSvg}
            width={15}
            height={15}
            objectFit="fill"
            alt="search icon"
          />
        </div>
        <input
          ref={inputRef}
          onKeyUp={searchHandler}
          onChange={searchHandler}
          value={searchValue}
          className={styles.headerHomeSection__search}
          type="text"
          placeholder="Search product"
        />
        <div className={`${styles.searchHomeIcon} ${styles.cleanSearch} ${ showCloseBtn ? styles.closeVisible : '' }`} onClick={cleanSearchInput}>
          <Image
            src={xIconSvg}
            width={15}
            height={15}
            objectFit="fill"
            alt="close icon"
          />
        </div>
      </div>
    </div>
  );
}

export { SearchProducts };
