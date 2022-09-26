import React from 'react';

import styles from './LoadingSkeleton.module.scss';

const ProductSkeleton = () => {
  return (
    <article className={styles.articleSectionItem}>
      <div className={`${styles.articleSectionItem__img} ${styles.newImg} ${styles.skeletonStyle}`}></div>
      <div className={styles.articleSectionItem__content}>
        <div className="card-text">
          <span className={`${styles.grey__message} ${styles.priceProduct} ${styles.skeletonStyle}`}></span>
          <span className={`${styles.green__message} ${styles.nameProduct} ${styles.skeletonStyle}`}></span>
        </div>
        <div className={`${styles.add_to_card} ${styles.skeletonStyle}`}></div>
      </div>
    </article>
  );
};

const LoadingSkeleton = () => {
  const productItems = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    .map((item, index) => <ProductSkeleton key={index} />);

  return (
    <>
      {productItems}
    </>
  );
};

export { LoadingSkeleton };
