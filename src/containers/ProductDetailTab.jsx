import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import AppContext from '@context/AppContext';
import { becomeDollar } from '../helpers/format';

import addShopCartSvg from "@icons/add-cart.svg";
import removeShopCartSvg from "@icons/remove-cart.svg";
import xIconSvg from "@icons/x-icon.svg";
import arrowRightSvg from "@icons/arrow-right.svg";

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
            <div key={index} className="new-img image-detail-size fade"
                style={{ backgroundImage: `url(${ imageLink })`, display: `${ selected === index ? "block" : "none" }` }}>
            </div>
        ));
    }

    function ImageDots({ selected = 0 }) {
        const dotList = productInfo.product.images.map((img, index) => (
            <div key={index} className={`point ${ selected === index ? "selected-point" : "" }`}></div>
        ));

        return (
            <div className="points-wrapper">{dotList}</div>
        );
    }

    return (
        <div className={`product-detail-tab ${showTab ? 'show-product-detail' : ''}`}
            style={{ right: (isCorrectPosition() ? pDetailRightPosition : getRightPosition()) }} >
            <div>
                <div className="image-container product-detail-img">
                    <ImagesList selected={selectedImage} />
                    <div className="wrapper-back-btn">
                        <div className="arrow-icon back-icon" onClick={backProduct}>
                          <Image
                            src={arrowRightSvg}
                            width={15}
                            height={15}
                            objectFit="fill"
                            alt="arrow back"
                          />
                        </div>
                    </div>
                    <div className="wrapper-next-btn">
                        <div className="arrow-icon" onClick={nextProduct}>
                          <Image
                            src={arrowRightSvg}
                            alt="arrow right"
                            width={15}
                            height={15}
                            objectFit="fill"
                          />
                        </div>
                    </div>
                    <div className="wrapper-close-btn"></div>
                    <div className="close-icon" onClick={() => closeProductDetailTab(setShowTab, updateProductDetailOpen)}>
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

                <div className="product-detail-info">
                    <span className="price-product">{becomeDollar(productInfo.product.price)}</span>
                    <h3 className="recovery-text">{productInfo.product.title}</h3>
                    <p className="recovery-text">{productInfo.product.description}</p>
                </div>
            </div>
            <div className="product-detail-button">
                <div className={`error-detail-message ${ showErrorMessage ? "show-detail-error-message" : "" }`}>
                    Tab open, Select the product here
                </div>
                <button onClick={updateProductSelection} className="general-button green--btn">
                  <div className="normal--size">
                    <Image
                      src={iconSelected}
                      width={24}
                      height={24}
                      objectFit="fill"
                      alt="image of shopping car"
                    />
                  </div>
                  <span className="product-detail-button__text">{productSelected ? "Remove from cart" : "Add to cart" }</span>
                </button>
            </div>
        </div>
    )
}

export { ProductDetailTab };
