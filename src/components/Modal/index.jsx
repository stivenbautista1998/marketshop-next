import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

const Modal = ({ children, selector }) => {
  const [ mounted, setMounted ] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
    return () => setMounted(false);
  }, [selector]);

  return mounted ? createPortal(
    <div className={styles.centerPosition}>
      {children}
    </div>, ref.current
  ) : null;
};

export { Modal };
