import { useState, useEffect } from 'react';

const useStorageUserOrders = (nameItem, initialValue) => {
    const [ usersOrderLists, setUsersOrderLists ] = useState(initialValue);
    const [ loadingUsersOrderLists, setLoadingUsersOrderLists ] = useState(true);
    const [ errorUsersOrderLists, setErrorUsersOrderLists ] = useState(false);

    const [ currentUserOrders, setCurrentUserOrders ] = useState(null);
    const [ loadingCurrentUserOrders, setLoadingCurrentUserOrders ] = useState(true);
    const [ errorCurrentUserOrders, setErrorCurrentUserOrders ] = useState(false);

    const [ sync, setSyncOfCurrentUser ] = useState(true);

    useEffect(() => {
        try {
            const localStorageUsersOrders = localStorage.getItem(nameItem);
            if(localStorageUsersOrders) {
                setUsersOrderLists(JSON.parse(localStorageUsersOrders));
            } else {
                localStorage.setItem(nameItem, JSON.stringify(initialValue));
            }
            setLoadingUsersOrderLists(false);
        } catch (error) {
            setErrorUsersOrderLists(error.message);
            setLoadingUsersOrderLists(false);
        }
    }, []);

    // this will update the current user orders info at the beginning and whenever there is an update for another tab.
    useEffect(() => {
        try {
            const localStorageCurrentUserOrders = localStorage.getItem("CURRENT_USER_" +  nameItem);

            if(localStorageCurrentUserOrders) {
                setCurrentUserOrders(JSON.parse(localStorageCurrentUserOrders));
                console.log("no local storage");
                console.log(JSON.parse(localStorageCurrentUserOrders));
            } else {
                localStorage.setItem("CURRENT_USER_" +  nameItem, JSON.stringify(null));
                console.log("local storage");
                console.log("null result");
            }
            setLoadingCurrentUserOrders(false);
            setSyncOfCurrentUser(true);
        } catch (error) {
            setErrorCurrentUserOrders(error.message);
            setLoadingCurrentUserOrders(false);
        }
    }, [sync]);


    /**
     * @param  {object} item
     * It updates the order lists global state of all the users, by passing the new object.
     */
    const saveUsersOrderLists = (item) => {
        setErrorUsersOrderLists(false);
        setLoadingUsersOrderLists(true);

        try {
            localStorage.setItem(nameItem, JSON.stringify(item));
            setUsersOrderLists(item);
            setLoadingUsersOrderLists(false);
        } catch (error) {
            setErrorUsersOrderLists(error.message);
            setLoadingUsersOrderLists(false);
        }
    }


    /**
     * @param  {object} item
     * It updates the current user order lists, by passing the new object.
     */
    const saveCurrentUserOrders = (item) => {
        setErrorCurrentUserOrders(false);
        setLoadingCurrentUserOrders(true);

        try {
            localStorage.setItem("CURRENT_USER_" +  nameItem, JSON.stringify(item));
            setCurrentUserOrders(item);
            setLoadingCurrentUserOrders(false);
        } catch (error) {
            setErrorCurrentUserOrders(error.message);
            setLoadingCurrentUserOrders(false);
        }
    }


    return {
        usersOrderLists,
        currentUserOrders,
        saveUsersOrderLists,
        saveCurrentUserOrders,
        loadingUsersOrderLists,
        loadingCurrentUserOrders,
        errorUsersOrderLists,
        errorCurrentUserOrders,
        setSyncOfCurrentUser
    };
};

export { useStorageUserOrders };
