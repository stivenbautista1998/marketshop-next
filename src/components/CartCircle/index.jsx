import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

import styles from './CartCircle.module.scss';

const CartCircle = () => {
  const { currentState } = useContext(AppContext);

  if (currentState.cart.length > 0) {
    return <div className={styles.counterCircle}>{currentState.cart.length}</div>;
  } else {
    return null;
  }
};

export { CartCircle };
