import { useEffect } from 'react';
import { becomeDollar } from '@helpers/format';
import { useStorageUserOrders } from './useStorageUserOrders';

const initialState = [{
    userId: "user-key-995701412669",
    cart: [],
    orders: [],
    lastRemoved: [],
    productDetailOpen: null
}];

const useInitialState = () => {
    const {
        usersOrderLists: state,
        currentUserOrders: currentState,
        saveUsersOrderLists: setState,
        saveCurrentUserOrders: setCurrentState,
        setSyncOfCurrentUser
    } = useStorageUserOrders("ORDERS_V1", initialState);

    useEffect(() => {
        // synchronizing the state with the current state.
        const updatedState = state.map((item) => {
            if(item.userId === currentState?.userId) {
                return { ...currentState, lastRemoved: [] };
            } else {
                return item;
            }
        });
        setState(updatedState);

    }, [currentState?.orders]);


    /**
     * @param  {object} currentUser
     * Use this to select the specific order state of the specified user.
     */
    const getUserCurrentState = (currentUser) => {
        state.forEach(item => {
            if(item.userId === currentUser.id) {
                setCurrentState(item);
            }
        });
    };


    /**
     * @param  {string} newUserId
     * Use this to add a new order state to the new created user.
     */
    const addNewUserStateOrder = (newUserId) => {
        setState([
            ...state,
            {
                userId: newUserId,
                cart: [],
                orders: [],
                lastRemoved: [],
                productDetailOpen: null
            }
        ]);
    }

    const addToCart = (product) => {
        setCurrentState({
            ...currentState,
            lastRemoved: [],
            cart: [
                ...currentState.cart,
                product
            ]
        });
    };

    const removeFromCart = ( productToDelete ) => {
        setCurrentState({
            ...currentState,
            lastRemoved: [
                productToDelete
            ],
            cart: currentState.cart.filter((product) => product.id !== productToDelete.id) // filter returns an array already
        });
    };

    const updateProductDetailOpen = ( productInfo ) => {
        setCurrentState({
            ...currentState,
            productDetailOpen: productInfo
        });
    };

    const addOrder = (newOrder) => {
        setCurrentState({
            ...currentState,
            lastRemoved: [
                ...currentState.cart
            ],
            orders: [
                ...currentState.orders,
                newOrder
            ],
            cart: []
        });
    };

    const totalSelectedProducts = ( productList ) => {
        const reducerFunction = (accumulator, currentValue) => accumulator + currentValue.price;
        const total = productList.reduce(reducerFunction, 0);
        return becomeDollar(total);
    }

    return {
        currentState,
        getUserCurrentState,
        addNewUserStateOrder,
        addToCart,
        removeFromCart,
        updateProductDetailOpen,
        addOrder,
        totalSelectedProducts,
        setSyncOfCurrentUser
    };
}

export { useInitialState };
