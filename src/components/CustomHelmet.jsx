import React from 'react';
import { Helmet } from 'react-helmet';
// "MarketShop Online"
const CustomHelmet = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content="MarketShop is a marketplace app with the best products of the market." />
            <meta name="twitter:card" content="summary"/> {/* summary_large_image */}
            <meta name="twitter:site" content="@StivenDBautista"/>
            <meta name="twitter:creator" content="@StivenDBautista"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content="MarketShop is a marketplace app with the best products on the market. Receive orders easily with your own online ordering app."/>
            <meta
                name="twitter:image"
                content="../../public/app-icons/app-icon-228.png"
            />
            <meta property="og:title" content={title} />
            <meta property="og:description" content="MarketShop is a marketplace app with the best products on the market. Receive orders easily with your own online ordering app." />
            <meta
            property="og:image"
            content="../../public/app-icons/app-icon-228.png"
            />
            <meta property="og:url" content="https://marketshop-online.netlify.app/" />
            <meta property="og:site_name" content="MarketShop Online" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <meta property="fb:app_id" content="640275870944940" />
        </Helmet>
    );
};

export { CustomHelmet };