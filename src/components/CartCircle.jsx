import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const CartCircle = () => {
    const { currentState } = useContext(AppContext);

    if(currentState.cart.length > 0) {
        return (
            <div className="counter-circle">{currentState.cart.length}</div>
        )
    } else {
        return null;
    }
}

export { CartCircle };