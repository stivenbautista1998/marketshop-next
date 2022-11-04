import { useState, useEffect } from 'react';

interface UserOrdersType {
  userId: string;
  cart: ProductType[];
  orders: UserOrdersType[];
  lastRemoved: ProductType[];
  productDetailOpen: null | ProductType;
}

interface ProductType {
  id: number;
  title: string;
  category: CategoryProductType;
  description: string;  
  images?: string[];
  price?: number;
}

interface CategoryProductType {
  id: number;
  name: string;
  image: string;
}

interface UserOrdersType {
  id: string;
  date: string;
  productsOrdered: ProductType[];
}

const useStorageUserOrders = (nameItem: string, initialValue: UserOrdersType[]) => {
  const [usersOrderLists, setUsersOrderLists] = useState(initialValue);
  const [loadingUsersOrderLists, setLoadingUsersOrderLists] = useState<boolean>(true);
  const [errorUsersOrderLists, setErrorUsersOrderLists] = useState<boolean | string>(false);

  const [currentUserOrders, setCurrentUserOrders] = useState<null | UserOrdersType>(null);
  const [loadingCurrentUserOrders, setLoadingCurrentUserOrders] = useState<boolean>(true);
  const [errorCurrentUserOrders, setErrorCurrentUserOrders] = useState<boolean>(false);

  const [sync, setSyncOfCurrentUser] = useState<boolean>(true);

  useEffect(() => {
    try {
      const localStorageUsersOrders = localStorage.getItem(nameItem);
      if (localStorageUsersOrders) {
        setUsersOrderLists(JSON.parse(localStorageUsersOrders));
      } else {
        localStorage.setItem(nameItem, JSON.stringify(initialValue));
      }
      setLoadingUsersOrderLists(false);
    } catch (error) {
      if(error instanceof EvalError ) {
        setErrorUsersOrderLists(error.message);
      }
      setLoadingUsersOrderLists(false);
    }
  }, [nameItem, initialValue]);

  // this will update the current user orders info at the beginning and whenever there is an update for another tab.
  useEffect(() => {
    try {
      const localStorageCurrentUserOrders = localStorage.getItem('CURRENT_USER_' + nameItem);

      if (localStorageCurrentUserOrders) {
        setCurrentUserOrders(JSON.parse(localStorageCurrentUserOrders));
        console.log('no local storage');
        console.log(JSON.parse(localStorageCurrentUserOrders));
      } else {
        localStorage.setItem('CURRENT_USER_' + nameItem, JSON.stringify(null));
        console.log('local storage');
        console.log('null result');
      }
      setLoadingCurrentUserOrders(false);
      setSyncOfCurrentUser(true);
    } catch (error) {
      if(error instanceof EvalError ) {
        setErrorUsersOrderLists(error.message);
      }
      setLoadingCurrentUserOrders(false);
    }
  }, [nameItem, sync]);

  /**
   * @param  {object} item
   * It updates the order lists global state of all the users, by passing the new object.
   */
  const saveUsersOrderLists = (item: UserOrdersType[]) => {
    setErrorUsersOrderLists(false);
    setLoadingUsersOrderLists(true);

    try {
      localStorage.setItem(nameItem, JSON.stringify(item));
      setUsersOrderLists(item);
      setLoadingUsersOrderLists(false);
    } catch (error) {
      if(error instanceof EvalError ) {
        setErrorUsersOrderLists(error.message);
      }
      setLoadingUsersOrderLists(false);
    }
  };

  /**
   * @param  {object} item
   * It updates the current user order lists, by passing the new object.
   */
  const saveCurrentUserOrders = (item: UserOrdersType) => {
    setErrorCurrentUserOrders(false);
    setLoadingCurrentUserOrders(true);

    try {
      localStorage.setItem('CURRENT_USER_' + nameItem, JSON.stringify(item));
      setCurrentUserOrders(item);
      setLoadingCurrentUserOrders(false);
    } catch (error) {
      if(error instanceof EvalError ) {
        setErrorUsersOrderLists(error.message);
      }
      setLoadingCurrentUserOrders(false);
    }
  };

  return {
    usersOrderLists,
    currentUserOrders,
    saveUsersOrderLists,
    saveCurrentUserOrders,
    loadingUsersOrderLists,
    loadingCurrentUserOrders,
    errorUsersOrderLists,
    errorCurrentUserOrders,
    setSyncOfCurrentUser,
  };
};

export { useStorageUserOrders };
