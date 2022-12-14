import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

function getEndpoint(categoryId) {
  if (categoryId === 0) {
    return `${API}/api/${VERSION}/products`; // ?limit=500&offset=1
  } else {
    return `${API}/api/${VERSION}/categories/${categoryId}/products`;
  }
}

/**
 * @param  {number} limit
 * @param  {array} productList
 * @returns {array}
 * It filters the array you pass as the productList parameter and returns and array with
 * the amount of elements you indicate in the limit parameter.
 */
function limitByAmount(limit, productList) {
  if (productList.length > limit) {
    const copyArray = [...productList];
    return copyArray.splice(0, limit);
  } else {
    return productList;
  }
}

const useProducts = () => {
  const [products, setProducts] = useState([]); // general product info
  const [filteredProducts, setFilteredProducts] = useState(null); // products filtered by a search parameter.
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(false);
  let controller = useRef(null);

  const [filteringProductsByMaximum, setFilteringProductsByMaximum] = useState([]); // maximum amount of products is 50.

  useEffect(() => {
    const productRequest = async () => {
      try {
        // cancel pending request if any
        if (controller.current) controller.current.abort();
        controller.current = new AbortController(); // make our request cancellable
        const response = await axios(getEndpoint(0), { signal: controller.current.signal });
        setProducts(response.data);
        setFilteringProductsByMaximum(limitByAmount(50, response.data));
        setLoadingProducts(false);
        controller.current = null;
      } catch (error) {
        console.warn(error.message);
        setError(error.message);
        setLoadingProducts(false);
      }
    };
    productRequest();
  }, []);

  function updateProducts(categoryId) {
    // setting up used state to default value before executing the function.
    setError(false);
    setLoadingProducts(true);
    setFilteringProductsByMaximum([]);
    setFilteredProducts(null);

    const productRequest = async () => {
      try {
        if (controller.current) controller.current.abort();
        controller.current = new AbortController();
        const response = await axios(getEndpoint(categoryId), { signal: controller.current.signal });
        setProducts(response.data);
        setFilteringProductsByMaximum(limitByAmount(50, response.data));
        setLoadingProducts(false);
        controller.current = null;
      } catch (error) {
        console.warn(error.message);
        setError(error.message);
        setLoadingProducts(false);
      }
    };
    productRequest();
  }

  /**
   * @param  {string} filterValue
   * It allows to update the global state filteredProducts by receiving a search parameter,
   * All the products that matches the parameter will be placed into the mentioned state.
   */
  function updateFilteredProducts(filterValue) {
    // setting up used state to default value before executing the function.
    setError(false);
    setLoadingProducts(true);
    setFilteringProductsByMaximum([]);
    setFilteredProducts(null);

    const productResult = products.filter((productItem) => productItem.title.toLowerCase().includes(filterValue.toLowerCase()));
    setFilteredProducts(productResult);
    setLoadingProducts(false);
  }

  return {
    filteringProductsByMaximum,
    updateProducts,
    filteredProducts,
    updateFilteredProducts,
    loadingProducts,
    error,
  };
};

export { useProducts };
