import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import arrowRightSvg from "@icons/arrow-right.svg";

// state={orderInfo}
const MyOrder = ({ orderInfo, totalOrdered }) => {
  function showDetails() {
    console.log("showDetails has been clicked!!");
  }

  return (
    <article className="shopping-card-item my-orders__item my-orders__item--special">
      <div className="part-up">
        <span className="my-orders__item__date price-product">{orderInfo.date}</span>
        <span className="my-orders__item__amount">
          {`${orderInfo.productsOrdered.length} article${orderInfo.productsOrdered.length > 1 ? "s" : "" }`}
        </span>
      </div>
      <div className="back-container part-down">
        <span className="price-product">{totalOrdered()}</span>
        <div onClick={showDetails}>
          <Link
            href={{ pathname: `/my-order/${orderInfo.id}`, query: orderInfo }}
          >
            <Image
              src={arrowRightSvg}
              /* className="close-icon close-item" */
              width={12}
              height={12}
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
