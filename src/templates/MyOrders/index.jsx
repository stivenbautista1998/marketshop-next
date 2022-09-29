import { useContext } from 'react';
import Image from 'next/image';
import AppContext from '../../context/AppContext';
import { MyOrder } from '@components/MyOrder';
import Link from 'next/link';
import { JustIcon } from '@components/JustIcon';
import { SyncAlertWithProps } from "@components/SyncAlert";

import menuSvg from "@icons/menu-icon.svg";
import shoppingCartSvg from "@icons/shopping-cart.svg";
import styles from './MyOrders.module.scss';

const MyOrders = () => {
  console.log("start MyOrders");
  const { currentState, totalSelectedProducts, setSyncOfCurrentUser } = useContext(AppContext);

  const orderList = currentState.orders.map((order) =>
    <MyOrder
      key={order.id}
      orderInfo={order}
      totalOrdered={() => totalSelectedProducts(order.productsOrdered)}
    />
  );

  const NothingOrdered = () => {
    return (
      <div className="no-order">
        No Orders Made
      </div>
    )
  };

  return (
    <div className={styles.wrapperLogin}>
      <header className={styles.headerMyOrders}>
        <nav className={`${styles.headerHomeNav} ${styles.navMyOrders}`}>
          <div className={styles.menuIcon}>
            <Image
              src={menuSvg}
              width={25}
              height={21}
              objectFit="fill"
              alt="menu icon"
            />
          </div>
          <Link className={styles.styleNoLink} href="/">
            <h2 className={styles.frontContainer}>
              <JustIcon />
               My orders
            </h2>
          </Link>
          <div className={styles.shoppingCart}>
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
      <main className={styles.myOrderSection}>
        { currentState.orders.length > 0 ? orderList : <NothingOrdered /> }
      </main>
      <SyncAlertWithProps synchronize={setSyncOfCurrentUser} />
    </div>
  );
}

export { MyOrders };
