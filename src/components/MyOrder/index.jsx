import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import arrowRightSvg from "@icons/arrow-right.svg";
import styles from './MyOrder.module.scss';

// state={orderInfo}
const MyOrder = ({ orderInfo, totalOrdered }) => {
  function showDetails() {
    console.log("showDetails has been clicked!!");
  }

  return (
    <article className={`${styles.shoppingCardItem} my-orders__item ${styles.myOrders__itemSpecial}`}>
      <div className="part-up">
        <span className={`${styles.myOrders__item__date} ${styles.priceProduct}`}>{orderInfo.date}</span>
        <span className={styles.myOrders__item__amount}>
          {`${orderInfo.productsOrdered.length} article${orderInfo.productsOrdered.length > 1 ? "s" : "" }`}
        </span>
      </div>
      <div className={styles.backContainer}>
        <span className={styles.priceProduct}>{totalOrdered()}</span>
        <div className={`${styles.closeIcon} ${styles.closeItem}`} onClick={showDetails}>
          <Link
            href={{ pathname: `/my-order/${orderInfo.id}`, query: orderInfo }}
          >
            <Image
              src={arrowRightSvg}
              /* className="close-icon close-item" */
              width={15}
              height={15}
              objectFit="fill"
              alt="arrow right icon"
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export { MyOrder };
