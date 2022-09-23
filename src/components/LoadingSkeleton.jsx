import React from 'react';

const ProductSkeleton = () => {
    return (
        <article className="article-section-item">
            <div className="article-section-item__img new-img skeleton-style"></div>
            <div className="article-section-item__content">
                <div className="card-text">
                    <span className="grey__message price-product skeleton-style"></span>
                    <span className="green__message name-product skeleton-style"></span>
                </div>
                <div className="add_to_card skeleton-style"></div>
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