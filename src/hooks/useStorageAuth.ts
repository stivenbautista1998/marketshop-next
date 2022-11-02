import { useState, useEffect } from 'react';

interface InitialValue {
  id: string,
  username: string,
  image: string,
  email: string,
  passWord: string,
}

const useStorageAuth = (nameItem: string, nameCurrentItem: string, initialValue: InitialValue[]) => {
  const [usersInfo, setUsersInfo] = useState(initialValue);
  const [loadingUsersInfo, setLoadingUsersInfo] = useState<boolean>(true);
  const [errorUsersInfo, setErrorUsersInfo] = useState<boolean | string>(false);

  const [currentUser, setCurrentUser] = useState<undefined | null | InitialValue>(undefined); // added to test
  const [loadingCurrentUser, setLoadingCurrentUser] = useState<boolean>(true);
  const [errorCurrentUser, setErrorCurrentUser] = useState<boolean | string>(false);

  const [syncAuth, setSyncAuth] = useState<boolean>(true);

  useEffect(() => {
    try {
      const localStorageUsersOrders = localStorage.getItem(nameItem);
      if (localStorageUsersOrders) {
        setUsersInfo(JSON.parse(localStorageUsersOrders));
      } else {
        localStorage.setItem(nameItem, JSON.stringify(initialValue));
      }
      setLoadingUsersInfo(false);
    } catch (error) {
      if(error instanceof EvalError ) {
        setErrorUsersInfo(error.message);
      }
      setLoadingUsersInfo(false);
    }
  }, [nameItem, initialValue]);

  // this will update the current user info at the beginning and whenever there is an update for another tab.
  useEffect(() => {
    try {
      setLoadingCurrentUser(true);
      const localStorageCurrentUser = localStorage.getItem(nameCurrentItem);
      if (localStorageCurrentUser) {
        setCurrentUser(JSON.parse(localStorageCurrentUser));
        console.log(JSON.parse(localStorageCurrentUser));
      } else {
        localStorage.setItem(nameCurrentItem, JSON.stringify(null));
      }
      setLoadingCurrentUser(false);
      setSyncAuth(true);
    } catch (error) {
      if(error instanceof EvalError) {
        setErrorCurrentUser(error.message);        
      }
      setLoadingCurrentUser(false);
    }
  }, [nameCurrentItem, syncAuth]);

  /**
   * @param  {object} item
   * It updates the global list info of users, by passing the new object.
   */
  const saveUsersInfo = (item: InitialValue[]) => {
    setErrorUsersInfo(false);
    setLoadingUsersInfo(true);

    try {
      localStorage.setItem(nameItem, JSON.stringify(item));
      setUsersInfo(item);
      setLoadingUsersInfo(false);
    } catch (error) {
      if(error instanceof EvalError) {
        setErrorUsersInfo(error.message);
      }
      setLoadingUsersInfo(false);
    }
  };

  /**
   * @param  {object} item
   * It updates the current user info, by passing the new object.
   */
  const saveCurrentUser = (item: InitialValue) => {
    setErrorCurrentUser(false);
    setLoadingCurrentUser(true);

    try {
      localStorage.setItem(nameCurrentItem, JSON.stringify(item));
      setCurrentUser(item);
      setLoadingCurrentUser(false);
    } catch (error) {
      if(error instanceof EvalError) {
        setErrorCurrentUser(error.message);        
      }
      setLoadingCurrentUser(false);
    }
  };

  const synchronizeCurrentUser = (lastUserInfo: (InitialValue | null) = null) => {
    if (lastUserInfo) {
      const updatedUserInfo = usersInfo.map((item) => {
        if (item.id === lastUserInfo?.id) {
          return { ...lastUserInfo };
        } else {
          return item;
        }
      });
      saveUsersInfo(updatedUserInfo);
    }
    setSyncAuth(false);
  };

  return {
    usersInfo,
    currentUser,
    saveUsersInfo,
    saveCurrentUser,
    loadingUsersInfo,
    loadingCurrentUser,
    errorUsersInfo,
    errorCurrentUser,
    syncAuth,
    synchronizeCurrentUser,
  };
};

export { useStorageAuth };
