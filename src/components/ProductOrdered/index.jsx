import React, { useState } from 'react';
import Image from 'next/image';
import { capitalizeAll, becomeDollar } from '@helpers/format';

import xIconSvg from '@icons/x-icon.svg';
import styles from './ProductOrdered.module.scss';

const ProductOrdered = ({ productInfo, deleteItem = null }) => {
  const [ removeProduct, setRemoveProduct ] = useState(false);

  function deleteProductOrdered() {
    setRemoveProduct(true);
    // after 3ms the product will be removed from the shopping cart tab. enough time to show the effect.
    setTimeout(() => deleteItem(), 300);
  }

  function keyDownDeleteProductOrdered(event) {
    if(event.keyCode === 13) {
      deleteProductOrdered();
    }
  }

  return (
    <div>
      <article className={`${styles.shoppingCardItem} ${ removeProduct ? styles.deletedItem : '' }`}>
        <div className={styles.frontContainer}>
          <div className={styles.imageBorder} style={{ backgroundImage: `url(${productInfo.images[0]})` }}></div>
          <span className={styles.nameProduct}>{capitalizeAll(productInfo.title)}</span>
        </div>
        <div className={styles.backContainer}>
          <span className={styles.priceProduct}>{becomeDollar(productInfo.price)} </span>
          {
            deleteItem !== null ?
            <div className={`${styles.closeIcon} ${styles.closeItem}`}
              onClick={deleteProductOrdered}
              onKeyDown={keyDownDeleteProductOrdered}
              role="presentation"
            >
              <Image
                src={xIconSvg}
                width={12}
                height={12}
                objectFit="fill"
                alt='close item'
              />
            </div> : ""
          }
        </div>
      </article>
    </div>
  );
};

export { ProductOrdered };
