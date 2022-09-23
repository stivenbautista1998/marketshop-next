import { useState, useRef } from 'react';

const useHome = () => {
    const [ showMenuTab, setShowMenuTab ] = useState(false);
    const [ showShoppingCardTab, setShowShoppingCardTab ] = useState(false);
    const [ showProductDetail, setShowProductDetail ] = useState(false);
    const [ productSelectedInfo, setProductSelectedInfo ] = useState({});

    const [ searchLeftPosition, setSearchLeftPosition ] = useState("5%");
    const [ rightPosition, setRightPosition ] = useState("0px");
    const refHeader = useRef();
    
    const refTabState = useRef();
    refTabState.current = { showMenuTab, showShoppingCardTab, showProductDetail };
    
    function gettingResizedMargin() {
        if(window.innerWidth < 500) {
            setRightPosition("0px");
            setSearchLeftPosition("5%");
            controlScrollOnMobile();
        } else if(window.innerWidth < 1187) {
            setRightPosition("5px");
            setSearchLeftPosition("5%");
            if(document.body.classList[0] === "no-scroll") document.body.classList.remove("no-scroll");
        } else {
            const shoppingTabMarginRight = (window.innerWidth - refHeader.current.offsetWidth) / 2;
            setRightPosition(shoppingTabMarginRight + "px");
            setSearchLeftPosition(shoppingTabMarginRight + 15 + "px");
            if(document.body.classList[0] === "no-scroll") document.body.classList.remove("no-scroll");
        }
    }

    function controlScrollOnMobile() {
        // useRef hook was the only way I could find to use the current state values of the three states below.
        // I fixed the problem by using a reference to a mutable object which is ref. info: stackoverflow.com/a/62453660/11250643
        const { showShoppingCardTab, showProductDetail, showMenuTab } = refTabState.current;

        if(showShoppingCardTab === true || showProductDetail === true || showMenuTab == true) {
            if(document.body.classList[0] !== "no-scroll") document.body.classList.add("no-scroll");
        } else {
            if(document.body.classList[0] === "no-scroll") document.body.classList.remove("no-scroll");
        }
    }

    // this receives the product info from ProductItem to then pass it to productDetail, and also it show it.
    function getProductDetailInfo( productInfo ) {        
        if(productInfo.showDetailTab) {
            setShowProductDetail(true);
        }
        setProductSelectedInfo(productInfo);
    }

    // this receives from productDetail the setState to remove the visibility class, and then it close the element after 200s
    function closeProductDetailTab( showTab, updateProductDetailOpen ) {
        showTab(false);
        document.body.classList.remove("no-scroll");
        // setting to null the global state that indicates if the current product detail tab is open.
        updateProductDetailOpen(null);
        setTimeout(() => { // it waits 200ms to really remove the productDetailTab.
            setShowProductDetail(false);
        }, 200);
    }

    return { 
        showMenuTab, 
        setShowMenuTab,
        showShoppingCardTab,
        setShowShoppingCardTab,
        showProductDetail,
        productSelectedInfo,
        searchLeftPosition,
        rightPosition,
        refHeader,
        gettingResizedMargin,
        getProductDetailInfo,
        closeProductDetailTab
    };
};

export { useHome };