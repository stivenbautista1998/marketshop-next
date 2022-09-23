import React, { useState } from 'react';
import Image from 'next/image';
import { capitalizeAll, becomeDollar } from '@helpers/format';

import xIconSvg from '@icons/x-icon.svg';

const ProductOrdered = ({ productInfo, deleteItem = null }) => {
    const [ removeProduct, setRemoveProduct ] = useState(false);

    function deleteProductOrdered() {
        setRemoveProduct(true);
        // after 3ms the product will be removed from the shopping cart tab. enough time to show the effect.
        setTimeout(() => deleteItem(), 300);
    }

    return (
      <div>
        <article className={`shopping-card-item ${ removeProduct ? 'deleted-item' : '' }`}>
          <div className='front-container'>
            <div className='image-border' style={{ backgroundImage: `url(${productInfo.images[0]})` }}></div>
            <span className='name-product'>{capitalizeAll(productInfo.title)}</span>
          </div>
          <div className='back-container'>
            <span className='price-product'>{becomeDollar(productInfo.price)} </span>
            {
              deleteItem !== null ?
              <div className='close-icon close-item' onClick={deleteProductOrdered}>
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
