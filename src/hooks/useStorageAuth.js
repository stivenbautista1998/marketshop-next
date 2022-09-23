import { useState, useEffect } from 'react';

const useStorageAuth = (nameItem, nameCurrentItem, initialValue) => {
    const [ usersInfo, setUsersInfo ] = useState(initialValue);
    const [ loadingUsersInfo, setLoadingUsersInfo ] = useState(true);
    const [ errorUsersInfo, setErrorUsersInfo ] = useState(false);

    const [ currentUser, setCurrentUser ] = useState(null);
    const [ loadingCurrentUser, setLoadingCurrentUser ] = useState(true);
    const [ errorCurrentUser, setErrorCurrentUser ] = useState(false);

    const [ syncAuth, setSyncAuth ] = useState(true);

    useEffect(() => {
        try {
            const localStorageUsersOrders = localStorage.getItem(nameItem);
            if(localStorageUsersOrders) {
                setUsersInfo(JSON.parse(localStorageUsersOrders));
            } else {
                localStorage.setItem(nameItem, JSON.stringify(initialValue));
            }
            setLoadingUsersInfo(false);
        } catch (error) {
            setErrorUsersInfo(error.message);
            setLoadingUsersInfo(false);
        }
    }, []);

    // this will update the current user info at the beginning and whenever there is an update for another tab.
    useEffect(() => {
        try {
            setLoadingCurrentUser(true);
            const localStorageCurrentUser = localStorage.getItem(nameCurrentItem);
            if(localStorageCurrentUser) {
                setCurrentUser(JSON.parse(localStorageCurrentUser));
            } else {
                localStorage.setItem(nameCurrentItem, JSON.stringify(null));
            }
            setLoadingCurrentUser(false);
            setSyncAuth(true);
        } catch (error) {
            setErrorCurrentUser(error.message);
            setLoadingCurrentUser(false);
        }
    }, [syncAuth]);


    /**
     * @param  {object} item
     * It updates the global list info of users, by passing the new object.
     */
    const saveUsersInfo = (item) => {
        setErrorUsersInfo(false);
        setLoadingUsersInfo(true);

        try {
            localStorage.setItem(nameItem, JSON.stringify(item));
            setUsersInfo(item);
            setLoadingUsersInfo(false);
        } catch (error) {
            setErrorUsersInfo(error.message);
            setLoadingUsersInfo(false);
        }
    }


    /**
     * @param  {object} item
     * It updates the current user info, by passing the new object.
     */
    const saveCurrentUser = (item) => {
        setErrorCurrentUser(false);
        setLoadingCurrentUser(true);

        try {
            localStorage.setItem(nameCurrentItem, JSON.stringify(item));
            setCurrentUser(item);
            setLoadingCurrentUser(false);
        } catch (error) {
            setErrorCurrentUser(error.message);
            setLoadingCurrentUser(false);
        }
    }

    const synchronizeCurrentUser = ( lastUserInfo = null ) => {
        if(lastUserInfo) {
            const updatedUserInfo = usersInfo.map((item) => {
                if(item.id === lastUserInfo?.id) {
                    return { ...lastUserInfo };
                } else {
                    return item;
                }
            });
            saveUsersInfo(updatedUserInfo);
        }
        setSyncAuth(false);
    }


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
        synchronizeCurrentUser
    };
};

export { useStorageAuth };
