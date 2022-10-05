import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import AppContext from '@context/AppContext';
import { capitalizeAll, becomeDollar } from '@helpers/format';

import addToCartSvg from "@icons/add_to_cart.svg";
import selectedCartSvg from "@icons/selected-to-buy.svg";
import styles from './ProductItem.module.scss';


const ProductItem = ({ product, setProductDetailTab }) => {
  const [ isSelected, setIsSelected ] = useState(false);
  const [ wrongSelectionCounter, setWrongSelectionCounter ] = useState(0);
  const { currentState, addToCart } = useContext(AppContext); // removeFromCart


  let imgUrl = (isSelected ? selectedCartSvg : addToCartSvg);

  // when the page is loaded then we check if this product is one of the selected products on the shopping cart tab.
  useEffect(() => {
    currentState.cart.forEach((productItem) => {
      if(productItem.id === product.id) setIsSelected(true);
    });
  }, [currentState.cart, product.id]);


  // if lastRemoved is equal to this product id then the product has be unselected.
  useEffect(() => {
    // the first time currentState.lastRemoved is equal to null .id doesn't exist that's why I use the sign "?."
    if(currentState.lastRemoved.length !== 0) {
      currentState.lastRemoved.forEach((deletedProduct) => {
        if(deletedProduct.id === product.id) setIsSelected(false);
      });
    }
  }, [currentState.lastRemoved, product.id]);


  // it updates the product selection currentState, receiving the new selection value
  // and the info about if the it comes from the component or outside.
  function selectProduct() {
    if(isSelected !== true) {
      if(currentState.productDetailOpen?.id !== product.id) {
        addToCart(product);
        setProductDetailTab({ product, isSelected: true, showDetailTab: false, wrongSelectionCounter: 0 });
        if(wrongSelectionCounter !== 0) setWrongSelectionCounter(0);
      } else {
        setProductDetailTab({ product, isSelected: true, showDetailTab: false, wrongSelectionCounter: wrongSelectionCounter + 1 });
        setWrongSelectionCounter(wrongSelectionCounter + 1);
      }
    }
  }

  function openDetailTab() {
    if(window.innerWidth < 500) {
      if(document.body.classList[0] !== "no-scroll") document.body.classList.add("no-scroll");
    }
    setProductDetailTab({ product, isSelected, showDetailTab: true, wrongSelectionCounter: 0 });
    if(wrongSelectionCounter !== 0) setWrongSelectionCounter(0);
  }

  function keyDownDetailTab(event) {
    if(event.keyCode === 13) {
      openDetailTab();
    }
  }

  function keyDownSelectProduct(event) {
    if(event.keyCode === 13) {
      selectProduct();
    }
  }

  return (
    <article className={styles.articleSectionItem}>
      <div onClick={openDetailTab}
        onKeyDown={keyDownDetailTab}
        className={`${styles.articleSectionItem__img} ${styles.newImg}`}
        role="presentation"
        style={{backgroundImage: `url(${product.images[0]})`}}>
      </div>
      <div className={`${styles.articleSectionItem__content} ${isSelected ? 'clickedBtn' : ''}`}>
        <div className="card-text">
          <span className={`${styles.green__message} ${styles.priceProduct}`}>
            {becomeDollar(product.price)}
          </span>
          <span className={`${styles.green__message} ${styles.nameProduct}`}>
            {capitalizeAll(product.title)}
          </span>
        </div>
        <div className={`${styles.circleBorder}`}></div>
        <div className={`${styles.add_to_card}`}
          onClick={selectProduct}
          onKeyDown={keyDownSelectProduct}
          role="presentation"
        >
          <Image
            src={imgUrl}
            width={40}
            height={40}
            objectFit="cover"
            alt="image of a shopping car"
          />
        </div>
      </div>
    </article>
  );
};

export { ProductItem };
