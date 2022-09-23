import React, { useContext, useState } from 'react';
import Image from 'next/image';
import AppContext from '@context/AppContext';
import { ProductOrdered } from '@components/ProductOrdered';
import { generateId } from '@helpers/format';

import noShopSvg from '@icons/no-shop.svg';

const NoProductSelected = () => (
  <div className="no-shop-icon">
    <Image
      src={noShopSvg}
      width={40}
      height={40}
      objectFit="fill"
      alt="image of shopping car"
    />
  </div>
);

const ShoppingCardTab = ({ showShoppingCardTab, shoppingCardRightPosition, refHeader }) => {
    const { currentState, removeFromCart, addOrder, totalSelectedProducts } = useContext(AppContext);
    const [ btnClickable, setBtnClickable ] = useState(false);

    console.log(currentState)
    // checking if the rightPosition given is correct or just a wrong value.
    function isCorrectPosition() {
      if(typeof window === "undefined") return true;

      if(shoppingCardRightPosition === "0px") {
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

    function buyOrder() {
        if(currentState.cart.length) {
            setBtnClickable(true);
            const currentDate = new Date();

            addOrder({
                id: `key-order-${ generateId() }`,
                date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`,
                productsOrdered: [
                    ...currentState.cart
                ]
            });
            setBtnClickable(false);
        }
    }

    console.log(currentState)

    return (
        <div className={`shopping-card-tab ${showShoppingCardTab ? "menu-active" : ""}`}
            style={{ right: (isCorrectPosition() ? shoppingCardRightPosition : getRightPosition()) }}>

            <div className="shopping-card-top">
                {currentState.cart.map((product) => (
                    <ProductOrdered
                        key={product.id}
                        productInfo={product}
                        deleteItem={() => removeFromCart(product)}
                    />
                ))}
                {currentState.cart.length === 0 && <NoProductSelected />}
            </div>

            <div className="shopping-card-bottom">
                <div className="shopping-card-total">
                    <span className="login-section__label shopping-card-total__text">Total</span>
                    <span className="price-product shopping-card-total__price">
                        {totalSelectedProducts(currentState.cart)}
                    </span>
                </div>
                <button
                    className="general-button green--btn"
                    onClick={buyOrder}
                    disabled={btnClickable}
                >
                    Checkout
                </button>
            </div>
        </div>
    )
}

export { ShoppingCardTab };
