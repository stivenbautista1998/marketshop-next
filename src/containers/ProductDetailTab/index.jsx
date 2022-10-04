import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import AppContext from '@context/AppContext';
import { becomeDollar } from '../../helpers/format';

import addShopCartSvg from "@icons/add-cart.svg";
import removeShopCartSvg from "@icons/remove-cart.svg";
import xIconSvg from "@icons/x-icon.svg";
import arrowRightSvg from "@icons/arrow-right.svg";
import styles from './ProductDetailTab.module.scss';

const ProductDetailTab = ({ productInfo, closeProductDetailTab, pDetailRightPosition, refHeader }) => {
  const [ showTab, setShowTab ] = useState(false);
  const [ productSelected, setProductSelected ] = useState(productInfo.isSelected);
  const [ showErrorMessage, setShowErrorMessage ] = useState(false);
  const { addToCart, removeFromCart, updateProductDetailOpen } = useContext(AppContext);
  const [ selectedImage, setSelectedImage ] = useState(0);

  const iconSelected = (productSelected ? removeShopCartSvg : addShopCartSvg);

  useEffect(() => {
    setTimeout(() => {
      setShowTab(true);
    }, 100);
  }, []);

  // every time a new product is selected and the ProductDetailTab is active, then update the product selection
  useEffect(() => {
    setProductSelected(productInfo.isSelected);
    updateProductDetailOpen(productInfo.product);
    setSelectedImage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInfo.product.id]);

  useEffect(() => {
    if(productInfo.wrongSelectionCounter !== 0) {
      setShowErrorMessage(true);

      setTimeout(() => {
        setShowErrorMessage(false);
      }, 1200);
    }
  }, [productInfo.wrongSelectionCounter]);


  function isCorrectPosition() {
    if(pDetailRightPosition === "0px") {
      if(window.innerWidth < 500) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  // getting the right value (normally it does it for larger devices like desktop etc.)
  function getRightPosition() {
    if(refHeader.current !== undefined) {
      if(window.innerWidth >= 1187) {
        const shoppingTabMarginRight = (window.innerWidth - refHeader.current.offsetWidth) / 2;
        return shoppingTabMarginRight + "px";
      }
    } else {
      return "0px";
    }
  }

  function updateProductSelection() {
    if(productSelected) {
      removeFromCart(productInfo.product);
      setProductSelected(false);
    } else {
      addToCart(productInfo.product);
      setProductSelected(true);
    }
  }

  function backProduct() {
    console.log("product back");
    if(selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  }

  function nextProduct() {
    // const elementWidth = refImageContainer.current.offsetWidth;
    if(selectedImage < (productInfo.product.images.length - 1)) {
      setSelectedImage(selectedImage + 1);
    }
  }

  function ImagesList({ selected = 0 }) {
    const { images } = productInfo.product;
    console.log({ images, selected });
    return productInfo.product.images.map(( imageLink, index ) => (
      <div key={index} className={`${styles.newImg} ${styles.imageDetailSize} ${styles.fade}`}
        style={{ backgroundImage: `url(${ imageLink })`, display: `${ selected === index ? "block" : "none" }` }}>
      </div>
    ));
  }

  function ImageDots({ selected = 0 }) {
    const dotList = productInfo.product.images.map((img, index) => (
      <div key={index} className={`${styles.point} ${ selected === index ? styles.selectedPoint : "" }`}></div>
    ));

    return (
      <div className={styles.pointsWrapper}>{dotList}</div>
    );
  }

  return (
    <div className={`${styles.productDetailTab} ${showTab ? styles.showProductDetail : ''}`}
      style={{ right: (isCorrectPosition() ? pDetailRightPosition : getRightPosition()) }} >
      <div>
        <div className={`${styles.imageContainer} ${styles.productDetailImg}`}>
          <ImagesList selected={selectedImage} />
          <div className={styles.wrapperBackBtn}>
            <div className={`${styles.arrowIcon} ${styles.backIcon}`} onClick={backProduct}>
              <Image
                src={arrowRightSvg}
                width={15}
                height={15}
                objectFit="fill"
                alt="arrow back"
              />
            </div>
          </div>
          <div className={styles.wrapperNextBtn}>
            <div className={`${styles.arrowIcon}`} onClick={nextProduct}>
              <Image
                src={arrowRightSvg}
                alt="arrow right"
                width={15}
                height={15}
                objectFit="fill"
              />
            </div>
          </div>
          <div className={styles.wrapperCloseBtn}></div>
          <div className={styles.closeIcon} onClick={() => closeProductDetailTab(setShowTab, updateProductDetailOpen)}>
            <Image
              src={xIconSvg}
              width={12}
              height={12}
              objectFit="fill"
              alt="close icon"
            />
          </div>
        </div>

        <ImageDots selected={selectedImage} />

        <div className={styles.productDetailInfo}>
          <span className={styles.priceProduct}>{becomeDollar(productInfo.product.price)}</span>
          <h3 className={styles.recoveryText}>{productInfo.product.title}</h3>
          <p className={styles.recoveryText}>{productInfo.product.description}</p>
        </div>
      </div>
      <div className={styles.productDetailButton}>
        <div className={`${styles.errorDetailMessage} ${ showErrorMessage ? styles.showDetailErrorMessage : "" }`}>
          Tab open, Select the product here
        </div>
        <button onClick={updateProductSelection} className={`${styles.generalButton} ${styles.greenBtn}`}>
          <div className={styles.normalSize}>
            <Image
              src={iconSelected}
              width={24}
              height={24}
              objectFit="fill"
              alt="image of shopping car"
            />
          </div>
          <span className={styles.productDetailButton__text}>{productSelected ? "Remove from cart" : "Add to cart" }</span>
        </button>
      </div>
    </div>
  );
};

export { ProductDetailTab };
