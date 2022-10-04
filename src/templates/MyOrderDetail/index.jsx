import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'; // remove code here.
import { ProductOrdered } from '@components/ProductOrdered';
import { JustIcon } from '@components/JustIcon';
import AppContext from '../../context/AppContext';

import menuSvg from "@icons/menu-icon.svg";
import shoppingCartSvg from "@icons/shopping-cart.svg";
import styles from './MyOrderDetail.module.scss';

const MyOrderDetail = () => {
  const { totalSelectedProducts } = useContext(AppContext);

  // remove code here.
  const route = useRouter();
  const state = route.query;
  console.log(state);
  // remove code here.

  return (
    <div className={styles.wrapperLogin}>
        <header className="header-my-order">
            <nav className="header-home-nav nav--my-orders">
              <div className="menu-icon">
                <Image
                  src={menuSvg}
                  width={25}
                  height={21}
                  objectFit="fill"
                  alt="menu icon"
                />
              </div>
                <Link className="style-no-link" href="/">
                    <h2 className="front-container">
                        <JustIcon />
                        My order
                    </h2>
                </Link>
                <div className="shopping-cart">
                  <Image
                    src={shoppingCartSvg}
                    width={25}
                    height={21}
                    objectFit="fill"
                    alt="icon of a shopping cart"
                  />
                </div>
            </nav>
        </header>
        <main className="my-orders-section">
          <section className="shopping-card-item my-orders__item my-orders__item--special">
            <div className="part-up">
              <span className="my-orders__item__date price-product">{state.date}</span>
              <span className="my-orders__item__amount">
                {`${state.productsOrdered.length} article${state.productsOrdered.length > 1 ? "s" : "" }`}
              </span>
            </div>
            <div className="back-container part-down">
              <span className="price-product">{totalSelectedProducts(state.productsOrdered)}</span>
            </div>
          </section>
          {state.productsOrdered.map((product) => <ProductOrdered key={product.id} productInfo={product} />)}
        </main>
    </div>
  );
};

export { MyOrderDetail };
