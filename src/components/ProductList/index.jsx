import React from 'react';
import Image from 'next/image';
import { ProductItem } from '../ProductItem';
import { LoadingSkeleton } from '../LoadingSkeleton';
import { ErrorMessage } from '../ErrorMessage';

import notFoundImg from '@img/no-results.png';
import styles from './ProductList.module.scss';

const ProductList = ({ products, setProductDetailTab, loadingProducts, productError }) => {
  const fiveTails = (
    <>
      <div className={styles.filler}></div>
      <div className={styles.filler}></div>
      <div className={styles.filler}></div>
      <div className={styles.filler}></div>
      <div className={styles.filler}></div>
    </>
  );

  const CompleteLoadingSkeleton = () => (
    <>
      <LoadingSkeleton />
      {fiveTails}
    </>
  );

  const productItems = products.map((product) => (
    <ProductItem
      key={product.id}
      product={product}
      setProductDetailTab={setProductDetailTab}
    />
  ));

  const productItemsSection = (
    productItems.length > 0 ? fiveTails :
    (productError === false ?
      <div className={styles.notFoundIcon}>
        <Image
          src={notFoundImg}
          layout='fill' /* this way the image covers the container's size, parent should be relative */
          objectFit='contain'
          alt="Product not found."
        />
      </div> :
      <ErrorMessage />
    )
  );

  return (
    <div className="wrapper-home">
      <main className={styles.articleSection}>
        {productItems}
        {!!loadingProducts ? <CompleteLoadingSkeleton /> : productItemsSection }
      </main>
    </div>
  );
}

export { ProductList };
