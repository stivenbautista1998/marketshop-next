import React from 'react';
import Image from 'next/image';
import { ProductItem } from './ProductItem';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

import notFoundImg from '@img/no-results.png';

const ProductList = ({ products, setProductDetailTab, loadingProducts, productError }) => {
    const fiveTails = (
        <>
            <div className="filler"></div>
            <div className="filler"></div>
            <div className="filler"></div>
            <div className="filler"></div>
            <div className="filler"></div>
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
        <div className='not-found-icon'>
          <Image
            src={notFoundImg}
            width={250}
            height={250}
            objectFit="fill"
            alt="Product not found."
          />
        </div> :
        <ErrorMessage />
      )
    );

    return (
        <div className="wrapper-home">
            <main className="article-section">
                {productItems}
                {!!loadingProducts ? <CompleteLoadingSkeleton /> : productItemsSection }
            </main>
        </div>
    );
}

export { ProductList };
