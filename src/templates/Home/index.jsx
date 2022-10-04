import { useContext, useEffect } from "react";
import { Header } from "@containers/Header";
import { MenuTab } from '@containers/MenuTab';
import { ProductDetailTab } from '@containers/ProductDetailTab';
import { ShoppingCardTab } from "@containers/ShoppingCardTab";
import { ProductList } from "@components/ProductList";
import { SyncAlertWithProps } from "@components/SyncAlert";
import AppContext from '../../context/AppContext';
import { useProducts } from '@hooks/useProducts';
import { useNavList } from "./hooks/useNavList";
import { useHome } from "./hooks/useHome";

const Home = ({ currentUser, setCurrentUser }) => {

  const {
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
  } = useHome();

  const {
    filteringProductsByMaximum: products,
    filteredProducts,
    updateFilteredProducts,
    updateProducts,
    loadingProducts,
    error
  } = useProducts(); // using custom hooks

  const { setSyncOfCurrentUser } = useContext(AppContext);

  const { navListItems, updateList } = useNavList();


  useEffect(() => {
    window.addEventListener("resize", gettingResizedMargin);

    return () => {
      window.removeEventListener("resize", gettingResizedMargin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Header
        setShowMenuTab={setShowMenuTab}
        showShoppingCardTab={showShoppingCardTab}
        setShowShoppingCardTab={setShowShoppingCardTab}
        searchLeftPosition={searchLeftPosition}
        filterBySearch={updateFilteredProducts}
        navListItems={navListItems}
        updateList={updateList}
        updateProducts={updateProducts}
        userInfo={currentUser}
        setCurrentUser={setCurrentUser}
        refHeader={refHeader}
      />
      <MenuTab
        userEmail={currentUser?.username}
        showMenuTab={showMenuTab}
        setShowMenuTab={setShowMenuTab}
        navListItems={navListItems}
        updateList={updateList}
        updateProducts={updateProducts}
        setCurrentUser={setCurrentUser}
      />
      {showProductDetail && <ProductDetailTab
        closeProductDetailTab={closeProductDetailTab}
        pDetailRightPosition={rightPosition}
        productInfo={productSelectedInfo}
        refHeader={refHeader}
      />}
      <ShoppingCardTab
        showShoppingCardTab={showShoppingCardTab}
        shoppingCardRightPosition={rightPosition}
        refHeader={refHeader}
      />
      <ProductList
        products={filteredProducts === null ? products : filteredProducts}
        setProductDetailTab={getProductDetailInfo}
        loadingProducts={loadingProducts}
        productError={error}
      />

      <SyncAlertWithProps
        synchronize={setSyncOfCurrentUser}
      />
    </section>
  );
};

export { Home };
