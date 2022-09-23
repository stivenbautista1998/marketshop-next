import { useContext } from 'react';
import Image from 'next/image';
import AppContext from '../context/AppContext';
import { MyOrder } from '@components/MyOrder';
import Link from 'next/link';
import { JustIcon } from '@components/JustIcon';
import { SyncAlertWithProps } from "@components/SyncAlert";

import menuSvg from "@icons/menu-icon.svg";
import shoppingCartSvg from "@icons/shopping-cart.svg";

const MyOrders = ({ synchronizeCurrentUser }) => {
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
    <div className="wrapper-login">
        <header className="header-my-orders">
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
                        <JustIcon /* responsiveSize={true} */ />
                        My orders
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
            { currentState.orders.length > 0 ? orderList : <NothingOrdered /> }
        </main>
        <SyncAlertWithProps
            synchronize={setSyncOfCurrentUser}
            synchronizeCurrentUser={synchronizeCurrentUser}
        />
    </div>
  );
}

export { MyOrders };
